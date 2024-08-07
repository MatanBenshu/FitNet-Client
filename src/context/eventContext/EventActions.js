export const UpdateEvent = (event) => ({
    type: 'SET_EVENT',
    payload: event,
});


export const FetchingEvent = () => ({
    type: 'FETCH_EVENT',
});

export const AddAttendee = (attendee) => ({
    type: 'ADD_ATTENDEE',
    payload: attendee,
});

export const RemoveAttendee = (attendee) => ({
    type: 'REMOVE_ATTENDEE',
    payload: attendee,
});