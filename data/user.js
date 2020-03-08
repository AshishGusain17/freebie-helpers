const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const userSchema=new Schema({
    password:{
        type:String,                     
        required:true  
    },
    accountName:{
        type:String,required:true
    },
    email:{
        type:String,
        required:true
    }
    // message:{
    //     contacts:[{    accountName:String,
    //                         a:Number,
    //                         b:Number,
    //                         mes:[{rank:Number,
    //                                 str:String,
    //                                 time:String,
    //                                 date:String
    //                             }]
    //             }]
    // },
    // grp:[{
    //     id:{
    //         type:Schema.Types.ObjectId,
    //         ref:'Group',
    //         required:true
    //     }}
    // ]

});
const user=mongoose.model('User',userSchema); 
module.exports=user;
