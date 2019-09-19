/* 
    托管静态资源:
    可以指定虚拟目录，
    可以指定多个目录作为静态资源的目录
*/

const express = require('express');
const app = express();

app.use('/unreal',express.static('public'))

app.listen(3000,()=>{
    console.log('一切okay，噜啦啦~')
})
