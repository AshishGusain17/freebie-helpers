const express=require('express');
const router=express.Router();
const loan=require('../controllers/loan');

router.get('/loan/:type',loan.loanType);

// router.get('/car',loan.carLoan);


module.exports=router; 