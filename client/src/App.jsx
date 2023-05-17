import './App.css'
import Login from './components/Login'
import TodoInput from './components/TodoInput'
import SignUp from './components/SignUp'
import {useState} from 'react'

function App() {
  const [user,setUser]=useState(null)

  return (
    <div className="App">
      {user? <TodoInput/>:<Login/>&&<SignUp/>}

    </div>
  )
}

export default App
