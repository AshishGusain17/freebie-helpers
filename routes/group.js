const express=require('express');
const router=express.Router(); 


const group=require('../controllers/group');

router.get('/formgroup',group.formgroup);

router.post('/add',group.add);

router.post('/create',group.create);

router.get('/showgroup',group.showgroup);

// router.get('/indirectdisplay',chat.displayIndirect);
// router.get('/products',shop_cont.getProduct);

// router.get('/cart',user_cont.userIdForEachLink,shop_cont.getCart);

module.exports=router;