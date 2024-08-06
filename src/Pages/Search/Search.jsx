import React, { useState } from 'react';
import './Search.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navBar/navBar'; 

function Search() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const navigate = useNavigate();

    const handleSearch = async (event) => {
        event.preventDefault();
        
        try {
            const response = await fetch(`/users/search?query=${query}`);
            const data = await response.json();
            setResults(data);
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
                        type="text"
                        placeholder="Enter username"
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