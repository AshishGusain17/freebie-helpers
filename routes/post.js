const express=require('express');
const router=express.Router(); 


const post=require('../controllers/post');

router.get('/getpost',post.getpost);

router.post('/postpost',post.postpost);

router.get('/getanswer',post.getanswer);

router.post('/postanswer',post.postanswer);




module.exports=router;