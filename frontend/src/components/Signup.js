import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
const Signup = ()=>{
    const [name,setname] = useState("");
    const [email,setemail] = useState("");
    const [password,setpassword] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
            navigate('/');
        }
    })

    const collectData = async ()=>{
        
        console.log(name,email,password);
        let result = await fetch("http://localhost:5000/register",{
            method:'post',
            body:JSON.stringify({name,email,password}),
            headers:{
                'Content-Type':'Application/JSON'
            },
        })
        result = await result.json();
        console.log(result);
        localStorage.setItem('user',JSON.stringify(result));
        navigate('/');
    }
    return(
        <div className="register">
            <h1>Register</h1>
            <input className="inputbox" type="text" placeholder="Enter name"  value={name} onChange={(e)=>setname(e.target.value)}/>

            <input className="inputbox" type="email" placeholder="Enter email" value={email} onChange={(e)=>setemail(e.target.value)}/>

            <input className="inputbox" type="password" placeholder="Enter password" value={password} onChange={(e)=>setpassword(e.target.value)}/>

            <button className="reg_button" onClick={collectData} type="button">Sign Up</button>
        </div>
    )
}

export default Signup;