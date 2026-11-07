import { useContext,useEffect } from "react";
import { AuthContext } from "../auth.context";
import{login,register,logout,getMe} from "../services/auth.api"

export const useAuth=()=>{
    const context=useContext(AuthContext)
    const {user,setUser,loading,setLoading}=context


    // yaha par ye hook ka kaam hai ki jab tak useer login kar raha ho
    // aur api call ho rahi toh hum loading ko  set kar de true.
    // but agar user ko dekhna hai ki loading ho rahi hai ya nhai
    // toh voh ui dikhega//
    // toh uska code hum uui par karnge

    const handleLogin=async({ email,password})=>{
        setLoading(true)
        try{
            const data =await login({email, password})
        setUser(data.user)
        }catch(err){

        }finally{
            setLoading(false)
        }
    }
    const handleRegister=async({username,email,password})=>{
        setLoading(true)
        try{
        const data=await register({ username,email,password})
        if (!data?.user) return false
        setUser(data.user)
        return true
        }catch(err){
            console.error(err)
            return false
        } finally{
        setLoading(false)
        }
    }
    const handleLogout=async ()=>{
        setLoading(true)
        try{

        const data=await logout()
        setUser(null)
        }catch{

        }finally{
        setLoading(false)
        }
    }

    useEffect(()=>{
        const getAndSet=async()=>{
           try{
             const data=await getMe()
            setUser(data.user)
           }catch(err){} finally{
            setLoading(false)
        }
    }
        getAndSet()
    },[])

    return {user,loading,handleLogin,handleRegister,handleLogout}
}
