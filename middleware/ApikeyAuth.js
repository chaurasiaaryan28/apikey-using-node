// module.exports = (request,response,next)=>{
//     try{
//         authorization = request.headers['authorization']
//         apikey = authorization.split(' ')[1]
//     }

// }

const dotenv= require('dotenv')
const jwt = require('jsonwebtoken')


// jwt 
AuthenticateToken  = (request,response,next)=>{
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
                        

}



api_validate = (request,response,next)=>{

                    const apikey = request.headers['authorization'].split(' ')[1]

                    created_by_id = request.id
                    pool.query('select * from apikey where created_by = $1',[created_by_id],(err,apikey_table)=>{
                            bcrypt.compare(apikey,apikey_table.rows[0].apikey,(err,result)=>{
                            
                            if(result){
                                
                            exp_date = new Date(apikey_table.rows[0].exp_date)
                            curr_date = new Date()
                            
                            if(curr_date.getTime()>exp_date.getTime())
                            {
                        
                               next()
                            }
                            else{
                                
                                response.json({
                                    'password':'matched',
                                    'apikey':'De-Active',
                                    'Expired on':exp_date
                                })
                            }
                        }
                        else {
                            response.send("un authorized user , invalid api key")
                        }
                        }
                    
                        )
                    })
}


module.exports = {
    AuthenticateToken,
    api_validate
}