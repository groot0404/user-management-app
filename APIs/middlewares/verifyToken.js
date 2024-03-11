//import jsonwebtoken
const jwt = require('jsonwebtoken')

//import environment variables 
require('dotenv').config() 

const verifyToken = (request,response,next)=>{
    //token verification logic
    //console.log(request.headers)
    //get bearer token from the header of request
    let bearerToken = request.headers.authorization
    //if bearer token not exists -- unauthorized
    if(bearerToken===undefined){
        response.send({message:"Unauthorized request"})
    }
    //if token exists get the token
    else{
        let token = bearerToken.split(' ')[1]
        //verify the token using secrect key
        try{
            jwt.verify(token,process.env.SECRET_KEY)
            next()
        }catch(err){
            response.send({message:err.message})
        }
        //if token is valid -- allow to access protected route
        //else,ask to login again
    }    
}

module.exports=verifyToken;