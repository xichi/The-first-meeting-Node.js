const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs')
const express = require('express')
const app = express()

let movies = []

async function requestMovies(url) {
  request(url, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log('爬到数据了！！')
      //app.get('/', (req, res) => res.send(body))
      const $ = cheerio.load(body);
      const movieTables = $('.item');

      for (let index = 0; index < movieTables.length; index++) {
        let movieInfo = takemovie(movieTables[index]);
        console.log('正在爬取' + movieInfo.name + movieInfo.id);
        movies.push(movieInfo);
      }

    }
    else {
      console.log(response.statusCode)
    }
  })
}

//构造函数
let movie = function () {
  this.id = 0;
  this.name = 0;
  this.score = 0;
  this.pic = '';
  this.quote = '';
}

let takemovie = function (div) {
  let $ = cheerio.load(div)

  let m = new movie();
  m.name = $('.title').text();
  m.score = $('.rating_num').text();
  let pic = $('.pic');
  m.pic = pic.find('img').attr('src');
  m.id = pic.find('em').text();
  m.quote = $('.quote .inq').text();

  return m
};

const top250Url = function () {
  let urls = ['https://movie.douban.com/top250'];
  let urlContinue = 'https://movie.douban.com/top250?start=';
  let count = 25;
  for (let i = 0; i < 10; i++) {
    urls.push(urlContinue + count);
    count += 25;
  }
  return urls
}

async function crawlTop250() {
  return new Promise((resolve, reject) => {
    let url = top250Url()
    url.map(item => {
     requestMovies(item)
    })
  })
}

crawlTop250();

app.listen(1999, () => {
  console.log('running');
})