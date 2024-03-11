import React,{useContext} from 'react'
import {Link} from 'react-router-dom'
import {loginContext} from '../contexts/LoginContext';

function Navbar() {
    let [currentUser,error,userLoginStatus,loginUser,logoutUser] = useContext(loginContext)
  return (
    <nav className='navbar navbar-expand-sm navbar-dark bg-dark'>
        <div className='container-fluid'>
        <ul className='nav'>
            <li className='nav-item'>
                <Link className='nav-link' to='/'>Home</Link>
            </li>
            <li className='nav-item'>
                <Link className='nav-link' to='/signup'>Register</Link>
            </li>
            {!userLoginStatus?
                <li className='nav-item'>
                    <Link className='nav-link' to='/signin'>Login</Link>
                </li>
            :
                <li className='nav-item'>
                    <Link className='nav-link' to='/signin' onClick={logoutUser}>Logout</Link>
                </li>
            }
            <li className='nav-item'>
                <Link className='nav-link' to='/aboutus'>Aboutus</Link>
            </li>
        </ul>
        </div>
    </nav>
  )
}

export default Navbar