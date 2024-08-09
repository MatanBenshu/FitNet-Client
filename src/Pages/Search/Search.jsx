import React, { useState } from 'react';
import './Search.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navBar/navBar'; 
import axios from '../../Api';

function Search() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const navigate = useNavigate();

    const handleSearch = async (event) => {
        event.preventDefault();
        
        try {
            const response = await axios.get(`/users/search?query=${query}`);
            setResults(response.data);
        } catch (error) {
            console.error('Error searching for users:', error);
        }
    };

    const goToProfile = (username) => {
        navigate(`/profile/${username}`);
    };

    return (
        <>
            <Navbar />
            <div className="search-page">
                <h1>Search Users</h1>
                <form onSubmit={handleSearch}>
                    <input
                        type="search"
                        placeholder="Enter username"
                        required
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button type="submit">Search</button>
                </form>
                <ul>
                    {results.map((user) => (
                        <li key={user.id} onClick={() => goToProfile(user.username)}>
                            {user.username}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default Search;