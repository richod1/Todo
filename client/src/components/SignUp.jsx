import {useState} from "react";
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios'

const SignUp = () => {
const [data,setData]=useState({
    fname:"",lname:"",email:"",password:"",
})
const [error,setError]=useState("")
const navigate=useNavigate()

const handleChange=({currentTarget:input})=>{
    setData({...data,[input.name]:input.value})
}


const handleSubmit= async (e)=>{
    e.preventDefault();
    try{
        const url="http://loacalhost:3000/api/useers";
        const {data:res}=await axios.post(url,data)
        navigate('/login')
        console.log(res.message)

    }catch(err){
        if(
            err.response && 
            err.response.status >= 400 && err.response.status <=500
        ){
            setError(err.response.data.message)
        }
        console.log()
    }
}
  return( 
  <div className="">
    <div>
        <h1>Welcome Back !</h1>
        <Link to="/login">
        <p>Already have an account? <button 
        type="button">Sign In</button></p>
        </Link>
    </div>
    <div>
        <form onSubmit={handleSubmit}>
            <h2>Create Account</h2>
        <label htmlFor="fname">First Name</label>
            <input type="text"
            placeholder="first name"
             value={data.fname}
             required onChange={handleChange}
              name="fname"/>
        
        <label htmlFor="lname">Last Name</label>
            <input type="text" name="lname"
            placeholder="last name"
            value={data.lname}
            onChange={handleChange}
            />

        <label htmlFor="email">Email</label>
        <input type="email"
         placeholder="email"
         name="email"
         value={data.email} 
        onChange={handleChange}
        />

        <label htmlFor="password">Password</label>
        <input type="text" 
        placeholder="password"
         name="password" 
         value={data.password} 
        onChange={handleChange}
        />
    {error && <div>{error}</div>}
        <button type="submit">SignUp</button>
        </form>
    </div>

  </div>
  );
};

export default SignUp;
