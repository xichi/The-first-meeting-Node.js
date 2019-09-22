/* 
   登录验证（前端+后端+数据库）
*/
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db.js');
const app = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static('public'));

app.post('/login',(req,res)=>{
   let param = req.body;

   let sql = 'select count(*) as total from users where username=? and password=?';
   let data = [param.username,param.password];

   db.base(sql,data,(result)=>{
       if(result[0].total == 1){
           res.send('login');
       }else{
           res.send('login failure');
       }
   })
})

app.listen(3000,()=>{
    console.log('running...')
})