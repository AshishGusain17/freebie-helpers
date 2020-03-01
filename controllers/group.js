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
        // console.log(45,obj,78);
        len=obj.grp.length;
        list=[];
        let ct=0;
        console.log(len)
        for(i=0;i<len;i++){
            idnum=obj.grp[i].id;
            group.findOne({_id:idnum})
            .then(gr=>{ 
                console.log(gr)
                groupName=gr.grp.groupName;
                members=gr.grp.members;
                admins=gr.grp.admins;
                list.push([groupName,members,admins]);
                ct=ct+1;
                console.log(ct,groupName,members,admins)
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


module.exports={
    formgroup:formgroup,
    add:add,
    create,create,
    showgroup:showgroup
}