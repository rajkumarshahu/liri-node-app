require("dotenv").config();
var keys = require("./keys.js");
const Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var fs = require('fs');
var moment = require('moment');
moment().format();

var command = process.argv[2];
var userSearchKey = process.argv[3].trim();

function spotifyThis(){
    if(command == "spotify-this-song"){
        spotify.search({
            type: "track",
            query: userSearchKey
        }, function (err, data) {
            if (err) {
                console.log("Error occured: " + err);
                fs.appendFile("log.txt", `${err}`, (err)=>{
                    console.log(err);
                });
            }
            var trackDetail = data.tracks.items
            //console.log(data.tracks);
            console.log(`><><><><><><>Spotifying><><><><><><><`);
            console.log("Artist: " + trackDetail[0].artists[0].name);
            console.log("Song Name: " + trackDetail[0].name);
            console.log("Preview Link: " + trackDetail[0].preview_url);
            console.log("Album: " + trackDetail[0].album.name);
            console.log(`><><><><><><>Spotified><><><><><><><`);
            var logData = `\n><><><><><><>Spotifying><><><><><><><\nArtist: ${trackDetail[0].artists[0].name}\nSong Name: ${trackDetail[0].name}\nPreview Link: ${trackDetail[0].preview_url}\nAlbum: ${trackDetail[0].album.name}\n><><><><><><>Spotified><><><><><><><\n`;

            fs.appendFile("log.txt", `${logData}`, function(err){
                console.log(err);
            });
        });
    }
}
//spotifyThis();





// axios.get("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy").then(
//   function(response) {
//     // Then we print out the imdbRating
//     console.log("The movie's rating is: " + response.data.imdbRating);
//   }
// );

function getVenue(){
    if(command == "concert-this" && userSearchKey != undefined){
        axios.get("https://rest.bandsintown.com/artists/" + userSearchKey + "/events?app_id=codingbootcamp").then(
          function(response) {
                var venueDetail = response.data
                //console.log(venueDetail[0].venue);
                console.log("-------------------------------------");
                console.log("Venue: " + venueDetail[0].venue.name);
                console.log("Location: " + venueDetail[0].venue.city + " " + venueDetail[0].venue.region);
                console.log("Date: " + moment(venueDetail[0].datetime).format("MM/DD/YYYY"));
                console.log("-------------------------------------");

                var logData = `\n><><><><><><>B in T start><><><><><><><\nVenue: ${venueDetail[0].venue.name}\nLocation: ${venueDetail[0].venue.city} ${venueDetail[0].venue.region}\nDate: ${moment(venueDetail[0].datetime).format("MM/DD/YYYY")}\n><><><><><><>B in T end><><><><><><><\n`;

            fs.appendFile("log.txt", `${logData}`, function(err){
                console.log(err);
            });

          }
        );
    }else{
        console('Venue not found!!!')
    }
}

getVenue();
