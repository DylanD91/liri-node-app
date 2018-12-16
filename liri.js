// Variables
// I had to get a lot of help from classmates with this assignment. This is defintely one of the most challenging ones for me
// I have tried different approaches for how to code, and this way got me the closest to getting the Liri to work
// However- it doesnt give me any of the information i request. It listens to the commands, doesn't show any errors
// But it just keeps having the console.log message appear, instead of results. 
// I will continute to work on this through out christmas break, because I want to at least get it to work!!!!

// Variables
require('dotenv').config();
let axios = require('axios');
let spotifyThis = require('node-spotify-api');
let moment = require('moment');
let keys = require('./keys.js');
var spotify = new spotifyThis(keys.spotify);
let inq = require('inquirer');
var fs = require('fs');
console.log('Please Enter what you are looking for. Movie-this to search movies ,spotify-this to look for a song, band-this to look for band, do-what-it-says to look for what liri bot likes\n')
var whatyouwant = process.argv[2];
var data = process.argv[3];

// commands
console.log(whatyouwant);
if(whatyouwant !== ""){
    switch(whatyouwant){
        case 'movie this':
            omdbThisMovie(data);
            break;
        case 'spotify this':
            omdbThisMovie(data);
            break;
        case 'band this':
            omdbThisMovie(data);
            break;
        case "do-what-it-says":
            justDoSomething();
            break;
    }
}

// Function for the command to get band information

function bandInTownFunc(band){
    if(band.includes(' ')){
        band = band.replace(' ','%20');
    }
    axios.get(`http://rest.bandsintown.com/artists/${band}/events?app_id=codingbootcamp`).then(
    function (response) {
        response.data.forEach(data =>{
            (data.venue.name);
            console.log(data.venue.city+', '+data.venue.country);
            console.log(moment(data.datetime, 'YYYY-MM-DDTHH:mm').utc().format("MM/DD/YYYY"));  
            fs.appendFile('band.txt',
                "Event Name: " + data.venue.name+'\n'+
                "Event Location: " + data.venue.city+', '+data.venue.country+'\n'+
                "Event Date: " + moment(data.datetime, 'YYYY-MM-DDTHH:mm').utc().format("MM/DD/YYYY")+'\n'+
                "=========================="+'\n',function(error){if(error)console.log(error)}
            );
            
        });
      }
);
}

// Function for the command to get song information through Spotify
function SpotifyThisFunc(song){
    if(song.includes(' ')){
        song = song.replace(' ','%20');
    }
    spotify.search({ type: 'track', query: song}, function(error, response){
        if(error){
            return console.log(error);
        }
        response.tracks.items.forEach(song=>{
            console.log("Artist: "+song.artists[0].name);
            console.log("Song Name: "+song.name);
            console.log("Preview Link: "+song.preview_url);
            console.log("The Song Album: "+song.album.name);
            
            //File
            fs.appendFile('song.txt',
                "Artist: "+song.artists[0].name+'\n'+
                "Song Name: "+song.name+'\n'+
                "Preview Link: "+song.preview_url+'\n'+
                "The Song Album: "+song.album.name+'\n'+
                "=========================="+'\n',
                function(error){if(error)console.log(error)}
            );
        });

      });
}

// Function for the command to get movie information
function omdbThisMovie(movieName){
    if(movieName.includes(' ')){
        movieName = movieName.replace(' ','%20');
    }

    let queryUrl = `http://www.omdbapi.com/?t=${movieName}&y=&plot=short&apikey=trilogy`;
    axios.get(queryUrl).then(
        function(response) {
            console.log(response);
            console.log("Title: " + response.data.Title);
            console.log("Release Year: " + response.data.Year);
            console.log("IMdB Rating: " + response.data.imdbRating);
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
            //print to file
            fs.appendFile('movie.txt',
                "Title: " + response.data.Title+'\n'+
                "Release Year: " + response.data.Year+'\n'+
                "IMdB Rating: " + response.data.imdbRating+'\n'+
                "Country: " + response.data.Country+'\n'+
                "Language: " + response.data.Language+'\n'+
                "Plot: " + response.data.Plot+'\n'+
                "Actors: " + response.data.Actors+'\n'+
                "=========================="+'\n',function(error){if(error)console.log(error)});
        }
    );
}

function justDoSomething(){
    fs.readFile('random.txt', "utf8", function(error, data){
      var song = data.split(',');
  
      SpotifyThisFunc(song[1]);
    });
  }


