const request = require('request-promise')
const cheerio = require('cheerio')
const fs = require('fs')
const express = require('express')
const app = express()

let movies = []

const requestMovies = function (url) {
  return new Promise(() => {
    request(url, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        console.log('爬到数据了！！')
        const $ = cheerio.load(body);
        const movieTables = $('.item');

        for (let index = 0; index < movieTables.length; index++) {
          let movieInfo = takemovie(movieTables[index]);
          console.log('正在爬取' + movieInfo.name + movieInfo.id);
          movies.push(movieInfo);
        }

        if (movies.length === 250) {
          let sortM = movies.sort((obj1, obj2) => {
            return obj1.id - obj2.id
          });
          saveMovies(sortM);
        }

      }
      else {
        console.log(response.statusCode)
      }
    });
  })
}

/* 
const delay = function (item) {
  return new Promise(resolve => setTimeout(function () {
    resolve(item);
    console.log(item);
  }, 3000));
}

const delayedLog = async function (item) {
  await delay();
  console.log(item);
}  */

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

const saveMovies = function (movies) {
  let path = 'movie.txt';
  let data = JSON.stringify(movies, null, 2);
  fs.writeFile(path, data, function (error) {
    if (error == null) {
      console.log('save successsly');
    } else {
      console.log('save error!', error);
    }
  })
}

const crawlTop250 = function () {
  let url = top250Url()
  url.forEach(async (item) => {
    await requestMovies(item)
    //await delay(item);
  })
}

crawlTop250();

app.listen(1999, () => {
  console.log('running');
})