import React, { useState, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.js';
import NavBar from '../../components/navBar/navBar';
import axios from 'axios';
import './Login.css';


function Login() {
    const email = useRef();
    const password = useRef();
    const [message, setMessage] = useState('');
    const { isFetching,dispatch} = useContext(AuthContext);


    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            dispatch({ type: 'LOGIN_START' });
            const response = await axios.post('/auth/login',{ email: email.current.value, password: password.current.value });
            dispatch({ type: 'LOGIN_SUCCESS', payload:response.data });
        } catch (error) {
            dispatch({ type: 'LOGIN_FAILURE' ,payload:error });
            setMessage('Login failed:' + error.response.data);
        }
    };

    return (
        <>
            <NavBar />
            <div className="login">
                <h2>Welcome to FitNet</h2>
                <form onSubmit={handleLogin}>
                    <label>Email:</label>
                    <input
                        placeholder='Enter your email'
                        type="email"
                        required
                        ref={email}
                    />
                    <label>Password:</label>
                    <input
                        placeholder='Enter your password'
                        type="password"
                        required
                        minLength="8"
                        ref={password}  
                    />
                    <button type="submit">
                        {isFetching ? 'Loading...'  : 'Login'}
                    </button>
                </form>
                {message && <p>{message}</p>}
                <p>
        Don't have an account? <Link to="/register">Register here</Link>
                </p>
            </div>
        </>
    );
}

export default Login;