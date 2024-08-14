import React, { useContext } from 'react';
import { Link,Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/authContext/AuthContext.js';
import './navBar.css';

function NavBar() {
    const { user,dispatch } = useContext(AuthContext);

    const handleLogOut = () => {
        dispatch({ type: 'LOGOUT' });
    };

    return (
        <>
            <nav className="navbar">
                <h1 className="navbar-logo">
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <span className="logo-text">
                        FitNet
                        </span>
                    </Link>
                </h1>
                {user && (
                    <ul>
                        <li className='centerLink'>
                            <Link to={`/profile/${user.username}`}>Profile</Link>
                        </li>
                        <li className='centerLink'>
                            <Link to="/search">Search</Link>
                        </li>
                        <li className='centerLink'>
                            <Link to="/about">About</Link>
                        </li>
                        <li className='leftLink'>Log as {user.username}</li>
                        <li className='leftLink'>
                            <button onClick = {handleLogOut}>Logout</button>
                        </li>
                    </ul>
                )}
            </nav>
            <Outlet/>
        </>
    );
}

export default NavBar;
