
import './EventMiddlePage.css';
import { EventContext } from '../../context/eventContext/EventContext';
import { useContext } from 'react';
import CurrentWeather from '../weather/Weather';

export default function EventMiddlePage(){
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const {event,weather} = useContext(EventContext);
    console.log(weather);



    return (
        <div className="middle">
            <div className="middleWrapper">
                <div className='eventTitleDesc'>
                    <h1 className='eventTitle'>{event.title}</h1>
                    <p className='eventDesc'>{event.desc}</p>
                </div>
                <div className='eventDetails'>
                    <div className='eventDetailsItem'>
                        <h2>Date:</h2>
                        <p>{event.date}</p>
                    </div>
                    <div className='eventDetailsItem'>
                        <h2>Time:</h2>
                        <p>{event.startTime}</p>
                    </div>
                    <div className='eventDetailsItem'>
                        <h2>Location:</h2>
                        <p>{event.location.label}</p>
                    </div>
                </div>
                <div className='eventImgAndWeather'>
                    {event.img ? <img className='eventDetailImg' src={PF+event.img} alt={event.title} />:
                        <img className='eventDetailImg' src={PF +'FitNetLogo.png'} alt={event.title}/>}
                    <div className='eventDetailWeather'>
                        {weather? <CurrentWeather/>:null}
                    </div>
                </div>
                
            </div>
        </div>
    );
}