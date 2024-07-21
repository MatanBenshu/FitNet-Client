import React, { useContext } from 'react';
import Register from './components/Pages/Register/Register.jsx';
import Home from './components/Pages/Home/Home.jsx';
import Login from './components/Pages/Login/login.jsx';
import About from './components/Pages/About/About.jsx';
import Navbar from './components/Pages/navBar/navBar.jsx';
import './App.css';
import { AuthContext } from './components/context/AuthContext.js';
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';

function  App() {
    const { authState, loading } = useContext(AuthContext);
    console.log(authState.isAuthenticated);
    if(loading)
    {
        return <div>loading...</div>;
    }
        
    return (
        <div className="App">
            <Navbar />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/"
                    element={
                        authState.isAuthenticated ? <Home /> : <Navigate to="/login" />
                    }
                />
                <Route
                    path="/about"
                    element={
                        authState.isAuthenticated ? <About /> : <Navigate to="/login" />
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
