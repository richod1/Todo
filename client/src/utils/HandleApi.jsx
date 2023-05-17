import axios from 'axios'

const baseUrl = "http://localhost:3001"

const getAllTodo = (setToDos) => {
    axios.get(baseUrl)
    .then(({data}) => {
        console.log(`data ---> ${data}`);
        setToDos(data)
    })
    .catch((error) => console.error(error))
}

//
const addTodo = (text, setText, setToDo) => {
     axios.post(`${baseUrl}/add`, {text})
     .then((data) => {
        console.log(data);
        setText('')
        getAllTodo(setToDo)
     })
     .catch((error) => console.error(error))
}

const updateTodo = (toDoId, text, setText, setToDo, setUpdating) => {
    axios.post(`${baseUrl}/update`, {_id: toDoId, text})
    .then((data) => {
       console.log(data);
       setText('')
       setUpdating(false)
       getAllTodo(setToDo)
    })
    .catch((error) => console.error(error))
}

const deleteTodo = (_id, setToDo) => {
    axios.post(`${baseUrl}/delete`, {_id})
    .then((data) => {
        console.log(data)
        getAllTodo(setToDo)
    })
    .catch((error) => console.error(error))
}




export {getAllTodo,addTodo,updateTodo,deleteTodo};