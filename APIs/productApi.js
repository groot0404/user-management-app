//create express app
const exp=require("express")
const productApp = exp.Router()

//get all products
productApp.get('/get-products',(request,response)=>{
    response.send({message:"all the products"})
})

//create new product
productApp.post('/create-product',(request,response)=>{
    response.send({message:"new product created"})
})

//delete product
productApp.delete('/delete-product',(request,response)=>{
    response.send({message:"product deleted"})
})

//export productApp
module.exports=productApp