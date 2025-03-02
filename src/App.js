import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthContext } from './context/authContext/AuthContext.js';
import Register from './Pages/Register/Register.jsx';
import Home from './Pages/Home/Home.jsx';
import Login from './Pages/Login/login.jsx';
import About from './Pages/About/About.jsx';
import Page404 from './Pages/Page404/Page404.jsx';
import Profile from './Pages/Profile/Profile.jsx';
import Search from './Pages/Search/Search.jsx';
import Event from './Pages/Event/Event.jsx';
import Group  from './Pages/Group/Group.jsx';

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
                        path="event/:title"
                        element={
                            user ? <Event/> : <Navigate to="login" />
                        }
                    />
                    <Route
                        path="group/:groupname"
                        element={
                            user ? <Group/> : <Navigate to="login" />
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
