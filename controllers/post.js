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
    // name=req.session.accountName
    console.log(4,subject,20);
    if (subject==''){
        res.render('post/getanswer',{tit:'subject again',message:'Subject name cannot be empty',isAuthenticated:req.session.loggedIn})
    }
    else{
        query.find({subject:subject})
        .then(q=>{
            console.log(465,q.length,89)
            res.render('post/query_answer',{tit:'answering',q:q,isAuthenticated:req.session.loggedIn})
        })
        .catch(err=>{console.log(1,err,07);});
    }
}


const divclick=(req,res,next)=>{
    idnum=req.params.idnum;
    req.session.query=idnum;
    console.log(14,req.params,20);
    query.findOne({_id:idnum})
    .then(q=>{
        reply=q.reply;
        console.log(4,q,reply,89);
        res.redirect('/newcomment_redirect');
        // res.render('post/complete_query',{tit:'all comments',q:q,reply:reply,isAuthenticated:req.session.loggedIn});
    })
    .catch(err=>{console.log(1,err,07);});
}


const newcomment=(req,res,next)=>{
    idnum=req.params.idnum;
    text=req.body.text.trim();
    console.log(2,idnum,text,6);
    tt=Date().split(" ");
    const time1=tt[4].split(':');
    time1.pop()
    const time=time1.join(':')
    const date=tt[1] + '/' + tt[2] + '/' + tt[3];
    query.findOne({_id:idnum})
    .then(q=>{
        reply=q.reply;
        // console.log(4,reply,89);
        if(text==''){newreply=[...reply];}
        else{
            newreply=[...reply,{user:req.session.accountName,comment:text,time:time,date:date,upvote:0,array:[]}];
        }
        q.reply=newreply;
        obj = new query(q);
        obj.save()
        .then(qwe=>{
            res.redirect('/newcomment_redirect');
        })
        .catch(err=>{console.log(65,err,43);});
    })
    .catch(err=>{console.log(6,err,2);});
}


const newcomment_redirect=(req,res,next)=>{
    idnum=req.session.query;
    console.log(98,idnum,38);
    query.findOne({_id:idnum})
    .then(q=>{
        reply=q.reply;
        // console.log(06,reply,11);
        res.render('post/complete_query',{tit:'all comments',q:q,reply:reply,isAuthenticated:req.session.loggedIn});
    })
    .catch(err=>{console.log(1,err,07);});
}


const userreply=(req,res,next)=>{
    idnum=req.params.idnum;
    replytouser=req.params.replytouser;
    text=req.body.text.trim();
    console.log(87,req.params,text,38);
    tt=Date().split(" ");
    const time1=tt[4].split(':');
    time1.pop()
    const time=time1.join(':')
    const date=tt[1] + '/' + tt[2] + '/' + tt[3];
    query.findOne({_id:req.session.query})
    .then(q=>{
        reply=q.reply;
        newreply=[];
        if (text==''){
            newreply=[...reply];
        }
        else{
            for (let ss=0;ss<reply.length;ss++){
                r1=reply[ss];
                if( r1._id.toString() == idnum.toString()){
                    r1.array.push({user1:req.session.accountName,comment1:'@'+replytouser+':'+text,time1:time,date1:date});
                }
                newreply.push(r1);
            }
        }
        q.reply=newreply;
        // console.log(5,q.reply,43);
        obj = new query(q);
        obj.save()
        .then(qwe=>{
            res.redirect('/newcomment_redirect');
        })
        .catch(err=>{console.log(3,err,98);});
    })
    .catch(err=>{console.log(97,err,2);});

}

module.exports={
    getpost:getpost,
    postpost:postpost,
    getanswer:getanswer,
    postanswer:postanswer,
    divclick:divclick,
    newcomment:newcomment,
    newcomment_redirect:newcomment_redirect,
    userreply:userreply
}