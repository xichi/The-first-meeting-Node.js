const express = require('express');
const app = express();

app.get('/',(req,res)=>{
   res.send('人生总是要不断尝试吖~');
}).listen(3000,()=>{
   console.log('一切ok，没有bug的哟！');
})