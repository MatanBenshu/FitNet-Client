export const UpdateEvent = (event) => ({
    type: 'SET_EVENT',
    payload: event,
});

export const FetchingEvent = () => ({
    type: 'FETCH_EVENT',
});

export const UpdateOwner = (owner) => ({
    type: 'SET_OWNER',
    payload: owner,
});

export const UpdateWeather = (weather) => ({
    type: 'SET_WEATHER',
    payload: weather,
});

export const FetchingSuccess = () => ({
    type: 'STOP_FETCH',
});

export const AddAttendee = (attendee) => ({
    type: 'ADD_ATTENDEE',
    payload: attendee,
});

export const RemoveAttendee = (attendee) => ({
    type: 'REMOVE_ATTENDEE',
    payload: attendee,
});