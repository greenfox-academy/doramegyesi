'use strict';

const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require("mysql");
const express = require('express');
const app = express();
var response;

app.use('/assets', express.static('assets'));
app.use('/img', express.static('img'));
app.use(bodyParser.json());
app.use(cors());

const connect = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "foxplayer"
});

connect.connect(function(err) {
  if(err) {
    console.log("could not connect");
  }
  console.log("connected successfully");
});

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/foxplayer.html');
});

app.get('/playlists', function(req, res) {
	connect.query('SELECT * FROM playlists', function(err, rows) {
		if (err) {
			console.log('could not reach the playlists', err.message);
		} else {
			response = rows;
			console.log(response);
		}
        res.send(response);
	});
});

app.get('/playlists-tracks', function(req, res) {
    connect.query('SELECT * FROM tracks', function(err, rows) {
        if (err) {
            console.log('could not reach the tracklist', err.message);
        } else {
            response = rows;
        };
        res.send(response);
    });
});

app.get('/playlists-tracks/:playlistId', function(req, res) {
    connect.query('SELECT * FROM tracks INNER JOIN joint ON tracks.id = joint.track_id WHERE joint.playlist_id = "' + req.params.playlistId + '"', function(err, rows) {
        if (err) {
            console.log('could not find the playlist', err.message);
        } else {
            response = rows;
        };
        res.send(response);
        console.log(response);
    });
});

app.listen(3000, function() {
    console.log('server is running smoothly');
});
