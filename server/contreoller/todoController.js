const TodoModel=require('../model/todo.model')

const getTodo= async (req,res)=>{
    const todo=await TodoModel.find({})
    res.json(todo)
    console.log(todo);

};

const createTodo= async(req,res)=>{
    const {text}=req.body;
    TodoModel.create({text}).then((data)=>{
        console.log(data)
        console.log("Data created Successfully")
        res.send(data);
    }).catch((err)=>console.log(err))
}


const updateTodo=async (req,res)=>{
    const {_id,text}=req.body;
    TodoModel.findByIdAndUpdate(_id,{text}).then(()=>{
        console.log("Todo updated Successfully")
    }).catch((err)=>console.log(err))
}

const deleteTodo=async (req,res)=>{
    const {_id}=req.body;
    TodoModel.findByIdAndDelete(_id).then(()=>{
        console,log("Todo deleted successfully");
        res.redirect('/')
    }).catch((err)=>console.log(err))
}


module.exports={
    getTodo,
    createTodo,updateTodo,deleteTodo
}