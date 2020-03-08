const user=require('../data/user');
const group=require('../data/query');


const refresh=(req,res,next)=>{
    me=req.session.accountName;
    console.log(56,me,23);
    let list=[];
    groupName=''
    group.find()
    .then(jhund=>{
        // console.log(56,jhund,89);
        user.findOne({accountName:me})
        .then(obj1=>{
            let len=Object.keys(jhund).length;
            for(i=0;i<len;i++){
                obj=jhund[i];
                groupName=obj.grp.groupName;
                ids=obj._id;
                members=obj.grp.members;
                admins=obj.grp.admins;
                sbkiid=obj1.grp;
                console.log(groupName,ids);;
                for(j=0;j<members.length;j++){
                    name=members[j].accountName;
                    if (name==me){
                        console.log(name,67,me);
                        obj1.grp=[...sbkiid];
                        let flag=0;
                        for (k=0;k<sbkiid.length;k++){
                            console.log(98,sbkiid[k].id,ids,54);
                            if (sbkiid[k].id.toString()===ids.toString()){
                                console.log('aaya')
                                flag=1;
                            }
                        }
                        if (flag==0){
                            obj1.grp.push({id:ids});
                            break;
                        }
                        break;
                    }

                }
            }
            console.log(46,obj1,78);
            obj=new user(obj1);
            obj.save()
            .then(result=>{
                res.render('group/add',{tit:'adding member',groupName:groupName,list:list,isAuthenticated:req.session.loggedIn})
            })
            .catch(err=>{console.log(54,err,89);});
        })
        .catch(err=>{console.log(45,err,1);});

        // const var1=user.message;
        // let var2=var1.contacts;
        // let len=var2.length;

    })
    .catch(err=>{console.log(89,err,21);});
}

module.exports={
    refresh:refresh
}