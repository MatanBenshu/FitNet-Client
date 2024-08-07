import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext.js';
import Register from './Pages/Register/Register.jsx';
import Home from './Pages/Home/Home.jsx';
import Login from './Pages/Login/login.jsx';
import About from './Pages/About/About.jsx';
import Page404 from './Pages/Page404/Page404.jsx';
import Profile from './Pages/Profile/Profile.jsx';
import Search from './Pages/Search/Search.jsx';
import Events from './Pages/Event/Event.jsx';

function  App() {
    const { user } = useContext(AuthContext);
        
    return (
        <div className="App">
            <Routes>
                <Route path="/" >
                    <Route
                        index
                        element={
                            user ? <Home /> : <Navigate to="login" />
                        }
                    />                
                    <Route path="login" 
                        element={
                            user ? <Navigate to="/" /> : <Login />
                        } 
                    />
                    <Route path="register"
                        element={
                            user ? <Navigate to="/" /> : <Register />
                        } 
                    />
                    <Route
                        path="about"
                        element={
                            user ? <About /> : <Navigate to="login" />
                        }
                    />
                    <Route
                        path="profile/:username"
                        element={
                            user ? <Profile /> : <Navigate to="login" />
                        }
                    />                                        
                    <Route
                        path="search"
                        element={
                            user ? <Search /> : <Navigate to="login" />
                        }
                    />
                    <Route
                        path="Events" 
                        element={
                            user ? <Events /> : <Navigate to="login" />
                        }
                    />
                    <Route
                        path="page404"
                        element={<Page404 /> }
                    />
                    <Route
                        path="*"
                        element={
                            user ? <Navigate to="/" /> : <Navigate to="login" />
                        }
                    />                                    
                </Route>
            </Routes>
        </div>
    );
}

export default App;
