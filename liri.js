require("dotenv").config();
var moment = require('moment');
var fs = require('fs');
var Spotify=require('node-spotify-api');
var moment=require('moment');
var axios=require('axios');
var keys=require('./keys');
var spotify = new Spotify(keys.spotify);
var logText;
var userCommand = process.argv[2];
var userInput = process.argv[3];

for(var k=4;k<process.argv.length;k++){
    userInput+=' '+process.argv[k];
};

if(userCommand=='do-what-it-says'){
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
          return console.log(error);
        }
        var dataArr = data.split(",");
        userCommand = dataArr[0];
        userInput = dataArr[1];
        search();
      });
      
}else{search()}

function search(){
    if(userCommand=='concert-this'){
      if(!userInput){userInput = "Florence And The Machine"}
        axios.get('https://rest.bandsintown.com/artists/'+userInput+'/events?app_id='+keys.bandsInTown.appId)
      .then(function (response) {
        for(var i=0;i<response.data.length;i++){
          logText=`Venue name : ${response.data[i].venue.name} \nVenue location : ${response.data[i].venue.city} \nDate of Event : ${moment(response.data[i].datetime).format("MM/DD/YYYY")}\n--------------------------------- \n`
          console.log(logText)
          writeLog();
        }
      });
    }
    
    if(userCommand=='spotify-this-song'){
      if(!userInput){userInput = "The sign by Ace of Base"}
        spotify.search({ type: 'track', query: userInput, limit:'10' }, function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            }
          for(var k = 0;k<data.tracks.items.length;k++){
            logText=`Artist : ${data.tracks.items[k].album.artists[0].name} \nAlbum name : ${data.tracks.items[k].album.name} \nSong name : ${data.tracks.items[k].name} \nPreview url : ${data.tracks.items[k].preview_url} \n-------------------------------------\n`
            console.log(logText);
            writeLog();
            }
          });
    }
    
    if(userCommand=='movie-this'){
      if(!userInput){userInput = 'Mr. Nobody'}
        axios.get('https://www.omdbapi.com/?t='+userInput+'&apikey='+keys.omdb.apiKey)
      .then(function (response) {
        logText=`Title : ${response.data.Title} \nYear : ${response.data.Released} \nIMDB Rating : ${response.data.imdbRating} \nRotten Tomatoes : ${response.data.Ratings[0].Value} \nRotten Tomatoes : ${response.data.Ratings[0].Value} \nCountry : ${response.data.Country} \nLanguage : ${response.data.Language} \nMovie Plot : ${response.data.Plot} \nActors : ${response.data.Actors}\n`
        console.log(logText);
        writeLog();
      });
    }
}
function writeLog(){
  fs.appendFile("log.txt", logText, function(err) {
    if (err) {
      console.log(err);
    }
  });
}