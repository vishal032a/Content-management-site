import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Login = ()=>{
    const [email,setemail] = useState("");
    const [password,setpassword] = useState("");
    const navigate = useNavigate();
    const handle_login = async ()=>{
        let result = await fetch('http://localhost:5000/login',{
            method:'post',
            body:JSON.stringify({email,password}),
            headers:{
                'Content-Type':'Application/JSON'
            }
        })
        result = await result.json();
        console.log(result);
        if(result.name){
            localStorage.setItem("user",JSON.stringify(result));
            navigate('/');
        }else{
            alert("please enter correct name")
        }
    }
    return(
        <div className='login'>
            <h1>Login page</h1>
            <input 
            className='inputbox' 
            type='text' 
            placeholder='Enter email'
            onChange={(e)=>setemail(e.target.value)}
            value={email}
            />

            <input 
            className='inputbox' 
            type='password' 
            placeholder='Enter password'
            onChange={(e)=>setpassword(e.target.value)}
            value={password}
            />

            <button className='reg_button' onClick={handle_login}>Login</button>
        </div>
    )
}

export default Login;