var express     = require("express");
var app         = express();
var bodyParser  = require("body-parser");
var mongoose    = require("mongoose");
var passport    =require("passport");
var LocalStrategy = require("passport-local");
var User          = require("./models/user"); 

mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

//passport config
app.use(require("express-session")({
    secret:"once again rusty win cutest dog!",
    resave: false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
})

//schema setup


var campgroundSchema    =    new mongoose.Schema({
    name:    String,
    image:   String,
    d: String
});

var Campground  =    mongoose.model("Campground" , campgroundSchema);



app.post("/campgrounds", function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var d = req.body.d;
    var newCampground = {name:name , image:image ,d:d};
    Campground.create(newCampground,function(err, newlyCreated){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/campgrounds");
        }
        
    })
   
    // campgrounds.push(newCampground);
   
});

app.get("/",function(req,res){
    res.render("landing");
});

app.get("/campgrounds/new",isLoggedIn,function(req,res){
   
    res.render("new");
});

app.get("/campgrounds",function(req,res){ 
   Campground.find({},function(err,allcampgrounds){
       if(err){
           console.log(err);
           colsole.log(hello);
       }
       else{
            res.render("index",{campgrounds:allcampgrounds});
       }
   })
    
});

app.get("/campgrounds/:id",(req,res)=>{
    Campground.findById(req.params.id,function(err,foundcamp){
        if(err){
            console.log(err);
        }
        else{
            res.render("show",{campground:foundcamp});
        }
    })
    
});

//auth routes

app.get("/register",function(req,res){
    res.render("register");
});
app.post("/register",function(req,res){
    User.register(new User({username:req.body.username}),req.body.password,function(err,user){
    if(err){
        console.log(err);
        return res.render("register");
    }
    passport.authenticate("local")(req,res,function(){
        res.redirect("campgrounds");
    });
  })
});
app.get("/login",function(req,res){
    res.render("login");
})
app.post("/login", passport.authenticate("local",
{
    successRedirect:"/campgrounds",
    failureRedirect:"/login"
}),function(req,res){   
});

app.get("/logout",function(req,res){
    req.logout();
    res.redirect("/campgrounds");
})
 function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
 }

 app.listen("3000",function(){
     console.log("hy");
 });