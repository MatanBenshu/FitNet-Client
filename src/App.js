import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthContext } from './components/context/AuthContext.js';
import Register from './components/Pages/Register/Register.jsx';
import Home from './components/Pages/Home/Home.jsx';
import Login from './components/Pages/Login/login.jsx';
import About from './components/Pages/About/About.jsx';
import Navbar from './components/Pages/navBar/navBar.jsx';
import Profile from './components/Pages/Profile/Profile.jsx';
import Search from './components/Pages/Search/Search.jsx';
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
            <Routes>
                <Route path="/" element={<Navbar />} >
                    <Route
                        index
                        element={
                            authState.isAuthenticated ? <Home /> : <Navigate to="login" />
                        }
                    />                
                    <Route path="login" 
                        element={
                            authState.isAuthenticated ? <Navigate to="/" /> : <Login />
                        } 
                    />
                    <Route path="register"
                        element={
                            authState.isAuthenticated ? <Navigate to="/" /> : <Register />
                        } 
                    />
                    <Route
                        path="about"
                        element={
                            authState.isAuthenticated ? <About /> : <Navigate to="login" />
                        }
                    />
                    <Route
                        path="profile"
                        element={
                            authState.isAuthenticated ? <Profile /> : <Navigate to="login" />
                        }
                    />                                        
                    <Route
                        path="search"
                        element={
                            authState.isAuthenticated ? <Search /> : <Navigate to="login" />
                        }
                    />
                    <Route
                        path="*"
                        element={
                            authState.isAuthenticated ? <Navigate to="/" /> : <Navigate to="login" />
                        }
                    />                                    
                </Route>
            </Routes>
        </div>
    );
}

export default App;
