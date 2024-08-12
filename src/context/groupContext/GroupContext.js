import { createContext, useReducer } from 'react';
import GroupReducer from './GroupReducer';

const INITIAL_STATE = {
    group:{
        _id: '',
        Admin: '',
        groupname: '',
        type: '',
        desc: '',
        followers:[],
        waiting:[],
    },
    Admin: {
        _id:'',
        username: '',
        profilePicture: '',
    },
    groupFetching: false,
    groupUpdate: false,
};

export const GroupContext = createContext(INITIAL_STATE);

export  const GroupContextProvider = ({ children }) => {
    const [state, groupDispatch] = useReducer(GroupReducer, INITIAL_STATE);
  
  
    return (
        <GroupContext.Provider
            value={{
                group: state.group,
                groupFetching: state.groupFetching,
                Admin: state.Admin,
                groupUpdate: state.groupUpdate,
                groupDispatch,
            }}
        >
            {children}
        </GroupContext.Provider>
    );
};

