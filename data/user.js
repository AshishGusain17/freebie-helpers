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
    },
    token:String,
    timelimit:Date,
    message:{
        contacts:[{    accountName:String,
                            a:Number,
                            b:Number,
                            mes:[{rank:Number,
                                    str:String
                                }]
                }]
    }
    // accountNumber:{
    //     type:Number,required:true  },

    // cart:{
    //     items:[{
    //         productId:{
    //             type:Schema.Types.ObjectId,
    //             ref:'Product',
    //             required:true
    //         },
    //         qty:{ 
    //             type:Number,
    //             required:true
    //         }
    //     }]
    // },


//     details:[{
//         message:{
//             type:String,
//             required:true
//         },
//         check:{
//             type:Number,
//             required:true
//         },
//         account:{
//             type:Number
//         },
//         transfer:{
//             type:Number
//         },
//         amountLeft:{
//             type:Number,
//             required:true
//         },
//         deposit:{
//             type:Number
//         },
//         withdraw:{
//             type:Number
//         },
//         date:{
//             type:String,
//             required:true
//         }
// }]
});
const user=mongoose.model('User',userSchema); 
module.exports=user;
