const user=require('../data/user');
const profile=require('../data/profile');
const details=require('../data/details');
const nodemailer=require('nodemailer');

const getSignup=(req,res,next)=>{
    res.render('auth/signup',{tit:'signup',messageL:false,messageS:false,isAuthenticated:false});
}

const postSignup=(req,res,next)=>{
    password=+req.body.password;
    confirmPassword=+req.body.confirmPassword;
    accountNumber=+req.body.accountNumber;
    // email=req.body.email;
    object={
        password:password,
        amount:2000,
        accountNumber:accountNumber,
        details:[],
        // email:email,
        cart:{items:[]}
    };
    user.findOne({accountNumber:accountNumber})
        .then(obj=>{
            if(obj){
                res.render('auth/signup',{tit:'signup_again',messageL:false,messageS:'User already exists',isAuthenticated:req.session.loggedIn});
            }
            else{
                console.log(67,password,confirmPassword,89);
                if(password===confirmPassword){
                    obj1=new user(object);
                    obj1.save()
                        .then(a=>{
                            res.redirect('/');
                        })
                        .catch(err=>{console.log(3,err,8);});
                }
                else{
                    res.render('auth/signup',{tit:'signup_again',messageL:false,messageS:'Password not matching',isAuthenticated:req.session.loggedIn});
                }
            }
        })
        .catch(err=>{console.log(83,err,82);});
} 


const getLogin=(req,res,next)=>{
    res.render('auth/login',{tit:'login',messageS:false,messageL:false,isAuthenticated:false});
}

const postLogin=(req,res,next)=>{
    password=req.body.password;
    accountNumber=req.body.accountNumber;
    user.findOne({accountNumber:accountNumber})
        .then(user=>{
            if(user){
                console.log(76,user.password,password,09);
                if(user.password==password){
                    req.session.loggedIn=true;
                    req.session.accountNumber=user.accountNumber;
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





























// const getResetPassword=(req,res,next)=>{
//     res.render('auth/reset',{tit:'check_email',isAuthenticated:false,message:false})
// }

// const postResetPassword=(req,res,next)=>{
//     email=req.body.email;
//     number=req.body.number;
//     user.findOne({accountNumber:number})
//         .then(obj=>{
//             if(obj && email){
                
//                     // token=buffer.toString('hex');
//                     timelimit=Date.now() + 3600000;
//                     // obj.token=token;
//                     obj.timelimit=timelimit;
//                     // console.log(45,obj.timelimit,obj.token,token,timelimit,3);
//                     obj.save()
//                     .then(k=>{
//                         const transporter = nodemailer.createTransport({
//                             service: 'gmail',
//                             auth: {
//                                 user: 'aaashishgusain123456789@gmail.com',
//                                 pass: 'Iamnotashish1!'
//                             }
//                             }); 
//                         const mailOptions = {
//                             from: 'ashish@gmail.com',
//                             to: email,
//                             subject: 'Resetting the password',
//                             html: `<h1>U wished to reset the password</h1>
//                                     <p>to reset <a href='http://localhost:4000/resetactual/'>click</a>on the given link</p>`
//                         };
//                         transporter.sendMail(mailOptions)
//                             .then(info=>{
//                                 console.log('Email sent: ' + info.response);
//                                 res.redirect('/');
//                             })
//                             .catch(err=>{console.log(34,err,76);});
//                     })
//                     .catch(err=>{console.log(64,err,56);});
//                 }    
                  
            
//             else{
//                 res.render('auth/reset',{tit:'check_email',isAuthenticated:false,message:'no such account, firstly signup'})
//             }
//         })
//         .catch(err=>{console.log(7,err,34);});
// }

// const getResetPasswordActually=(req,res,next)=>{
//     token=req.params.token;
//     console.log(4,token,78); 
//     user.findOne({token:token,timelimit:{ $gt:Date.now() }})
//         .then(obj=>{
//             // console.log(65,obj,7);
//             res.render('auth/resetactual',{tit:'pass_change',token:token,email:obj.email,isAuthenticated:false,message:false})
//         })
//         .catch(err=>{console.log(98,err,4);});
    
// }

// const postResetPasswordActually=(req,res,next)=>{  
//     email=req.body.email;
//     originalPassword=req.body.originalPassword;
//     newPassword=req.body.newPassword;
//     // console.log(email,newPassword,originalPassword);
//     user.findOne({email:email,token:token,timelimit:{ $gt:Date.now() }})
//         .then(obj=>{
//             bcrypt.compare(originalPassword,obj.password)
//                 .then(bool=>{
//                     if(bool){
//                         bcrypt.hash(newPassword,10)
//                             .then(hashed=>{ 
//                                 obj.password=hashed;
//                                 obj.timelimit=undefined;
//                                 obj.token=undefined;
//                                 obj.save()
//                                     .then(a=>{
//                                         console.log(34,'password reset',56);
//                                         res.redirect('/login');
//                                     })
//                                     .catch(err=>{console.log(57,err,56);});
//                             })
//                             .catch(err=>{console.log(17,err,74);});
//                     }
//                     else{
//                         res.redirect('/reset');
//                     }
//                 })
//                 .catch(err=>{console.log(7,err,78);});
//         })
//         .catch(err=>{console.log(7,err,78);});
// }













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