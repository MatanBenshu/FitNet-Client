const GroupReducer = (state, action) => {
    switch (action.type) {
    case 'SET_GROUP':
        return {
            ...state,
            group: action.payload,
        };
        
    case 'FETCH_GROUP':
        return {
            ...state,
            groupFetching: true,
        };
        
    case 'STOP_FETCH':
        return {
            ...state,
            groupFetching: false,
        };
        
    case 'UPDATE_GROUP':
        return {
            ...state,
            groupUpdate: !state.groupUpdate,
        };
    
    case 'ADD_WAITING':
        return {
            ...state,
            group: {
                ...state.group,
                waiting: [...state.group.waiting, action.payload],
            },
        };

    case 'REMOVE_WAITING':
        return {
            ...state,
            group: {
                ...state.group,
                waiting: state.group.waiting.filter(waitUser => waitUser!== action.payload),
            },
        };
    
    case 'APPROVED_WAITING':
        return {
            ...state,
            group: {
                ...state.group,
                waiting: state.group.waiting.filter(waitUser => waitUser!== action.payload),
                followers: [...state.group.followers, action.payload],
            },
        };
    
    case 'ADD_FOLLOWER':
        return {
            ...state,
            group: {
                ...state.group,
                followers: [...state.group.followers, action.payload],
            },
        };


    case 'REMOVE_FOLLOWER':
        return {
            ...state,
            group: {
                ...state.group,
                followers: state.group.followers.filter(followUser => followUser!== action.payload),
            },
        };

    case 'SET_ADMIN': 
        return {
            ...state,
            Admin: action.payload
        };  

    default:
        return state;
    }
};
  
export default GroupReducer;