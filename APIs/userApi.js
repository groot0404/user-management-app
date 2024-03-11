//create express app
const exp=require("express")
const userApp = exp.Router()

//import environment variables
require('dotenv').config() //process.env.variableName

//import express-async-handler
const expressAsyncHandler = require('express-async-handler')

//import multerObj
const multerObj = require('./middlewares/cloudinaryConfig')

//import bcryptjs
const bcrypt = require('bcryptjs')

//import jsonwebtoken
const jwt = require('jsonwebtoken')

//import verifyToken
const verifyToken = require('./middlewares/verifyToken')

//CRETAE USER API

//parse body 
userApp.use(exp.json())

//user login
//PUBLIC ROUTE
userApp.post('/login-user',expressAsyncHandler( async (request,response)=>{
    //get usercollection
    const usersCollection = request.app.get('usersCollection')

    //get new user from the body
    const userCred = request.body;

    //verify username of userCred
    let userOfDB = await usersCollection.findOne({username:userCred.username})
    //if username is invalid
    if(userOfDB===null){
        response.status(200).send({message:"Invalid Username"})
    }
    //if username is valid
    else{
        //compare passwords
        let isEqual = await bcrypt.compare(userCred.password,userOfDB.password)
        //if password not matched
        if(isEqual===false){
            response.status(200).send({message:"Invalid Password"})
        }
        //if password matches
        else{
            //create JWT token
            let signedJWTToken = jwt.sign({username:userOfDB.username},process.env.SECRET_KEY,{expiresIn:30})
            //send token in response
            response.status(200).send({message:"success",token:signedJWTToken,user:userOfDB})
        }
    }
}))

//register new user
//PUBLIC ROUTE 
userApp.post('/register-user',multerObj.single('photo'), expressAsyncHandler( async (request,response)=>{  

    //get usercollection
    const usersCollection = request.app.get('usersCollection')

    //get new user from the body
    const newUser = JSON.parse(request.body.user);

    //verify if user already exists
    const userofDB=await usersCollection.findOne({username:newUser.username})

    //if user already exists
    if(userofDB!==null){
        response.status(200).send({message:"User already exists"})
    }
    //if user doesnot exists
    else{
        //add cdn link of cloudinary image to userObj 
        newUser.image = request.file.path
        //hash the password
        let hashedPassword = await bcrypt.hash(newUser.password,6)
        //replace password with hashedPassword
        newUser.password=hashedPassword
        //insert user
        await usersCollection.insertOne(newUser)
        response.status(201).send({message:"User created"})
    }

}))

//get all users
//PRIVATE ROUTE
userApp.get('/get-users',verifyToken,expressAsyncHandler(async (request,response)=>{
    //get usercollection
    const usersCollection = request.app.get('usersCollection')
    //get all the users
    const users = await usersCollection.find().toArray()
    //response
    response.status(200).send({message:"Users",payload:users})
}))

//get user by username
userApp.get('/get-user/:username',expressAsyncHandler(async (request,response)=>{
    //get usercollection
    const usersCollection = request.app.get('usersCollection')

    //get username from url
    let usernameFromUrl = request.params.username

    //find in database
    let user = await usersCollection.findOne({username:usernameFromUrl})
    //send response 
    response.status(200).send({message:"User",payload:user})
}))


//modify user
userApp.put('/update-user/:username',expressAsyncHandler(async (request,response)=>{
    //get usersCollection
    const usersCollection = request.app.get('usersCollection')
    //get username from url
    let usernameFromUrl = request.params.username
    //get modified data from request
    let modifiedUser = request.body;
    //update in database
    usersCollection.updateOne({username:usernameFromUrl},{$set:{...modifiedUser}})
    //send response
    response.status(200).send({message:"User updated"})
}))

//delete user
userApp.delete('/delete-user/:username',expressAsyncHandler(async (request,response)=>{
    //get usersCollection
    const usersCollection = request.app.get('usersCollection')
    //get username from url
    let usernameFromUrl = request.params.username
    //delete user by username
    await usersCollection.deleteOne({username:usernameFromUrl})
    //send response 
    response.status(200).send({message:"User removed"})
}))

//protected route
userApp.get('/test',verifyToken,(request,response)=>{
    response.send({message:"message ffrom protected route"})
})



//export userApi
module.exports=userApp