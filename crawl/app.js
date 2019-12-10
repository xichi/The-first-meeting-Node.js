const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs')
const express = require('express')
const app = express()

let figures = []

let requestMovies = function () {
  request('http://wiki.joyme.com/arknights/%E5%9B%BE%E9%89%B4%E4%B8%80%E8%A7%88', function (error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log('爬到数据了！！')
      //app.get('/', (req, res) => res.send(body))
      const $ = cheerio.load(body);
      const figureTables = $('.wikitable');

      figureTables.map((item, index) => {
        console.log(figureTables[0]);
        let figureInfo = takeFigure(item, index);
        //console.log('正在爬取' + figureInfo.name);
        figures.push(figureInfo);
      });

    }
    else {
      console.log(response.statusCode)
    }
  })
}


requestMovies();

//构造函数
let figure = function () {
  this.id = 0;
  this.name = 0;
  this.pic = '';
}

let takeFigure = function (div, id){
  let $ = cheerio.load(div)

  let f = new figure();
  f.name = $('a').attr('title');
  f.id = id;
  //f.pic = e.find('img').attr('src');
  //console.log(f);

  return f
};

app.listen(1999, () => {
  console.log('running');
})