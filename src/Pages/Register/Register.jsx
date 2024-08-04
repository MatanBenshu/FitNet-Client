import React, { useContext, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.js';
import NavBar from '../../components/navBar/navBar';
import axios from 'axios';
import './Register.css';

function Register() {
    const username = useRef();
    const email= useRef();
    const password= useRef();
    const firstName= useRef();
    const lastName= useRef();
    const birthDate= useRef();
    const gender= useRef();
    const address= useRef();
    const [message, setMessage] = useState('');
    const { isFetching,dispatch} = useContext(AuthContext);

    const handleRegister = async (e) => {
        e.preventDefault();
        setMessage('');

        const uppercase = /[A-Z]/;
        const specialChar = /[!@#$%^&*(),.?":{}|<>]/;
        
        console.log(password.current.value);

        if (!uppercase.test(password.current.value)) {
            setMessage('Password must contain at least one uppercase letter.');
        }
        else if (!specialChar.test(password.current.value)) {
            setMessage('Password must contain at least one special character.');
        }
        else {
            try {
                dispatch({ type: 'LOGIN_START' });
            
                const response = await axios.post('/auth/register', {
                    username: username.current.value,
                    email: email.current.value,
                    password: password.current.value,
                    firstName: firstName.current.value,
                    lastName: lastName.current.value,
                    birthDate: birthDate.current.value,
                    gender: gender.current.value,
                    address: address.current.value,   
                });

                dispatch({ type: 'LOGIN_SUCCESS', payload:response.data });

            } catch (error) {
                dispatch({ type: 'LOGIN_FAILURE' ,payload:error });
                setMessage('Register failed:' + error.response.data);
            }
        }
    };

    return (
        <>
            <NavBar />
            <div className="register">
                <h2>Register</h2>
                <form  onSubmit={handleRegister} >
                    <label>Username:</label>
                    <input
                        placeholder='Enter your username'
                        type="text"
                        required
                        ref={username}
                    />
                    <label>Email:</label>
                    <input
                        placeholder='Enter your email address'
                        type="email"
                        required
                        ref={email}
                    />
                    <label>Password:</label>
                    <input
                        placeholder='Enter your password'
                        type="password"
                        required
                        minLength = '8'
                        ref={password}
                    />
                    <label>First Name:</label>
                    <input
                        placeholder='Enter your first name'
                        type="text"
                        required
                        ref={firstName}
                    />
                    <label>Last Name:</label>
                    <input
                        placeholder='Enter your last name'
                        type="text"
                        required
                        ref={lastName}
                    />
                    <label>Birth Date:</label>
                    <input
                        type="date"
                        required
                        ref={birthDate}
                    />
                    <label>Gender:</label>
                    <select ref={gender} >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                    <label>Address:</label>
                    <input
                        placeholder='Enter your address'
                        type="text"
                        ref={address}
                    />
                    <button type="submit">
                        {isFetching ? 'Loading...'  : 'Register'}
                    </button>
                </form>
                {message && <p>{message}</p>}
                <p>
        Already have an account? <Link to="/login">Login here</Link>
                </p>
            </div>
        </>
    );
}

export default Register;
