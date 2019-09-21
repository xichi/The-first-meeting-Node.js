/* 
   图书馆管理系统---入口文件
*/
const express = require('express');
const router = require('./router.js');
const path = require('path');
const bodyParser = require('body-parser');
const template = require('art-template');
const app = express();

//启动静态资源服务
app.use('/www',express.static('public'));

//设置模板引擎
app.set('views',path.join(__dirname,'views'));
app.set('view engine','art');
app.engine('art',require('express-art-template'));

//处理请求参数，挂载参数处理中间件（post）
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//路由
app.use(router);

//启动服务器功能
app.listen(1900,()=>{
    console.log('running');
})