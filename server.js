const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const bodyParser=require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const cors = require("cors");
var fetchVideoInfo = require('youtube-info');


const port =process.env.PORT || 3000;

var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/views') );
app.set('view engine', hbs);



app.get('/', (req,res) => {
    res.render('index.hbs');
});

app.get('/test', (r,s) => s.json({test : "This is test route"}))

function extractVideoID(url){
    // console.log(url);
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    if ( match && match[7].length == 11 ){
        // console.log(match[7]);
        return match[7];
    }else{
        alert("Could not extract video ID.");
    }
}

app.get('/download',(req,res)=>{

    fetchVideoInfo("2zyEs5tTaK8", function (err, videoInfo) {
        if (err) throw new Error(err);
        else
{
        // let jsonData = JSON.stringify(videoInfo);
        // res.send(jsonData); 
        // console.log(videoInfo);
        res.json({ details : videoInfo})
        
        
}
      });

});







app.listen(port, () => {
    console.log('Server is up at port ' + port);
});
