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
    default:
        return state;
    }
};
  
export default EventReducer;