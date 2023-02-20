const { response } = require('express')
const express = require('express')
const app = express()
const port =3006
app.use(express.json())
app.use(express.urlencoded({extended : true}))
const bcrypt = require('bcrypt')
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

Authenticate_Token  = function (request,response,next){
    try{
    const token = request.headers['authorization'].split(' ')[1]
    if(token){
     decode =  jwt.verify(token,process.env.SECRET_KEY)
     if(decode){
        request.id = decode.sub
        request.role = decode.role

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

admin_authorization = (request,response,next)=>{
        if(request.role != process.env.ADMIN)
        {
            return response.status(400).send(" you are un-authorized user")
        }
        else {
            next()
        }

}


app.post('/Sign_up',(request,response)=>{
    email = request.body['email']
    password = request.body['password']
    role = request.body['role']
    hash_password = hashing(password).then((hash_pass)=>{
        pool.query('Insert into user50(email,password,role) values ($1,$2,$3) RETURNING*',[email,hash_pass,role],(error,result)=>{
            if(error)
            {
                throw error
            }
            else{
                    response.status(200).send(`User registered succesfully`)
            }
        })


    })
   
})
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
                        iat : Math.floor((Date.now()/1000)),
                        role : user.rows[0].role
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


app.get('/getAllUser',Authenticate_Token,admin_authorization,(request,response)=>{
        users = pool.query('select * from user50')
        response.send(users.rows)


})

app.listen((port,()=>{
    console.log(`App is running on port ${port}`)

}))