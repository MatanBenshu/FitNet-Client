const EventReducer = (state, action) => {
    switch (action.type) {
    case 'SET_EVENT':
        return {
            event: action.payload,
            eventFetching: false,
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

    case 'UPDATE_EVENT':
    default:
        return state;
    }
};
  
export default EventReducer;