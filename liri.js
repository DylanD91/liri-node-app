// Reading and setting any environment variables with the dotenv package
require("dotenv").config();

//Variables
var keys = require('./javascript/keys');
var Spotify = require('node-spotify-api');

//added to format table 
var cTable = require('console.table');
var request = require('request');
var moment = require('moment');



var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
  });


// FUNCTIONS

if (process.argv[2] == 'concert-this' ) {
   
    var artist = process.argv.slice(3).join(" ")
    console.log(artist);
   
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    request(queryURL, function (error, response, body) {
        if (error) console.log(error);
        var result  =  JSON.parse(body)[0];
        console.log("Venue name " + result.venue.name);
        console.log("Venue location " + result.venue.city);
        console.log("Date of Event " +  moment(result.datetime).format("MM/DD/YYYY"));
       


    });


    // Name of and Venue location  
} else if ( process.argv[2] == 'spotify-this-song') {

    var songName = process.argv.slice(3).join(" ");
// If the song name is undefinded, play The Sign by Ace of Base
    if (songName == undefined) {
        songName = "The Sign by Ace of Base";
    } 
   

     spotify.search({ type: 'track', query: songName, limit: 10  }, function(err, data) {
            if (err) {
            return console.log('An error has occurred: ' + err);
            }

            var tableArray = [];

            for (var i = 0; i < data.tracks.items.length; i++ ) {
                var result = {
                    artist : data.tracks.items[i].album.artists[0].name,
                    album_name : data.tracks.items[i].album.name,
                    song_name : data.tracks.items[i].name,
                    preview_url : data.tracks.items[i].preview_url 
                }
                tableArray.push(result);
            }
      
            
            var table = cTable.getTable(tableArray);
    
            console.log(table);

       
    });

// If no movie is definied... Mr. Nobody will be selected
} else if ( process.argv[2] == 'movie-this') {
    var movieName = process.argv.slice(3).join(" ");

    if (movieName == undefined) {
        movieName = "Mr. Nobody";
    } 

    request('http://www.omdbapi.com/?i=tt3896198&apikey=55e8eecb&t=' + process.argv[3], function (error, response, body) {
        // Results 
        var result  =  JSON.parse(body);
        console.log("Title :" + result.Title);
        console.log("Year :" + result.Released);
        console.log("IMDB Rating :" + result.imdbRating );
        console.log("Rotten Tomatoes :" + result.Ratings[1].Value);
        console.log("Country :" +  result.Country);
        console.log("Language :" + result.Language);
        console.log("Movie Plot :" + result.Plot);
        console.log("Actors :" +  result.Actors);

    });

} else if ( process.argv[2] == 'do-what-it-says') {
    console.log('do what it says')
}
   
