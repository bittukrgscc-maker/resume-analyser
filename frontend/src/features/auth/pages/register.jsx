import React,{useState} from 'react'
import { useNavigate ,Link} from 'react-router'
import "../auth.form.scss"
import { useAuth } from '../hooks/useAuth'
const Register = () => {
    const navigate=useNavigate()
    const [error, setError] = useState("")
    const [username, setUsername] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")

    const {loading,handleRegister}=useAuth()
     const handleSubmit=async (e)=>{
        e.preventDefault()
        setError("")
        const registered = await handleRegister({username,email,password})
        if (registered) navigate("/")
        else setError("Registration failed. Please try again.");
    }
    if(loading){
        return(<main><h1>Loading....</h1></main>)
    }
  return (
     <main>
        <div className="form-container">
            <h1>Register</h1>
            {error && <p role="alert">{error}</p>}
            <form onSubmit={handleSubmit}>
                 <div className="input-group">
                <label htmlFor="username">Username</label>
                <input
                onChange={(e)=>{setUsername(e.target.value)}}
                 type="text" id="username" name="username" placeholder="Enter Username"></input>
                </div> 

               <div className="input-group">
                <label htmlFor="email">Email</label>
                <input
                 onChange={(e)=>{setemail(e.target.value)}}
                type="email" id="email" name="email" placeholder="Enter Email address"></input>
                </div> 
                <div className="input-group">
                <label htmlFor="password">password</label>
                <input
                onChange={(e)=>{setpassword(e.target.value)}}
                type="password" id="password"  name ="password" placeholder="Enter password"></input>
                </div> 
                <button type="submit" className="button primary-button">Register</button>
            </form>
            <p> Already have an account?<Link to={"/Login"}>Login</Link></p>
        </div>
    </main>
  )
}

export default Register
