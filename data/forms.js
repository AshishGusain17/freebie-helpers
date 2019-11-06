const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const formsSchema=new Schema({
    name:{
        type:String,                     //type:String
        required:true  
    },
    as:{
        type:String,
        required:false
    },
    count:{
        type:Number,
        required:false
    }
});
const forms=mongoose.model('Form',formsSchema); 
module.exports=forms;
