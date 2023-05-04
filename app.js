const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();
app.use(express.static("public"));
app.get('/', (req, res) => res.sendFile(__dirname + '/signup.html'));
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', (req, res) => {
    var firstname=req.body.fName;
    var lastname=req.body.lName;
    email =req.body.email;

var data={
    members: [
        {
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstname,
                LNAME: lastname,
            }
        }
    ]
};

var jsonData=JSON.stringify(data);

var options={
        url: "https://us13.api.mailchimp.com/3.0/lists/3163fa5f43",
        method: "POST",
        headers:{
            "Authorization" : "aditya1 d2bc6a800cd74064aac26a07d46a616d-us13"
        },
        body: jsonData,
};

request(options, function(error, response, body){
        if(error){
            res.sendFile(__dirname + '/failure.html');
        } else {
            if(response.statusCode===200){
                res.sendFile(__dirname + '/success.html');
            }
            else{
                res.sendFile(__dirname + '/failure.html');
            }
        }
});
});
app.post("/failure", (req, res) => res.redirect("/"));
app.listen(process.env.PORT || 3000, () => console.log(`Server listening on port 3000!`));