var http = require("http");
var fs = require("fs");
http.createServer(function(req,res){
    fs.readFile('demo.html',(err,data)=>{
        res.writeHead(200,{"content-type":"text/html"});
        res.write(data);
        res.end();
    });
    fs.writeFile("demo.html","hello hello",(err)=>{
        if(err){
            console.log(err);
        }
        console.log("saved");
    })
}).listen("4300"); 