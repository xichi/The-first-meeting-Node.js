/* 
   路由模块
*/

const express = require('express');
const router = express.Router();
const service = require('./service.js');

//渲染主页
router.get('/',service.showIndex);

//具体操作
router.get('/toAddBook',service.toAddBook);
router.post('/addBook',service.addBook);
router.get('/toEditBook',service.toEditBook);
router.post('/editBook',service.editBook);
router.get('/deleteBook',service.deleteBook);
router.get('/toSearchBook',service.toSearchBook);
router.get('/searchBook',service.searchBook);

module.exports = router;
