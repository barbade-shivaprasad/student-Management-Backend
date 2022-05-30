const {Schema , model} = require('mongoose')

const Student = new Schema({
    name:{type:String,required:true},
    id:{type:String,required:true},
    class:{type:String,required:true},
    phone:{type: Number,required:true},
    email:{type:String,required:true}
})

const studentModel = model('student',Student)


module.exports = studentModel;