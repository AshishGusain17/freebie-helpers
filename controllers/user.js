const user=require('../data/user');
const profile=require('../data/profile');
const details=require('../data/details');

const currentUser=(req,res,next)=>{
    console.log(34);
    accountName=req.session.accountName;
    user.findOne({accountName:accountName})
        .then(user=>{
            req.logUser=user;
            // console.log(5,req.logUser,67);
            console.log(5,'userlogin',67);

            next();
        })
        .catch(err=>{console.log(53,err,67);});
}

const userIdForEachLink=(req,res,next)=>{
    // console.log(23,req.session,7);
    if(req.session.loggedIn){
        user.findById(req.session.us._id)
        .then(obj=>{
                req.getobj=obj;
                // console.log(68,req.getobj,69);
            next();
        })
        .catch((err)=>{console.log(66,err,67);});
    }
    else{
        console.log(43,'first log in',5);
        // res.render('error',{tit:'first log in',isAuthenticated:false});
        res.redirect('/login');
    }
     
};  

 
// const addUser=(req,res,next)=>{
//     console.log(32,'adding_user',87);
//     obj={
//         email:'ashishgusain2017@iiitkottayam.ac.in',
//         password:11,
//         accountNumber:12345,
//         amount:1000,
//         details:[]
//     };
//     obj1=new user(obj);
//     obj1.save()
//         .then(a=>{
//             res.redirect('/');
//         })
//         .catch(err=>{console.log(23,err,89);});
// }




module.exports={
    currentUser:currentUser,
    userIdForEachLink:userIdForEachLink
}