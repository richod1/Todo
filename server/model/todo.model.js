const mongoose=require('mongoose')

const TodoSchema=mongoose.Schema({
    text:{
        type:String,
        required:true,
    },
    completed:{Boolean}
})

const Todo=mongoose.model('Todo',TodoSchema)

module.exports={Todo};