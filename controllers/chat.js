const user=require('../data/user');

const getFind=(req,res,next)=>{
    res.render('chat/find',{tit:'just the start',message:'',isAuthenticated:req.session.loggedIn});
}

const display=(req,res,next)=>{
    console.log(6,req.body,1);
    if(req.body.accountName){
        accountName=req.body.accountName.trim();
    }
    else{
        accountName=req.session.friend;
    }
    console.log(23,req.body,accountName,65)
    if (accountName==''){
        // req.session.friend='';
        console.log(92,req.body,"if part",94);
        res.render('chat/find',{tit:'try again',message:'Username cannot be empty',isAuthenticated:req.session.loggedIn});

    }
    else{
        console.log(7,req.body,"else part",1);
        req.session.friend=accountName;

        friend=accountName;
    
        me=req.session.accountName;
        console.log(56,me,friend,89);
        // if (friend==''){
        //     res.render('chat/find',{tit:'try again',message:'Hey,write the user name',isAuthenticated:req.session.loggedIn});
        // }
        let dict = {};
        user.findOne({accountName:friend})
        .then(user1=>{
            // console.log(15,friend,me,59);
            if(user1){
                if (user1.accountName==me){
                    res.redirect('/');
                }
                // console.log(34,user1.accountName,me,49);
                const var1=user1.message;
                let var2=var1.contacts;
                let len=var2.length;
                for (i=0;i<len;i++){
                    if (var2[i].accountName == me){
                        leng=var2[i].mes.length;
                        for (j=0;j<leng;j++){
                            ind=var2[i].mes[j].rank;
                            if(var2[i].mes[j].str !=''){
                                dict[ind]=[var2[i].mes[j].str ,var2[i].mes[j].time,var2[i].mes[j].date,0];
                            }
                        }
                        break;
                    }
                }
                user.findOne({accountName:me})
                .then(user2=>{
                    // console.log(1,user2.accountName,54);
                    const var3=user2.message;
                    let var4=var3.contacts;
                    len=var4.length;
                    let atob=[];
                    for (i=0;i<len;i++){
                        if (var4[i].accountName == friend){
                            leng=var4[i].mes.length;
                            const a=var4[i].a;
                            const b=var4[i].b;
                            for (k=a;k<=b;k++){
                                atob.push(k);
                            }
                            // console.log(94,atob,19);
                            for (j=0;j<leng;j++){
                                ind=var4[i].mes[j].rank;
                                if(var4[i].mes[j].str !=''){
                                    dict[ind]=[var4[i].mes[j].str, var4[i].mes[j].time,var4[i].mes[j].date , 1];
                                }
                                // console.log(dict);
                            }
                            break;
                        }
                    }
                    console.log(dict,atob,friend);

                    res.render('chat/postfind',{tit:'chats',dictionary:dict,atob:atob,name:friend,isAuthenticated:req.session.loggedIn});
    
                })
                .catch(err=>{console.log(72,err,11);});
            }
            else{
                console.log(15,friend,me,59);
                res.render('chat/find',{tit:'find',message:friend+' username does not exists',isAuthenticated:req.session.loggedIn});
            }
        })
        .catch(err=>{console.log(89,err,21);});
    }
}
 


const send=(req,res,next)=>{
    console.log(23,req.body,req.params,76);
    friend=req.body.accountName;
    me=req.session.accountName;
    chat=req.body.msg.trim();
    let dict={};
    // let atob=[];
    tt=Date().split(" ");
    // console.log(tt);
    const time1=tt[4].split(':');
    // console.log(time1)
    time1.pop()
    const time=time1.join(':')
    const date=tt[1] + '/' + tt[2] + '/' + tt[3];
    // console.log(1,time,date,9);
    user.findOne({accountName:me})
    .then(user1=>{
        const var1=user1.message;
        let var2=var1.contacts;
        len=var2.length;
        let flag=0;
        for (i=0;i<len;i++){
            if (var2[i].accountName == friend){
                if(chat!=''){
                    var2[i].b+=1;
                    var2[i].mes=[...var2[i].mes,{rank:var2[i].b,str:chat,time:time,date:date}];
                    // flag=1;
                    leng=var2[i].mes.length;
                    for (j=0;j<leng;j++){
                        ind=var2[i].mes[j].rank;
                        dict[ind]=[var2[i].mes[j].str , 1];
                    }
                }
                flag=1;
                break;
            }
        }
        if (flag==0 && chat!=''){
            var2=[...var2,{accountName:friend,a:1,b:1,mes:[{
                                                        rank:1,str:chat ,time:time,date:date}]
                        }];
            // atob.push(1);
            dict[1]=[chat,1];
        }
        const message={contacts:var2}
        user1.message=message;
        user2=new user(user1);
        user2.save()
            .then(a=>{
                console.log(65,'first friend change done',94);
                user.findOne({accountName:friend})
                .then(user3=>{
                    const var3=user3.message;
                    let var4=var3.contacts;
                    len=var4.length;
                    flag=0;
                    
                    for (i=0;i<len;i++){
                        if (var4[i].accountName == me){
                            if(chat!=''){
                                var4[i].b+=1;} 
                            var4[i].mes=[...var4[i].mes];
                            flag=1;
                            leng=var4[i].mes.length;
                            // const a=var4[i].a;
                            // const b=var4[i].b;
                            // for (k=a;k<=b;k++){
                            //     atob.push(k);
                            // }
                            // console.log(94,atob,19);
                            for (j=0;j<leng;j++){
                                ind=var4[i].mes[j].rank;
                                dict[ind]=[var4[i].mes[j].str , 0];
                                // console.log(dict);
                            }
                            break;
                        }
                    }
                    if (flag==0){
                        var4=[...var4,{accountName:me,a:1,b:1,mes:[]
                                    }];

                    }
                    const message={contacts:var4}
                    user3.message=message;
                    user4=new user(user3);
                    user4.save()
                        .then(b=>{
                            console.log(45,'second friend change done',23);
                            console.log(56,dict,friend,87);
                            res.redirect('/postreget');

                        })
                        .catch(err=>{console.log(98,err,73);});
                })
                .catch(err=>{console.log(83,err,17);});
            })
            .catch(err=>{console.log(27,err,93);});
    })
    .catch(err=>{console.log(73,err,43);});
}



module.exports={
    getFind:getFind,
    send:send,
    display:display
} 