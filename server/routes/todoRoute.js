const express=require('express')
const router=express.Router()
const {getTodo,createTodo,updateTodo,deleteTodo}=require("../contreoller/todoController")


router.get('/',getTodo)

router.post('/add',createTodo)

router.post('/update',updateTodo)

router.post('/delete',deleteTodo)

module.exports=router;