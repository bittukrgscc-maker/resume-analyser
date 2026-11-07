import React ,{useState}from 'react'
import { useNavigate ,Link} from 'react-router'
import "../auth.form.scss"
import { useAuth } from '../hooks/useAuth'
const login = () => {
    const {loading, handleLogin}=useAuth()
    const navigate=useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const handleSubmit=async(e)=>{
        e.preventDefault()
        await handleLogin({email,password})
        navigate('/')
    }
    if(loading){
        return (<main><h1>Loading...</h1></main>)
    }
  return (
    <main>
        <div className="form-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                
               <div className="input-group">
                <label htmlFor="email">Email</label>
                <input
                 type="email" id="email" name="email" placeholder="Enter Email address"
                onChange={(e)=> {setEmail(e.target.value) }}
                />
                </div> 
                <div className="input-group">
                <label htmlFor="password">password</label>
                <input type="password" id="password"  name ="password" placeholder="password" value={password}
                onChange={(e)=>{ setPassword(e.target.value)}}
                ></input>
                </div> 
                <button type="submit" className="button primary-button">Login</button>
            </form>
             <p> Don't have an account?<Link to={"/Register"}>Register</Link></p>
        </div>
    </main>
  )
}

export default login