const express=require('express');
const router=express.Router();
const user=require('../controllers/user');

router.use(user.currentUser);
// router.get('/addUser',user.addUser);


module.exports=router; 