import { createContext, useReducer } from 'react';
import EventReducer from './EventReducer';

const INITIAL_STATE = {
    event:{
        userId: '',
        title: '',
        location: '',
        date: '',
        startTime: '',
        desc: '',
        img: '',
        group:'',
        attendees:[],
    },
    eventFetching: false,
};

export const EventContext = createContext(INITIAL_STATE);

export  const EventContextProvider = ({ children }) => {
    const [state, eventDispatch] = useReducer(EventReducer, INITIAL_STATE);
  
  
    return (
        <EventContext.Provider
            value={{
                event: state.event,
                eventFetching: state.eventFetching,
                eventDispatch,
            }}
        >
            {children}
        </EventContext.Provider>
    );
};

