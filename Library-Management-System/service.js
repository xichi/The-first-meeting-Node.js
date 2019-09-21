/* 
  业务模块
*/
const data = require('./data.json');
const path = require('path');
const fs = require('fs');

//自动生成图书编号
let maxBookCode = ()=>{
  let arr = [];
  data.forEach((item)=>{
      arr.push(item.id)
  });
  return Math.max.apply(null,arr)   //求arr中的id最大值
}

//渲染主页面
exports.showIndex = (req,res)=>{
   res.render('index',{list : data});
}

//跳转到添加图书的页面
exports.toAddBook = (req,res)=>{
  res.render('addBook',{});
}
exports.addBook = (req,res)=>{
  let info = req.body;
  let book = {};
  for(let key in info)  book[key] = info[key];
  book.id = maxBookCode() + 1;
  data.push(book);
  //把内存数据写入文件
  fs.writeFile(path.join(__dirname,'data.json'),JSON.stringify(data,null,4),(err)=>{
     if(err){
       res.send('内部错误，请与管理员联系');
     }
     res.redirect('/');
  })
}

//跳转到编辑图书的页面
exports.toEditBook = (req,res)=>{
  let id = req.query.id;
  book = {};
  data.forEach((item)=>{
      if(id == item.id){
        book = item;
        return;
      }
  });
  res.render('editBook',book);
}
exports.editBook = (req,res)=>{
  let info = req.body;
  data.forEach((item)=>{
    if(info.id == item.id){
      for(let key in info){
         item[key] = info[key];
      }
      return;
    }
  });
  //把内存数据写入文件
  fs.writeFile(path.join(__dirname,'data.json'),JSON.stringify(data,null,4),(err)=>{
    if(err){
      res.send('内部错误，请与管理员联系');
    }
    res.redirect('/');
  })
}

// 删除图书信息
exports.deleteBook = (req,res) => {
  let id = req.query.id;
  let sql = 'delete from book where id=?';
  let data = [id];
  db.base(sql,data,(result)=>{
      if(result.affectedRows == 1){
          res.redirect('/');
      }
  });
}