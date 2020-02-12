const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
// const bodyParser=require('body-parser');
// const MongoClient = require('mongodb').MongoClient;
// const cors = require("cors");
// const youtubedl = require('youtube-dl');
const ytdl = require('ytdl-core');



const port =process.env.PORT || 3000;

var app = express();
// app.use(cors());
// app.use(bodyParser.urlencoded({extended : true}));
// app.use(bodyParser.json());
app.use(express.static(__dirname + '/views') );
app.set('view engine', hbs);



app.get('/', (req,res) => {
    res.render('index.hbs');
});

// app.get('/test', (r,s) => s.json({test : "This is test route"}))

// function extractVideoID(url){
//     // console.log(url);
//     var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
//     var match = url.match(regExp);
//     if ( match && match[7].length == 11 ){
//         // console.log(match[7]);
//         return match[7];
//     }else{
//         alert("Could not extract video ID.");
//     }
// }

connection((status) => {
    if (status){
        app.get('/download', (req,res) => {
            res.header('Content-Disposition', 'attachment; filename="video.mp4"');
            ytdl(req.query.video, {
                format: 'mp4'
                }).pipe(res);
        });

      

    
    }
    else{
        app.get("/download", (req, res) => {
            res.render("error.hbs", {
                error : "Internet not connected"
            })
        })
    }
})


function connection(callback){
    require('dns').lookup('google.com', (error) => {
        if (error){
          
            callback(false)
        }
        else{
            callback(true);
        }
    })
}







app.listen(port, () => {
    console.log('Server is up at port ' + port);
});
