//create express app
const exp=require("express")
const app=exp()

//import environment variable
require('dotenv').config()//process.env.variableName

//assign port number 
const port = process.env.PORT||4000
app.listen(port,()=>{console.log('server listening on port 4000...')})

const path = require('path')
//connect express with react build
app.use(exp.static(path.join(__dirname,'./build')))

//import mongo client
const mclient=require("mongodb").MongoClient;
//connect to mongodb server
mclient.connect('mongodb://localhost:27017')
.then(dbRef=>{
    //get database object
    let dbObj = dbRef.db('testdb')
    //create collections objects to APIs
    let usersCollection = dbObj.collection("userscollection")
    let productsCollection = dbObj.collection("productscollection")

    //share collections object to APIs
    app.set("usersCollection",usersCollection)
    app.set("productsCollection",productsCollection)
    console.log("Connected to DB successfully")
})
.catch(err=>console.log("database connection err is ",err))


//import userApp API  
const userApp=require("./APIs/userApi")
//import productApp API
const productApp=require("./APIs/productApi");
const { request } = require("http")
//const { DBRef } = require("mongodb");

//forward request to /user-api
app.use('/user-api',userApp)
//forward request to /product-api
app.use('/product-api',productApp)


//middleware to deal with page refresh
const pageRefresh =(request,response,next)=>{
    response.sendFile(path.join(__dirname,'./build/index.html'))
}

app.use("*",pageRefresh)


//middleware to handle invalid path
const invalidPathHandlingMiddleware=(request,response,next)=>{
    response.send({message:"Invalid Path"})
}
app.use(invalidPathHandlingMiddleware)

//error handler middleware
const errHandler=(error,request,response,next)=>{
    response.send({"error-message ":error.message})
}
app.use(errHandler)