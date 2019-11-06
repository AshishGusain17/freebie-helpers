const express=require('express');
const router=express.Router();
const functions=require('../controllers/functions');

router.get('/withdraw',functions.getWithdraw);

router.post('/withdraw',functions.postWithdraw);

router.get('/transfer',functions.getTransfer);

router.post('/transfer',functions.postTransfer);

router.get('/deposit',functions.getDeposit);

router.post('/deposit',functions.postDeposit);

router.get('/checkBalance',functions.checkBalance);

router.get('/details',functions.allDetails);

router.get('/mini',functions.mini);

router.get('/loan',functions.getLoan);

module.exports=router; 