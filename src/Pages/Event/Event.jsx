import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext.js';
import Navbar from '../../components/navBar/navBar';
import './Event.css'; 

const Events = () => {
    const [events, setEvents] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await axios.get('/events/all');
                console.log('Fetched events:', res.data); 
                setEvents(res.data);
            } catch (error) {
                console.error('Error fetching events', error);
            }
        };
        fetchEvents();
    }, []);

    const joinEvent = async (id) => {
        try {
            await axios.put(`/events/${id}/attend`, { userId: user._id });
            setEvents(events.map(event => 
                event._id === id ? { ...event, attendees: [...event.attendees, user._id] } : event
            ));
        } catch (error) {
            console.error('Error joining event', error);
        }
    };

    const deleteEvent = async (id) => {
        try {
            await axios.delete(`/events/${id}`, { data: { userId: user._id } });
            setEvents(events.filter(event => event._id !== id));
        } catch (error) {
            console.error('Error deleting event', error);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="events-container">
                <h1>Events</h1>
                <ul className="events-list">
                    {events.length === 0 ? (
                        <li>No events found</li>
                    ) : (
                        events.map(event => (
                            <li key={event._id} className="event-item">
                                <span className="event-name">{event.title || 'Unnamed Event'}</span>
                                <div className="event-buttons">
                                    <button className="join-button" onClick={() => joinEvent(event._id)}>Join</button>
                                    {event.userId === user._id && (
                                        <button className="delete-button" onClick={() => deleteEvent(event._id)}>Delete</button>
                                    )}
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Events;
