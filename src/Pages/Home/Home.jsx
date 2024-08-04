import React from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';
import NavBar from '../../components/navBar/navBar';

import './Home.css'; 



function Home() {
    return (
        <>
            <NavBar />
            <div className="homeContainer">
                <Sidebar/>
                <Feed/>
                <Rightbar/>
            </div>
        </>
    );
}
export default Home;
