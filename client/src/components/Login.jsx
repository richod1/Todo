import {useState} from "react";
import {Link} from 'react-router-dom'
import axios from 'axios'

const Login = () => {
    const [data,setDate]=useState({email:"",password:""})
    const [error,setError]=useState("")

    const handleChange=({currentTarget:input})=>{
        setDate({...data,[input.name]:input.value})
    }

    // or 
    // // const handleChnage=(e)=>{
    //     setData(e.target.data)
    // }

    const handleSubmit= async (e)=>{
        e.preventDefault()
        try{
            const url="http://localhost:3000/api/auth";
            const {data:res}=await axios.post(url,data)
            localStorage.setItem("token",res.data);
            window.location="/";

        }catch(error){
            if(error.response && error.response.status >=400 && error.response.status<=500){
                setError(error.response.data.message)
            }
        }
    }
  return( 
  <div>
    <div>
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Login To Your Account</h2>
                <label htmlFor="email">Email</label>
                    <input type="email" 
                    name="email"
                    placeholder="email" 
                    value={data.email}
                    required
                    onChange={handleChange}
                    />

                    <label htmlFor="password">Password</label>
                    <input type="password"
                     placeholder="password"
                     name="password" 
                     required
                     onChange={handleChange}
                     value={data.password}
                     />
                     {error &&<div>{error}</div>}
                     <button type="submit">Sign In</button>
            </form>
            <div>
                <p>New here? <Link to="/signup">
                    <button type="button">sign up</button>
                    </Link></p>
            </div>
        </div>
    </div>
    
  
    </div>
  );
};

export default Login;
