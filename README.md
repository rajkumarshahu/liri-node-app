# liri-node-app

## Overview

* LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data. LIRI will search Spotify for songs, Bands in Town for concerts, and OMDB for movies.

* In addition, this application is capable of logging the data to your terminal/bash window, output data by appending each command you run to a .txt file called [log.txt](log.txt).

## Demo Video

[![asciicast](https://asciinema.org/a/pccTcPLuqMSu5v1EiwwZQqwnm.svg)](https://asciinema.org/a/pccTcPLuqMSu5v1EiwwZQqwnm)

## Getting Started

* Download and unzip the project.

## Prerequisites

* [Install node.js](https://nodejs.org/en/download/)

## Running app

```sh
cd liri-node-app

npm install (to install dependencies)
```

### liri.js can take in one of the following commands:

* `concert-this`

* `spotify-this-song`

* `movie-this`

* `do-what-it-says`

### Each of above command in detail:

1. `node liri.js concert-this <artist/band name here>`

   * This will search the Bands in Town Artist Events API for an artist and render the following information about each event to the terminal:

     * Name of the venue

     * Venue location

     * Date of the Event

2. `node liri.js spotify-this-song '<song name here>'`

   * This will show the following information about the song in your terminal/bash window

     * Artist(s)

     * The song's name

     * A preview link of the song from Spotify

     * The album that the song is from

   * If no song is provided then your program will default to "The Sign" by Ace of Base.

3. `node liri.js movie-this '<movie name here>'`

   * This will output the following information to your terminal/bash window:

    ```
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
    ```

   * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

4. `node liri.js do-what-it-says`

   * LIRI will take the text inside of random.txt and will run `spotify-this-song` for "I Want it That Way," as follows the text in [random.txt](random.txt).

## Packages used

* [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)

* [Axios](https://www.npmjs.com/package/axios)

* [Moment](https://www.npmjs.com/package/moment)

* [DotEnv](https://www.npmjs.com/package/dotenv)

## Author

* <a href="https://rajkumarshahu.github.io/Responsive-Portfolio/" target="_blank">Raj Kumar Shahu</a>
