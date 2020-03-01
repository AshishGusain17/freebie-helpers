const user=require('../data/user');
const group=require('../data/group');


const formgroup=(req,res,next)=>{
    res.render('group/formgroup',{tit:'form group',isAuthenticated:req.session.loggedIn});
}

const add=(req,res,next)=>{
    groupName=req.body.groupName;
    me=req.session.accountName;
    console.log(56,groupName,23);
    let list=[];
    user.findOne({accountName:me})
    .then(user=>{
        const var1=user.message;
        let var2=var1.contacts;
        let len=var2.length;
        for (i=0;i<len;i++){
            list.push(var2[i].accountName);
        }
        console.log(67,list,3);
        res.render('group/add',{tit:'adding member',groupName:groupName,list:list,isAuthenticated:req.session.loggedIn})
    })
    .catch(err=>{console.log(89,err,21);});
}

const create=(req,res,next)=>{
    me=req.session.accountName;
    groupName=req.body.groupName;
    members=req.body.members;
    console.log(78,req.body,39);
    let list=[];
    if (typeof members == 'string'){
        list.push({accountName:members});
    }
    else{
        len=members.length
        for (i=0;i<len;i++){
            list.push({accountName:members[i]})
        }
    }
    list.push({accountName:me});
    console.log(67,groupName,list,me,5);
    gr={
        groupName:groupName,
        members:[...list],
        admins:[{accountName:me}]
    }
    obj={
        grp:gr
    }
    obj=new group(obj);
    obj.save()
        .then(result=>{ 
            res.redirect('/');
        })
        .catch(err=>{console.log(23,err,7);});
}

const showgroup=(req,res,next)=>{
    me=req.session.accountName;
    user.findOne({accountName:me})
    .then(obj=>{ 
        console.log(45,obj,78);
        len=obj.grp.length;
        list=[];
        let ct=0;
        console.log(len)
        if (len==0){
            res.redirect('/');

        }
        for(i=0;i<len;i++){
            idnum=obj.grp[i].id;
            // console.log(idnum,obj.grp[i].id);
            group.findOne({_id:idnum})
            .then(gr=>{ 
                
                groupName=gr.grp.groupName;
                members=gr.grp.members;
                admins=gr.grp.admins;
                console.log(67,groupName,idnum,2);
                list.push([groupName,members,admins,gr._id]);
                ct=ct+1;
                console.log(ct,groupName,members,admins,gr._id)
                if (ct==len){
                    console.log(456,list,23);
                    res.render('group/show',{tit:'show groups',list:list,isAuthenticated:req.session.loggedIn});
                }

            })
            .catch(err=>{console.log(78,err,22);});
        }
    })
    .catch(err=>{console.log(23,err,7);});
}



const groupdisplay=(req,res,next)=>{
    me=req.session.accountName;
    console.log(32,req.params,req.query,7);
    if (req.params.param){
        idnum=req.params.param;
    }
    else{
        idnum=req.session.idnum;
    }
    console.log(45,idnum,78);
    group.findOne({_id:idnum})
    .then(grpN=>{ 
        let array = [];
        const var1=grpN.grp;
        let var2=var1.message;
        let len=var2.length;
        for (i=0;i<len;i++){
            if (var2[i].accountName == me){
                array.push([var2[i].accountName,var2[i].str,1])
            }
            else{
                array.push([var2[i].accountName,var2[i].str,0])
            }
        }    
        console.log(56,array,var1.groupName,idnum,23);
        res.render('group/groupdisplay',{tit:'group chat',array:array,groupName:var1.groupName,idnum:idnum,isAuthenticated:req.session.loggedIn});

    })
    .catch(err=>{console.log(91,err,12);});          
}






const groupsend=(req,res,next)=>{
    idnum=req.params.param;
    me=req.session.accountName;
    msg=req.body.msg;
    console.log(76,msg,idnum,21);
    group.findOne({_id:idnum})
    .then(obj=>{
        // console.log(87,obj,3)
        const var1=obj.grp;
        let var2=var1.message;
        len=var2.length;
        let flag=0;
        var2=[...var2,{accountName:me,str:msg}];
        obj.grp.message=var2;
        // console.log(89,obj,23);
        obj=new group (obj);
        obj.save()
        .then(asd=>{
            console.log(93,idnum,18);
            req.session.idnum=idnum;
            res.redirect('/grouppostreget');
        })
        .catch(err=>{console.log(73,err,43);});
    })
    .catch(err=>{console.log(73,err,43);});
}



module.exports={
    formgroup:formgroup,
    add:add,
    create,create,
    showgroup:showgroup,
    groupdisplay:groupdisplay,
    groupsend:groupsend
}