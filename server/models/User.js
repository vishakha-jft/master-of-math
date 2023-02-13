const mongoose = require('mongoose');
// const {users} = require('../connections/connections');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    level1:{
        type:Number,
        default:0
    },
    level2:{
        type:Number,
        default:0
    },
    level3:{
        type:Number,
        default:0
    },
    level4:{
        type:Number,
        default:0
    },
    level5:{
        type:Number,
        default:0
    },
    level6:{
        type:Number,
        default:0
    },
    date:{
        type:Date,
        default:Date.now
    },
    resetToken:{
        type:String,
        default:""
    },
    resetTokenTime:{
        type:Number,
        default:0
    }
})

module.exports = User = mongoose.model("users",UserSchema);