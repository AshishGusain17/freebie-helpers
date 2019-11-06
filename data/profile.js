const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const profileSchema=new Schema({
    name:{
        type:String,               
        required:true
    },
    mobileNumber:{
        type:Number,
        required:true  
    },
    address:{
        type:String,               
        required:true
    },
    gender:{
        type:String,               
        required:true
    },
    userId:{
        id:{
            type:Schema.Types.ObjectId,
            ref:'User',
            required:true
        },
        email:{
            type:String,
            required:true
        }
    }
});
const profile=mongoose.model('Profile',profileSchema); 
module.exports=profile;
