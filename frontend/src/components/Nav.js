import React from 'react';
import {Link, Route, Routes} from 'react-router-dom'
import Signup from './Signup';
const Nav = ()=>{
    return(
        <div className='navbar'>
            <ul>
                <li><Link to="/">Contents</Link></li>
                <li><Link to="/add">Add Content</Link></li>
                <li><Link to="/update">Update Content</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/logout">Logout</Link></li>
                <li><Link to="/signup">Signup</Link></li>

            </ul>
            <Routes>
                <Route path='/' element={<h1>here is your content</h1>}/>
                <Route path='/add' element={<h1>add product here </h1>}/>
                <Route path='/update' element={<h1>update product here </h1>}/>
                <Route path='/profile' element={<h1>here is your profile section</h1>}/>
                <Route path='/logout' element={<h1>logout from here </h1>}/>
                <Route path='/signup' element={<Signup/>}/>
            </Routes>
        </div>
    )
}
export default Nav;