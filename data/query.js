const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const querySchema=new Schema({
    subject:String,
    opener:String,
    text:String,
    reply:[{user:String,comment:String,time:String,date:String,upvote:Number,
            array:[{user1:String,comment1:String,time1:String,date1:String}]
        }]
    
});

const query=mongoose.model('Query',querySchema); 
module.exports=query;
