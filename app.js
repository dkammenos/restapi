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
app.route("/articles")
.get((req,res)=>{
    Article.find((err,findArticles)=>{
        if (!err){
            res.send(findArticles);
            console.log(findArticles);
        } else
        {
            console.log("tin patsime");
            res.send(err);
        
        }
        
        });
    })
.post((req,res)=>{
    console.log(req.body.title);
    console.log(req.body.content);
    const newArticle = new Article(
        {
            title: req.body.title,
            content:req.body.content
        }
    );
    newArticle.save((err)=>{
        if(!err) {
            res.send("Όλα πήγαν καλά");
        }
        else 
        {
            res.send(err);
        }
    });
})
.delete((req,res)=>{
    Article.deleteMany((err)=>{
        if (!err){
            res.send("Όλα πήγαν καλά-Διαγράφηκαν");
        } else
        {
            res.send(err);
        
        }
        
    });
})
app.route("/articles/:articleTitle") 
.get((req,res) =>{
    Article.findOne({title:req.params.articleTitle},(err, foundArtickle)=> {
        //console.log(req.params.articleTitle);
        if(foundArtickle){
                res.send(foundArtickle);
                console.log(foundArtickle);
        } else {
            res.send("Den vretike timope")
           // console.log("tzifos");
        }
        })
    })

    .put((req,res) => {
        Article.updateOne(
            {title:req.params.articleTitle},
            {title:req.body.title, content: req.body.content},
            {overwrite:true},
            (err)=>{
                res.send("lathos stin enimerosi"+err)
            }
        )
    });
    
    
    
    
    ;

    

// app.get("/articles",
// } );
// //Δημιουργία άρθρου
// app.post("/articles",
    
// } );
// //Διαγραφή όλων των άρθρων
// app.delete("/articles",
// } );





app.listen(process.env.PORT || 3000, () => {
    console.log("O Server τρέχει στην πόρτα 3000");
}); 
  