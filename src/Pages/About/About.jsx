import React, { useEffect, useState } from 'react';
import './About.css';
import axios from 'axios';

const About = () => {
    const [message, setMessage] = useState('');
    const [content, setContent] = useState('');
    const [creators, setCreators] = useState([]);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const response = await axios.get('contents/about');
                console.log(response);
                const data = response.data;
                if (data.success) {
                    setContent(data.user.content);
                    setCreators(data.user.creators); 
                    
    
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
        <div className="about">
            {message !== '' && <h2> {message} </h2>}
            <h2>About FitNet</h2>
            <p>{message === '' ? content : message}</p>
            <h3>Creators</h3>
            <ul>
                {creators.map((creator) => <li key={creators.indexOf(creator)}>{creator}</li> )}
            </ul>
        </div>
    );
};

export default About;
