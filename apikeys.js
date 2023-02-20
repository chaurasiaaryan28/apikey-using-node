const { response } = require('express')
const express = require('express')
const app = express()
const port =3001
app.use(express.json())
app.use(express.urlencoded({extended : true}))
const bcrypt = require('bcrypt')
const hat = require('hat')
const jwt = require('jsonwebtoken')
const dotenv= require('dotenv').config()

const Pool = require ('pg').Pool    
const pool = new Pool({
    user:'aryan',
    host:'localhost',
    database:'aryan',
    password:'admin',
    port :5432,
})

const hashing = async (value)=>{
    try{
    const salt = await bcrypt.genSalt(10)
    const result = await bcrypt.hash(value,salt)
    return result
    }catch(err){
        response.send(err)
    }   
}

AuthenticateToken  = (request,response,next)=>{
    try{
    const token = request.headers['authorization'].split(' ')[1]
    if(token){
     decode =  jwt.verify(token,process.env.SECRET_KEY)
     if(decode){
        request.id = decode.sub

            next()
     }
    }
    else {
        response.send('no token found')
    }
}catch(err){
    response.send(err)
}
}

// const unhashing  = async (value,hashedvalue)=>{
//     return await bcrypt.compare(value,hashedvalue,(err,result)=>{

//         if(err){
//             throw(err)
//         }
//         return result;
//     })
// }




app.post('/register',(request,response)=>{

    email = request.body['email']
    password = request.body['password']
    hash_password = hashing(password).then((hash_pass)=>{
        pool.query('Insert into user5(email,password) values ($1,$2) RETURNING*',[email,hash_pass],(error,result)=>{
            if(error)
            {
                throw error
            }
            else{


                        // this is resoonse 
                    response.status(200).send(`User registered succesfully`)
            }
        })


    })
   
})

//middleware
// app.use((request,response,next)=>{



//     next();
// })


app.post('/log_in',(request,response)=>{
    email = request.body['email']
    password = request.body['password']

    if(!email){
        response.status(404).send('please enter email')
    }
    else{
        pool.query('select * from user5 where email = ($1)',[email],(err,user)=>{
            if(!user.rowCount){
                response.send('please enter correct email')
            }
            else {
                     bcrypt.compare(password,user.rows[0].password,(err,result)=>{

                if(result)
                {
                   payload = {
                        exp : Math.floor((Date.now()/1000)) + (60*30), 
                        sub : user.rows[0].id,
                        iat : Math.floor((Date.now()/1000))
                   }
                   token = jwt.sign(payload,process.env.SECRET_KEY)
                   
                    response.json({
                        'token':token   
                    })
                    
                    
                    
                }
                else {
                    response.send('Invalid password')
                }
            })
            }
        })
    }
})

app.post('/posts',AuthenticateToken,(request,response)=>{
        
        postname  = request.body['postname']
        id = request.id;
        pool.query('Insert into posts(post_name,created_by) values ($1,$2)',[postname,id],(err,result)=>{
            response.status(200).send(`${result.rowCount} post added successfully`)
        })

})
app.get('/show_posts',AuthenticateToken,async (request,response)=>{
    let posts = await pool.query('select * from posts ')
    
    let data = []
    await Promise.all(posts.rows.map(async (value)=>{    
        let user = await pool.query('select email from user5 where id = $1',[value.created_by])
        let post_info = {
            'id':value.post_id,
            'created by':user.rows[0].email,
            'post name':value.post_name
        }
        data.push(post_info)
        }))
             
            
                response.send(data)
                                                              
})

app.post('/comments/:post_id',AuthenticateToken,async(request,response)=>{
    comment_by = request.id
    Comment = request.body['comment']
    post_id = request.params.post_id

    result = await pool.query('Insert into comments(comment,commented_by,post_id) values($1,$2,$3)',[Comment,comment_by,post_id])
    response.status(200).send(`${result.rowCount} comments added successfully`)         
})

app.get('/showcomments/:post_id',AuthenticateToken,async(request,response)=>{
    post_id = request.params.post_id

    result = await pool.query('select comment from comments where post_id = $1',[post_id])
    response.status(200).send(result.rows)         
})

app.get('/mypost',AuthenticateToken,async(request,response)=>{
    id = request.id;
    result = await pool.query('select post_name from posts where created_by = $1',[id])
    response.status(200).send(result.rows)
})
app.get('/getAllUser',AuthenticateToken,async(request,response)=>{
    all_user = await pool.query('select * from user5');
    
    response.status(200).send(all_user.rows)
})
    




app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })