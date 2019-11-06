const mongodb=require('mongodb');
const nopes=require('../data/product');
const user=require('../data/user');
const orders=require('../data/order');

const getAddProduct=(req,res,next)=>{
    res.render('admin/editp',{tit:'addp-ejs',editing:false,isAuthenticated:req.session.loggedIn});
}; 

const postAddProduct=(req,res,next)=>{
    obj={title:req.body.title,
        price:req.body.price,
        path:req.file.path,
        description:req.body.description,
        userId:req.getobj._id};
    if(!req.file){
        return res.redirect('/addp');
    }
    const obj1=new nopes(obj);
    obj1.save()
        .then(re=>{
            console.log(2,'going from save()',3);
            res.redirect('/shopping');
        })
        .catch(err=>{console.log(39,err,40);}); 
}; 

const getAdminProduct=(req,res,next)=>{
    nopes.find({userId:req.session.us._id})
        .then(arr=>{
            res.render('admin/p',{tit:'admin-edit_ejs',prods:arr,isAuthenticated:req.session.loggedIn});
        })
        .catch(err=>{console.log(50,err,51);});
}   

const getEditProduct=(req,res,next)=>{
    const qu=req.query.edit;
    if(!qu){
        return res.redirect('/');
    }
    const idhere=req.params.productId;
    nopes.findById(idhere)
            .then(obj=>{
                console.log(3,obj.userId,req.session.us._id,56);
                if(obj.userId.toString()===req.session.us._id.toString()){
                    console.log(54,obj,55);
                    res.render('admin/editp',{tit:'edit-ejs',editing:qu,product:obj,isAuthenticated:req.session.loggedIn});
                }
                else{
                    res.redirect('/shopping');
                }
            })
            .catch(err=>{console.log(56,err,57);}); 
}

const editandchange=(req,res,next)=>{
    let title=req.body.title;
    let price=req.body.price;
    console.log(req.file,8)
    let path=req.file.path;
    let des=req.body.description;
    let idhere=req.body.idd;
    nopes.findById(idhere)
            .then(obj=>{
                obj.title=title;
                obj.price=price;
                obj.path=path;
                obj.description=des;
                obj.save().then(a=>{
                    res.redirect('/shopping');
                })
                .catch(err=>{console.log(49,err,23);});
            })
            .catch(err=>{console.log(39,err,40);});
}   

const deleteProduct=(req,res,next)=>{
    idhere=req.body.idd; 
    pr=req.body.prr;
    nopes.findByIdAndRemove(idhere)
                        .then(result=>{
                                res.redirect('/shopping');
                            })
                        .catch(err=>{console.log(39,err,40);});
} 

const deletefromcart=(req,res,next)=>{
    idhere=req.body.idd;           //id of product
    pr=req.body.prr;
    itemss=req.getobj.cart.items;
    let ind=-1;
    ind=itemss.findIndex((pa)=>{
        return (pa.productId.toString()===idhere.toString());
    })
    let upcart={};
    if(itemss[ind].qty>1){
        itemss[ind].qty=itemss[ind].qty-1 ;
        upcart={items:[...itemss]} ;
    }
    else{ 
        item=itemss.filter(res=>{
            return (res.productId.toString()!==idhere.toString());
        })
        upcart={items:[...item]};
    }
    console.log(45,upcart,2);
    user.findById(req.getobj._id)
            .then(obj=>{
                obj.cart=upcart;
                obj.save()
                    .then(ob=>{
                        res.redirect('/cart');
                    })
                    .catch(err=>{console.log(19,err,40);})
            })
            .catch(err=>{console.log(99,err,40);})
}

module.exports={
    getAddProduct:getAddProduct,
    getEditProduct:getEditProduct,
    postAddProduct:postAddProduct,
    getAdminProduct:getAdminProduct,
    editandchange:editandchange,
    deleteProduct:deleteProduct,
    deletefromcart:deletefromcart,


    nopes:nopes
}     
