var express = require("express");
var app     = express();
var path    = require("path");
var mysql = require('mysql');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "3443",
  database: "music_cult"
});
app.get('index.html',function(req,res){
  res.sendFile(path.join(__dirname+'index.html'));
});
app.post('/process_post',function(req,res){
var first_name= req.body.first_name;
var last_name= req.body.last_name; 
var age= req.body.age;
var email= req.body.email;
var password= req.body.password;
var genres= req.body.genres;
var gender= req.body.gender;
res.write('You sent the  first name as "' + req.body.first_name+'".\n');
res.write('You sent the  last name as "' + req.body.last_name+'".\n');
res.write('You sent the age "' + req.body.age+'".\n');
res.write('You sent the  email as "' + req.body.email+'".\n');
res.write('You sent the  password as "' + req.body.password+'".\n');
res.write('Your favorite genre(s) is/are "' + req.body.genres+'".\n');
res.write('You are a "' + req.body.gender+'".\n');
con.connect(function(err){
if (err) throw err;
var sql= "insert into reg(first_name, last_name,age,email_id,password,genre,gender) values('"+first_name+"','"+last_name+"',"+age+",'"+email+"','"+password+"','"+genres+"','"+gender+"')"
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
     res.end();
  });
con.query("select * from reg", function (err, result) {
    if (err) throw err;
    console.log(result);
     res.end();
  });

});
});
var server = app.listen(8000, function () {  
  var host = server.address().address 
  var port = server.address().port 
  console.log("Example app listening at http://%s:%s", host, port)  
}) 
