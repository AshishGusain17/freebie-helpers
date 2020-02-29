const express=require('express');
const router=express.Router(); 


const chat=require('../controllers/chat');
// const user_cont=require('../controllers/user');

router.get('/find',chat.getFind);

router.post('/find',chat.postFind);

router.post('/display',chat.display);

// router.get('/products',shop_cont.getProduct);

// router.get('/cart',user_cont.userIdForEachLink,shop_cont.getCart);

module.exports=router;