// fronbtednd ko vackend se connect karne ke liye ek package voh hot hai axious
import axios from "axios";

const api=axios.create({
    baseURL:"http://localhost:3000",
    withCredentials:true
})
export async function register({username,email,password}){
    const response= await api.post('/api/auth/register',{
        username,email,password
    })
    return response.data
    
    // ye withcrediantals isliye kyunki axios
    // cookie nahi bhejta hai waapas jaise normalaly jab hota hai
    // voh token bhejta hai but axios mai aise nahi hita

}

export async function login({email,password}){
    try{
        const response=await api.post("/api/auth/login",{
            email,password
        })
        return response.data
    }catch(err){
        console.log(err)
    }
}

export async function logout(){
    try{
        const response=await api.get("/api/auth/logout",)
        return response.data
    }catch(err){
        console.log(err)
    }
}

export async function getMe(){
    try{
        const response= await api.get("/api/auth/get-me",)
        return response.data
    }catch(err){
        console.log(err)
    }
}
