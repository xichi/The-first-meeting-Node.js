const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs')
const express = require('express')
const app = express()

let movies = []

let requestMovies = function(url){
  request('https://movie.douban.com/top250', function(error, response, body){
    if(!error && response.statusCode === 200){
      console.log(body);
    }
  })
}

app.listen(1999,()=>{
  console.log('running');
})