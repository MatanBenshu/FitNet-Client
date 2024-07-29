import React, { useContext } from 'react';
import { Link,Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.js';
import './navBar.css';

function NavBar() {
    const { authState, logout } = useContext(AuthContext);

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
                {authState.isAuthenticated && (
                    <ul>
                        {/*
                        <li className='centerLink'>
                            <Link to="/">Home</Link>
                        </li>
                        */}
                        <li className='centerLink'>
                            <Link to={`/profile/${authState.user.username}`}>Profile</Link>
                        </li>
                        <li className='centerLink'>
                            <Link to="/search">Search</Link>
                        </li>
                        <li className='centerLink'>
                            <Link to="/about">About</Link>
                        </li>
                        <li className='leftLink'>{authState.user.username}</li>
                        <li className='leftLink'>
                            <button onClick={logout}>Logout</button>
                        </li>
                    </ul>
                )}
            </nav>
            <Outlet/>
        </>
    );
}

export default NavBar;
