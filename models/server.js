const mongoose=require('mongoose');
const UserSchema=new mongoose.Schema({
    name:
    {   type:String,
        required: true
    },
    id:
    {   type:Number,
        required: true
    },
    Language:
    {   type:String,
        required: true
    },
    Framework:
    {   type:String,
        required: true
    }

});
const servers=mongoose.model('servers',UserSchema);
module.exports=servers;