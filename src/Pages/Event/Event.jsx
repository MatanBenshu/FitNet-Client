import './Event.css'; 
import { useLocation ,useNavigate, useParams} from 'react-router-dom';
import { useEffect, useContext } from 'react';
import axios,{ WEATHER_API_URL, WEATHER_API_KEY} from '../../Api';
import defAxios from 'axios';
import NavBar from '../../components/navBar/navBar';
import { EventContextProvider } from '../../context/eventContext/EventContext';
import { EventContext } from '../../context/eventContext/EventContext';
import CircularProgress from '@mui/material/CircularProgress';
import SidebarEvent from '../../components/sidebar/SideBarEvent';
import EventMiddlePage from '../../components/eventMiddlePage/EventMiddlePage';
import RightbarEvent from '../../components/rightbar/RightbarEvent';



export default function EventPage() {

    return (
        <>
            <NavBar />
            <EventContextProvider>
                <Event/>
            </EventContextProvider>
        </>
    );
}
export function Event() {
    const location = useLocation();
    const eventId = new URLSearchParams(location.search).get('id');
    const eventTitle = useParams().title;
    const navigate = useNavigate();
    const {eventFetching,eventDispatch} = useContext(EventContext);

    useEffect(() => {
        const fetchEvent = async () => {
            try{
                eventDispatch({type: 'FETCH_EVENT'});

                const eventRes = await axios.get('/events/' + eventId);
                eventDispatch({type: 'SET_EVENT', payload: eventRes.data});
                if(eventRes.data.title !== eventTitle)
                {
                    navigate('/page404');
                }

                const ownerRes = await axios.get(`/users?userId=${eventRes.data.userId}`);
                eventDispatch({type: 'SET_OWNER', payload: ownerRes.data});

                const [lat, lon] = eventRes.data.location.value.split(' ');
                const weatherRes = await defAxios
                (`${WEATHER_API_URL}lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`);
                eventDispatch({type: 'SET_WEATHER', payload: weatherRes.data});
                console.log(weatherRes);

                eventDispatch({type: 'STOP_FETCH'});

            } catch (err) {
                navigate('/page404');
            }
        };
        fetchEvent();
    }, [eventId,navigate,eventTitle,eventDispatch]);


    if(eventFetching) {
        return(
            <div className='loadingScreen'> <CircularProgress size={120} /></div>
        ); 
    }


    return (
        <div className="eventContainer">
            <SidebarEvent/>
            <EventMiddlePage/>
            <RightbarEvent/>
        </div>
    );
}
