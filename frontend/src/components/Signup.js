import React,{useState} from "react";
const Signup = ()=>{
    const [name,setname] = useState("");
    const [email,setemail] = useState("");
    const [password,setpassword] = useState("");

    const collectData = ()=>{
        console.log(name,email,password);
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