const express=require('express');
const router=express.Router(); 


const refresh=require('../controllers/refresh');

router.get('/refresh',refresh.refresh);



module.exports=router;