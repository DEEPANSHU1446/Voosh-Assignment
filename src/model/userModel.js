const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    name : {
        type:String, 
        required:true,
        trim:true
    },
    phone : {
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password : {
        type:String,
        required:true
    },
    
},)

module.exports = mongoose.model("user", userSchema)