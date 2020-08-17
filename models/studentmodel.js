const mongoose=require('mongoose');

const studentSchema = mongoose.Schema({
    name : String,
    id : Number,
    department : String,
    level : String,
    term : String,
    hall : String,
    dues : Number 
})

module.exports = mongoose.model('students', studentSchema);