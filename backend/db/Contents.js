const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
    name:String,
    email:String,
    blog_name:String,
    blog_description:{
        type:String,
        multiline:true
    },
    names_of_files:{
        type:Array,
        item:String
    }
})

module.exports = mongoose.model("contents",contentSchema);