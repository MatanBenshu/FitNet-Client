import { createContext, useReducer } from 'react';
import EventReducer from './EventReducer';

const INITIAL_STATE = {
    event:{
        _id: '',
        userId: '',
        title: '',
        location: {value: '', label: ''},
        date: '',
        startTime: '',
        desc: '',
        img: '',
        group:'',
        attendees:[],
    },
    owner: {
        _id:'',
        username: '',
        profilePicture: '',
    },
    weather:{
        name: '',
        weather: [{description: '' ,icon:''}],
        main: {temp: '', feels_like: '', pressure: '', humidity: ''},
        wind: {speed: ''},
    },
    eventFetching: false,
    eventUpdate: false,
};

export const EventContext = createContext(INITIAL_STATE);

export  const EventContextProvider = ({ children }) => {
    const [state, eventDispatch] = useReducer(EventReducer, INITIAL_STATE);
  
  
    return (
        <EventContext.Provider
            value={{
                event: state.event,
                eventFetching: state.eventFetching,
                owner: state.owner,
                weather: state.weather,
                eventUpdate: state.eventUpdate,
                eventDispatch,
            }}
        >
            {children}
        </EventContext.Provider>
    );
};

