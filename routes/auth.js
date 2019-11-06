const express=require('express');
const router=express.Router();
const user=require('../controllers/auth');

router.get('/signup',user.getSignup);

router.post('/signup',user.postSignup);

router.get('/login',user.getLogin);

router.post('/login',user.postLogin);

router.get('/logout',user.getLogout);

// router.get('/reset',user.getResetPassword);

// router.post('/reset',user.postResetPassword);
// router.get('/resetactual/:token',cont_auth.getResetPasswordActually);

// router.post('/resetactual',cont_auth.postResetPasswordActually);
module.exports=router; 