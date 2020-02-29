const user=require('../data/user');
const nodemailer=require('nodemailer');

const getSignup=(req,res,next)=>{
    res.render('auth/signup',{tit:'signup',messageL:false,messageS:false,isAuthenticated:false});
}

const postSignup=(req,res,next)=>{
    password1=req.body.password;
    name1=req.body.accountName;
    email1=req.body.email;
    object={
        password:password1,
        accountName:name1,
        email:email1
        // details:[],
        // cart:{items:[]}
    };
    console.log(54,name1,password1,email1,94);
    if (password1=='' || name1=='' ||email1=='')
    {
        res.render('auth/signup',{tit:'signup_again',messageL:false,messageS:'Fill all details',isAuthenticated:req.session.loggedIn});
    }
    else{
        user.findOne({accountName:name1})
        .then(obj=>{
            if(obj){
                console.log(78,name1,password1,email1,98);
                res.render('auth/signup',{tit:'signup_again',messageL:false,messageS:'User already exists',isAuthenticated:req.session.loggedIn});
            }
            else{
                console.log(67,name1,password1,email1,29);
                obj1=new user(object);
                obj1.save()
                    .then(a=>{
                        res.redirect('/');
                    })
                    .catch(err=>{console.log(3,err,8);});

            } 
        })
        .catch(err=>{console.log(83,err,82);}); 
    }
} 


const getLogin=(req,res,next)=>{
    res.render('auth/login',{tit:'login',messageS:false,messageL:false,isAuthenticated:false});
}

const postLogin=(req,res,next)=>{
    password1=req.body.password;
    name1=req.body.accountName;
    if (password1=='' || name1==''){
        res.render('auth/login',{tit:'login',messageS:false,messageL:'Fill all the login details',isAuthenticated:!req.session.loggedIn});
    }
    user.findOne({accountName:name1})
        .then(user=>{
            if(user){
                console.log(76,user.password,password1,09);
                if(user.password==password1){
                    req.session.loggedIn=true;
                    req.session.accountName=name1;
                    req.session.us=user;
                    res.render('auth/postLogin',{tit:'postLogin',isAuthenticated:req.session.loggedIn,messageS:false,messageL:'finally logged in'});
                }
                else{
                    res.render('auth/login',{tit:'login',messageS:false,messageL:'Enter correct password',isAuthenticated:!req.session.loggedIn});
                }  
            }
            else{
                res.render('auth/login',{tit:'login',messageS:false,messageL:'Firstly signUp',isAuthenticated:!req.session.loggedIn});
            }
        })
        .catch(err=>{console.log(13,err,81);});
}
 

const getLogout=(req,res,next)=>{
    req.session.destroy(err=>{
        console.log(34,err,8);
        res.redirect('/');
    });  
} 





























module.exports={
    getSignup:getSignup,
    postSignup:postSignup,
    getLogin:getLogin,
    postLogin:postLogin,
    getLogout:getLogout
    // getResetPassword:getResetPassword,
    // postResetPassword:postResetPassword,
    // getResetPasswordActually:getResetPasswordActually,
    // postResetPasswordActually:postResetPasswordActually
}