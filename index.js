var express = require('express');
var bodyParser = require('body-parser'); // Corrected require statement
var mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json()); // Connected 'bodyParse' to 'bodyParser'
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ 
    extended: true
}));

// connect to the database
mongoose.connect('mongodb://0.0.0.0:27017/Lets_Chat', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;
// check connection
db.on('error', () => console.log("Failed connecting to Lets_Chat Database!"));
db.once('open', () => {
    console.log("Successfully connected to Lets_Chat Database .")
    
});
// ------------------------------------------------------------------------------------------
//  instead of home1 and home 2 the socket io page has to be executed directly
app.post("/login", (req, res) => {
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
            
                const username = req.body.username;
                const password = req.body.psw;
            
                // Implement your login validation logic here
                if (isValidLogin(username, password)) {
                    // Redirect to the chatting page on successful login
                    res.redirect('http://localhost:5000');
                } else {
                    // Handle unsuccessful login, e.g., show an error message
                    res.status(401).send('Unauthorized');
                }
            
            function isValidLogin(a,b){
                return true;
            }    
           
            
    // return res.redirect('/home1.html');
    });
});
//------------------------------------------------------------------------------------------   
// check connection

 app.post("/register", (req1, res) => {
    
    var email = req1.body.email;
    var username = req1.body.username;
    var password = req1.body.password;

var data = {
"email":email,
"username": username,
"password": password
};

db.collection('register_details').insertOne(data, (err, collection) => {
if (err) {
    throw err;
}
else{
    console.log("Record inserted Successfully. . . .");
}
});
    return res.redirect('register.html');
});


// ------------------------------------------------------------------------------------------
app.post("/login", (req, res) => {
    return res.redirect('login_new_change.html');
});
// ------------------------------------------------------------------------------------------
app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    });
    return res.redirect('login.html');
});

app.listen(3000);
/*
    in utube : moving data from index to next  (html pages)
    in real  : moving data from home1 to home2 (html pages)
*/ 