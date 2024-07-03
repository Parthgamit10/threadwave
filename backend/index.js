const port=3000;
const express=require("express");
const app=express();
const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
const multer=require("multer");
const  path=require("path");
const cors=require("cors");

app.use(express.json());
app.use(cors());
// database
mongoose.connect("mongodb+srv://vijaytaviyad871:cAD1DUImg1cx9O2O@cluster0.ldboxem.mongodb.net/webcloth")
//api

app.get("/",(req,res)=>{
  console.log("express is ruuning");
})

const storage=multer.diskStorage(
    {
        destination:'./upload/images',
        filename:(req,file,cb)=>{
            return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
        }
    }
);
const upload=multer({storage:storage});
app.use('/images',express.static("upload/images"))
app.post("/upload",upload.single('product'),(req,res)=>
{
res.json({ succes:1,
    image_url:`http://localhost:${port}/images/${req.file.filename}`
})
})

//schema for the product.
const Product=mongoose.model("Product",
{
id:{
    type:Number,
    required:true,
},
name:
{
    type:String,
    required:true,
},
image:{
    type:String,
    required:true,
},
catagory:{
    type:String,
    required:true,
},
new_price:{
    type:Number,
    required:true,
},
old_price:{
    type:Number,
    required:true,
},
date:{
    type:Date,
    default:Date.now,
},
avilable:{
    type:Boolean,
    default:true,
},

})
app.post("/addproduct", async (req,res)=>
{
    let products=await Product.find({});
    let id;
    if(products.length>=0)
    {
        let last_product_array=products.slice(-1);
        let last_product=last_product_array[0];
        id=last_product.id+1;
    } 
    else
    {
id=1;
    }
const product=new Product(
    {
        id:id,
        name:req.body.name,
        image:req.body.image,
        catagory:req.body.catagory,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("saved");
    res.json(
    {succes:true,
    name:req.body.name,
})
})
//creating the api for the delete.
app.post('/removeproduct',async (req,res)=>
{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("removed");
    res.json({
        succes:true,
        name:req.body.name,

    })
})

//api for all product
app.get('/allproducts',async (req,res)=>
{
    let products = await Product.find({});
    console.log("All Products Fetched");
    res.send(products);
})
app.listen(port,(error)=>
{
    if(!error)
    {
        console.log("Running port"+port);
    }
    else{
        console.log("the not "+error);
    }
})