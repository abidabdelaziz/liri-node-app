var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request= require("request");
var fs = require("fs")
//Env
require("dotenv").config();
//Keys
var keysST=require("./keys.js");
var client= new Twitter(keysST.twitter)
var spotify= new Spotify(keysST.spotify)
var action 
var search 
//User inputs
    if (process.argv[2]=='do-what-it-says'){
        fs.readFile("random.txt", "utf8", function( error,data){
            if(error){return console.log(error)}
            action= data.split(", ")[0]
                if (action == "my-tweets"){
                    search= 'Abid37951019'
                    liriFun(action,search)
                    break;
                }
            search= data.split(", ")[1]
            liriFun(action,search)     
        })
    }
    else{ 
        search= process.argv[3];
        action = process.argv[2];
        liriFun(action,search)
    }

var liriFun = function(action,search){
   
    switch(action){
    
        case "my-tweets":
        search='Abid37951019'
        client.get('search/tweets',{q: search, count : 6}, function(error,tweets,response){
        var i=0;
            while (i, i<6){
                console.log(tweets.statuses[i].text)
                i+=1;
            } 
        })
            break;
        case "spotify-this-song":

            spotify.search({type: "track", query: search })
                .then(function(response) {
                    
                    //Artist
                    console.log("Artist: ",response.tracks.items[0].album.artists[0].name);
                    //Song Name
                    console.log("Song Name: ",response.tracks.items[0].name);
                    //Link
                    console.log("Link: ",response.tracks.items[0].href);
                    //Album
                    console.log("Album: ",response.tracks.items[0].album.name);
                })
                .catch(function(err) {
                    console.log(err);
                });
    

            break;
        case "movie-this":

                queryUrl= "http://www.omdbapi.com/?apikey=trilogy&t=%27" + search;
                request(queryUrl, function(error,response,body){
                    if(!error && response.statusCode === 200){

                        retObj= JSON.parse(response.body);
                        //Title
                        console.log("Title: ",retObj.Title)
                        //Release Year
                        console.log("Year: ",retObj.Year)
                        //Rating IMDB
                        console.log("IMDB: ",retObj.Ratings[0].Value)
                        //Rotten Tomatoes
                        console.log("Rotten Tomatoes: ",retObj.Ratings[1].Value)
                        //Country
                        console.log("Country: ",retObj.Country)
                        //Language
                        console.log("Language: ",retObj.Language)
                        //Plot
                        console.log("Plot: ",retObj.Plot)
                        //Actors
                        console.log("Actors: ",retObj.Actors)
                    }
                }) 
            break;
    }
}