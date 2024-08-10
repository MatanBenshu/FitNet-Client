const EventReducer = (state, action) => {
    switch (action.type) {
    case 'SET_EVENT':
        return {
            ...state,
            event: action.payload,
        };
        
    case 'FETCH_EVENT':
        return {
            ...state,
            eventFetching: true,
        };
        
    case 'STOP_FETCH':
        return {
            ...state,
            eventFetching: false,
        };
        
    case 'UPDATE_EVENT':
        return {
            ...state,
            eventUpdate: !state.eventUpdate,
        };
    
    case 'ADD_ATTENDEE':
        return {
            ...state,
            event: {
                ...state.event,
                attendees: [...state.event.attendees, action.payload],
            },
        };

    case 'REMOVE_ATTENDEE':
        return {
            ...state,
            event: {
                ...state.event,
                attendees: state.event.attendees.filter(attendee => attendee!== action.payload),
            },
        };

    case 'SET_OWNER': 
        return {
            ...state,
            owner: action.payload
        };  
        
    case 'SET_WEATHER': 
        return {
            ...state,
            weather: action.payload
        };  

    default:
        return state;
    }
};
  
export default EventReducer;