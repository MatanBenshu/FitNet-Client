import React, { useEffect, useState } from 'react';
import './About.css';
import axios from 'axios';
import NavBar from '../../components/navBar/navBar';

const About = () => {
    const [message, setMessage] = useState('');
    const [content, setContent] = useState('');
    const [creators, setCreators] = useState([]);

    useEffect(() => {
        setMessage('Loading...');
        const fetchContent = async () => {
            try {
                const response = await axios.get('contents/about');
                console.log(response);
                const data = response.data;
                if (data.success) {
                    setContent(data.user.content);
                    setCreators(data.user.creators);
                    setMessage(''); 
    
                } else {
                    setMessage('Error fetching user data: ' + data.message);
                }
            } catch (error) {
                setMessage('Error fetching user data: ' + error.message);
            }
        };
        fetchContent();
    }, []); 



    return (
        <>
            <NavBar />
            <div className="about">
                <h2> {message} </h2>
                {message === '' && ( 
                    < > 
                        <h2>About FitNet</h2>
                        <p>{content}</p>
                        <h3>Creators</h3>
                        <ul>
                            {creators.map((creator) => <li key={creator.id}>{creator}</li> )}
                        </ul>
                    </> )}
            </div>
        </>
    );
};

export default About;
