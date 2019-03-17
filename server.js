const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var ytdl = require('ytdl-core');


const port =process.env.PORT || 3000;

var app = express();
app.use(express.static(__dirname + '/views') );
app.set('view engine', hbs);



app.get('/', (req,res) => {
    res.render('index.hbs');
});


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

