const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const detailSchema=new Schema({
    details:[{
        message:{
            type:String,
            required:true
        },
        check:{
            type:Number, 
            required:true
        },
        account:{
            type:Number
        },
        transfer:{
            type:Number
        },
        deposit:{
            type:Number
        },
        withdraw:{
            type:Number
        }
    }]

});
const details=mongoose.model('Detail',detailSchema); 
module.exports=details;



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
// }



//{       user:'qwerty'  ,  email:'qwerty@1234'  ,  cart:{items:[]}    }