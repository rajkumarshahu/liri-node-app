require("dotenv").config();
var keys = require("./keys.js");
const Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var fs = require("fs");
var moment = require("moment");
moment().format();

var command = process.argv[2];
var userInput = process.argv;
var userSearchKeys = "";
for (var i = 3; i <= userInput.length - 1; i++) {
  userSearchKeys += process.argv[i] + " ";
}
var userSearchKeysConcert = "";
for (var i = 3; i <= userInput.length - 1; i++) {
  userSearchKeysConcert += process.argv[i];
}

switch (command) {
  case "spotify-this-song":
    if (userSearchKeys == "") {
      userSearchKeys = "The sign Ace of Base";
    }
    spotifyThis(userSearchKeys);
    break;

  case "movie-this":
    if (userSearchKeys == "") {
      userSearchKeys = "Mr. Nobody.";
    }
    getMovieData(userSearchKeys);
    break;

  case "concert-this":
    if (userSearchKeysConcert == "") {
      console.log("Please enter your search key word!!!");
    }
    getVenue(userSearchKeysConcert);

    break;

  case "do-what-it-says":
    doWhatItSays();
    break;
}

function spotifyThis(song) {
  console.log(userSearchKeys);
  song = userSearchKeys;
  if (command == "spotify-this-song") {
    spotify.search(
      {
        type: "track",
        query: song,
      },
      function(err, data) {
        if (err) {
          console.log("Error occured: " + err);
          fs.appendFile("log.txt", `${err}`, err => {
            console.log(err);
          });
        }

        var trackDetail = data.tracks.items;
        console.log(`><><><><><><>Spotifying><><><><><><><`);
        console.log("Artist: " + trackDetail[0].artists[0].name);
        console.log("Song Name: " + trackDetail[0].name);
        console.log("Preview Link: " + trackDetail[0].preview_url);
        console.log("Album: " + trackDetail[0].album.name);
        console.log(`><><><><><><>Spotified><><><><><><><`);
        var logData = `\n><><><><><><>Spotifying><><><><><><><\nArtist: ${
          trackDetail[0].artists[0].name
        }\nSong Name: ${trackDetail[0].name}\nPreview Link: ${
          trackDetail[0].preview_url
        }\nAlbum: ${
          trackDetail[0].album.name
        }\n><><><><><><>Spotified><><><><><><><\n`;

        fs.appendFile("log.txt", `${logData}`, function(err) {
          console.log(err);
        });
      }
    );
  }
}

function getMovieData(movie) {
  movie = userSearchKeys;
  var queryUrl =
    "http://www.omdbapi.com/?&t=" +
    movie +
    "&type=movie&y=&plot=short&apikey=trilogy";
  if (command == "movie-this") {
    axios
      .get(queryUrl)
      .then(function(response) {
        var movieData = response.data;
        // console.log("response.data");
        // console.log(movieData);
        if (movieData.Title != undefined) {
          console.log(`><><><><><><>Getting Movie Data><><><><><><><`);
          console.log("Movie Title is: " + movieData.Title);
          console.log("Year the movie came out: " + movieData.Year);
          console.log("IMDB Rating : " + movieData.imdbRating);
          if (movieData.Ratings[1] != undefined) {
            console.log(
              "Rotten Tomatoes Rating: " + movieData.Ratings[1].Value
            );
          } else {
            console.log("Rotten Tomatoes Rating: N/A");
          }

          console.log("Country: " + movieData.Country);
          console.log("Language: " + movieData.Language);
          console.log("Plot: " + movieData.Plot);
          console.log("Actors: " + movieData.Actors);
          console.log(`><><><><><><>Ending Movie Data><><><><><><><`);

          var logData = `\n><><><><><><>Getting Movie Data><><><><><><><\n
          Movie Title is: ${movieData.Title}
          Year the movie came out: ${movieData.Year}
          IMDB Rating: ${movieData.imdbRating}
          Rotten Tomatoes Rating: ${movieData.Ratings[1].Value}
          Country: ${movieData.Country}
          Language: ${movieData.Language}
          Plot: ${movieData.Plot}
          Actors: ${movieData.Actors}
          \n><><><><><><>End of Movie Data><><><><><><><\n`;
          fs.appendFile("log.txt", `${logData}`, function(err) {
            console.log(err);
          });
        } else {
          console.log(
            `Movie detail not found!!!\nEither ${movie} does not exist or you have probably misspelled it.\nPlease modify your search and try again.`
          );
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }
}

function getVenue(artist) {
  artist = userSearchKeysConcert;
  var queryUrl =
    "https://rest.bandsintown.com/artists/" +
    artist +
    "/events?app_id=codingbootcamp";
  if (command == "concert-this") {
    axios
      .get(queryUrl)
      .then(function(response) {
        var venueDetail = response.data;
        if (venueDetail[0] == undefined) {
          console.log(`
    ><><><><><><>Getting Venue><><><><><><><
    Venue detail not found!!!
    ${artist} is not performing at the moment.
    Please come back later.
    ><><><><><><><><><><><><<><><><><><><><><\n`);
          return false;
        } else {
          console.log("><><><>Getting Bands in Town><><><><><><><");
          console.log("Venue: " + venueDetail[0].venue.name);
          console.log(
            "Location: " +
              venueDetail[0].venue.city +
              " " +
              venueDetail[0].venue.region
          );
          console.log(
            "Date: " + moment(venueDetail[0].datetime).format("MM/DD/YYYY")
          );
          console.log("><><><><><>Ending Bands in Town<><><><><><><");
          var logData = `\n><><><><><><>B in T start><><><><><><><\n
            Venue: ${venueDetail[0].venue.name}
            Location: ${venueDetail[0].venue.city} ${
            venueDetail[0].venue.region
          }
            Date: ${moment(venueDetail[0].datetime).format("MM/DD/YYYY")}
            \n><><><><><><>B in T end><><><><><><><\n`;
          fs.appendFile("log.txt", `${logData}`, function(err) {
            console.log(err);
          });
        }
      })
      .catch(function(error) {
        console.log(`
        ><><><><><><>Getting Venue><><><><><><><
        Venue detail not found!!!
        ${artist} is not performing at the moment.
        Please come back later.
        ><><><><><><><><><><><><<><><><><><><><><`);
        console.log(error);
      });
  }
}

function doWhatItSays() {
  if (command == "do-what-it-says") {
  }
  fs.readFile("random.txt", "utf8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      var dataArr = data.split(",");

      spotify.search(
        {
          type: "track",
          query: dataArr[1],
        },
        function(err, data) {
          if (err) {
            console.log("Error occured: " + err);
            fs.appendFile("log.txt", `${err}`, err => {
              console.log(err);
            });
          }
          var trackDetail = data.tracks.items;
          console.log(`><><><><><><>Spotifying><><><><><><><`);
          console.log("Artist: " + trackDetail[0].artists[0].name);
          console.log("Song Name: " + trackDetail[0].name);
          console.log("Preview Link: " + trackDetail[0].preview_url);
          console.log("Album: " + trackDetail[0].album.name);
          console.log(`><><><><><><>Spotified><><><><><><><`);
          var logData = `\n><><><><><><>Spotifying><><><><><><><\nArtist: ${
            trackDetail[0].artists[0].name
          }\nSong Name: ${trackDetail[0].name}\nPreview Link: ${
            trackDetail[0].preview_url
          }\nAlbum: ${
            trackDetail[0].album.name
          }\n><><><><><><>Spotified><><><><><><><\n`;
          fs.appendFile("log.txt", `${logData}`, function(err) {
            console.log(err);
          });
        }
      );
    }
  });
}
