const express=require('express');
const router=express.Router();
const initial=require('../controllers/initial');

router.get('/',initial.start);


module.exports=router;   