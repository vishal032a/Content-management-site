import React from 'react';
import {Link, Route, Routes, useNavigate} from 'react-router-dom'
import Signup from './Signup';
import PrivateComponent from './PrivateComponent';
import Login from './Login';
import AddProduct from './AddContent';
import ContentList from './Content_list';
const Nav = ()=>{
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout = ()=>{
        localStorage.clear();
        navigate('/login');
    }
    return(
        <>
            <div className='navbar'>
                {auth?
                    <ul>
                        <li><Link to="/">Contents</Link></li>
                        <li><Link to="/add">Add Content</Link></li>
                        <li><Link to="/update">Update Content</Link></li>
                        <li><Link to="/profile">Profile</Link></li>
                        <li><Link onClick={logout} to="/login">Logout({JSON.parse(auth).name})</Link></li>
                    </ul>
                    :
                    <ul className='nav_right'>
                        <li><Link to="/login">login</Link></li>
                        <li><Link to="/signup">Signup</Link></li>
                    </ul>
                }
            </div>   
            <Routes>

                <Route element= {<PrivateComponent/>}>

                <Route path='/' element={<ContentList/>}/>
                <Route path='/add' element={<AddProduct/>}/>
                <Route path='/update' element={<h1>update product here </h1>}/>
                <Route path='/profile' element={<h1>here is your profile section</h1>}/>
                <Route path='/logout' element={<h1>logout from here </h1>}/>

                </Route>

                <Route path='/signup' element={<Signup/>}/>
                <Route path='/login' element={<Login/>}/>
            </Routes>
        </>
    )
}
export default Nav;