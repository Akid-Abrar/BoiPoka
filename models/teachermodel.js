const mongoose=require('mongoose');

const teacherSchema=mongoose.Schema({
    name:String,
    t_id:String,
    dept:String
})


module.exports = mongoose.model('teachers', teacherSchema);