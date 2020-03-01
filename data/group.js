const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const groupSchema=new Schema({
    grp:{
        groupName:String,
        members:[{accountName:String}],
        admins:[{accountName:String}],
        message:[{accountName:String,str:String}]
    }
});

const group=mongoose.model('Group',groupSchema); 
module.exports=group;
