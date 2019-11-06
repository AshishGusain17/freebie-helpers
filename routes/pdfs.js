const express=require('express');
const router=express.Router();
const pdfs=require('../controllers/pdfs');

router.get('/forms',pdfs.download);

router.get('/formsDownload/:orderId',pdfs.formsDownload);

module.exports=router; 