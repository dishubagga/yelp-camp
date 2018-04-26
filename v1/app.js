var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

var campgrounds =[
    {name:"dishu",image:"https://invinciblengo.org/photos/event/slider/manali-girls-special-adventure-camp-himachal-pradesh-1xJtgtx-1440x810.jpg"},
    {name:"bhupi",image:"https://c1.hiqcdn.com/customcdn/500x500/blog/sites/default/files/camping-te.jpg"},
    {name:"rana",image:"https://www.salemaecocamp.com/images/slideshow/salema-camp/salema-camp-2.jpg"}
]

app.post("/campgrounds", function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name:name , image:image};
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
});

app.get("/",function(req,res){
    res.render("landing");
});

app.get("/campgrounds/new",function(req,res){
    res.render("new");
});

app.get("/campgrounds",function(req,res){
    
    res.render("campgrounds",{campgrounds:campgrounds});
});

 app.listen("3000",function(){
     console.log("hy");
 });