var express = require('express');
var bodyParse = require('body-parser');
var mongoose = require('mongoose');

const app = express();
app.use(bodyParse.json());
app.use(express.static('public'));
app.use(bodyParse.urlencoded({
    extended:true
}));

mongoose.connect('mongodb://0.0.0.0:27017/New_Lets_Chat_Database',{
    useNewUrlParser:true,
    useUnifiedTopology:true
});
var db = mongoose.connection;

db.on('error',()=>console.log("Error connecting to 'New_Lets_Chat_Database' database! ! ! !"));
db.once('open',()=>console.log("Succesfully connected to 'New_Lets_Chat_Database' Database. . . ."));
// -----------------------------------------------------------------------------------------------------------

app.post("/home1", (req, res) => {
    var name = req.body.username;
    var password = req.body.psw;
    var data = {
            "username": name,
            "password": password
        };
        db.collection('login_details').insertOne(data, (err, collection) => {
            if (err) {
                throw err;
            }
            console.log("User logged in Successfully. . . .");
        
            
    return res.redirect('home1.html');
    });
});




// ------------------------------------------------------------------------------------------------------------
app.post("/register",(req,res)=>{
    var mailId = req.body.em;
    var usrname = req.body.user;
    var psw = req.body.pword;

    var reg_data = {
        "mail-id":mailId,
        "user-name":usrname,
        "password":psw
    }
    db.collection('register_details').insertOne(reg_data,(err,collection)=>{
        if(err){
            throw err;
        }
        else{
            console.log("Registration succesfull. . . .");
        }
    });
    return res.redirect('register.html');
});
// ------------------------------------------------------------------------------------------------------------
app.post("/login", (req, res) => {
    return res.redirect('login.html');
});
// ------------------------------------------------------------------------------------------------------------
app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin":'*'
    });
    return res.redirect('login_new_change.html');
})
// ------------------------------------------------------------------------------------------------------------
app.listen(3000);
