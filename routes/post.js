const express=require('express');
const router=express.Router(); 


const post=require('../controllers/post');

router.get('/getpost',post.getpost);

router.post('/postpost',post.postpost);

router.get('/getanswer',post.getanswer);

router.post('/postanswer',post.postanswer);

router.get('/divclick/:idnum',post.divclick);

router.post('/newcomment/:idnum',post.newcomment);

router.get('/newcomment_redirect',post.newcomment_redirect);

router.post('/userreply/:idnum',post.userreply);

module.exports=router;