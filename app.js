//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

//TODO
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/wikiDB',{useNewUrlParser:true});

const articleSchema = {
    title:"String",
    content:"String"
};
const Article = mongoose.model("Article",articleSchema);
// Δηλωση μοντέλου σχήματος σε μία γραμμή
//const Article = mongoose.model("Article",{title:"string",content:"string"});
//Step 1 Get command
// app.get("/articles",(req,res)=>{
//     Article.find((err,findArticles)=>{
//         if (!err){
//             res.send(findArticles);
//             console.log(findArticles);
//         } else
//         {
//             console.log("tin patsime");
//             res.send(err);
        
//         }
        
//     });
// } );

app.post("/articles",(req,res)=>{
    console.log(req.body.title);
    console.log(req.body.content);
    
} );


app.listen(process.env.PORT || 3000, () => {
    console.log("O Server τρέχει στην πόρτα 3000");
}); 
  