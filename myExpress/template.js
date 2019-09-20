/* 
  模板引擎
*/

const express = require('express');
const path = require('path');
const template = require('art-template');
const app = express();

//设置模板引擎
app.set('views',path.join(__dirname,'views'));
app.set('view engine','art');
app.engine('art',require('express-art-template')); //使express兼容art-template模板引擎

app.get('/list',(req,res)=>{
    let data = {
        title: '同性电影',
        list:['春光乍泄','蓝宇','请以你的名字呼唤我','上帝之国']
    }
    res.render('list',data)
})

app.listen(3000,()=>{
    console.log('running...')
})