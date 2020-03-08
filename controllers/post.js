const user=require('../data/user');
const query=require('../data/query');

const getpost=(req,res,next)=>{
    res.render('post/getpost',{tit:'post query',message:false,isAuthenticated:req.session.loggedIn})
}

const postpost=(req,res,next)=>{
    subject=req.body.subject.trim();
    opener=req.session.accountName;
    text=req.body.text.trim();
    console.log(4,subject,opener,text,20);
    if (subject==''){
        res.render('post/getpost',{opener:req.session.user,tit:'subject',message:'Enter the subject name',isAuthenticated:req.session.loggedIn})
    }
    else  if (text==''){
        res.render('post/getpost',{opener:req.session.user,tit:'text area',message:'Fill your problem statement/query',isAuthenticated:req.session.loggedIn})
    }
    else{
        obj={
            subject : subject,
            text : text,
            opener : opener,
            reply : []
        }
        // reply:[{user:String,comment:String,time:String,date:String,upvote:Number,
        //     array:[{user1:String,comment1:String,time1:String,date1:String}]
        // }]
        obj1=new query(obj);
        obj1.save()
        .then(q=>{
            res.redirect('/')
        })
        .catch(err=>{console.log(53,err,67);});
    }
}

const getanswer=(req,res,next)=>{
    res.render('post/getanswer',{tit:'answer',message:false,isAuthenticated:req.session.loggedIn})
}


const postanswer=(req,res,next)=>{
    subject=req.body.subject.trim()
    name=req.session.user
    console.log(4,subject,name,20);
    if (subject==''){
        res.render('post/getanswer',{tit:'subject again',message:'Subject name cannot be empty',isAuthenticated:req.session.loggedIn})
    }
    else{
        query.find({subject:subject})
        .then(q=>{
            console.log(465,q.length,89)
            res.render('post/query_answer',{tit:'answering',q:q,isAuthenticated:req.session.loggedIn})

            // if(q.length>0){
            //     res.render('post/query_answer',{tit:'answering',isAuthenticated:req.session.loggedIn})
            // }
            // else{
            //     res.render('post/query_answer',{})
            // }
        })
        .catch(err=>{console.log(1,err,07);});
    }
}



module.exports={
    getpost:getpost,
    postpost:postpost,
    getanswer:getanswer,
    postanswer:postanswer
}