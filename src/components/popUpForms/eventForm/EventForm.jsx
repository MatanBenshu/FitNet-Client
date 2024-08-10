import { useState,useContext } from 'react';
import { AuthContext } from '../../../context/authContext/AuthContext.js';
import { EventContext } from '../../../context/eventContext/EventContext.js';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker,TimePicker } from '@mui/x-date-pickers';
import TextField from '@mui/material/TextField';
import './EventForm.css';
import axios ,{ geoApiOptions, GEO_API_URL } from '../../../Api.js';
import { Cancel, PermMedia } from '@mui/icons-material';
import { AsyncPaginate } from 'react-select-async-paginate';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';


export default function EventForm(props) {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const navigate = useNavigate();

    const {event,eventDispatch} = useContext(EventContext);
    const { user} = useContext(AuthContext);

    const [title, setTitle] = useState(event.title);
    const [location, setLocation] = useState(event.location);
    const [file, setFile] = useState(null);
    const [startDate, setStartDate] = useState(event.date!==''? moment(event.date,'DD-MM-YYYY'):null);
    const [timeStart, setTimeStart] = useState(event.startTime!==''? moment(event.startTime,'HH:mm:ss'):null);
    const [Desc, setDesc] = useState(event.desc);
    const [eventImg,setEventImg] = useState(event.img);
    const [disableButtons, setDisableButton] = useState(false);


    const loadOptions = async (inputValue) => {
        return await fetch(
            `${GEO_API_URL}/cities?countryIds=IL&namePrefix=${inputValue}`,
            geoApiOptions
        )
            .then((response) => response.json())
            .then((response) => {
                return {
                    options: response.data.map((city) => {
                        return {
                            value: `${city.latitude} ${city.longitude}`,
                            label: `${city.name}, ${city.countryCode}`,
                        };
                    }),
                };
            });
    };

    const handleOnLocationChange = (searchData) => {
        setLocation(searchData);
    };


    const  handleCreation =  async (e)  => {
        e.preventDefault();
        setDisableButton(true);
        
        if (!title ||!location.value ||!startDate ||!timeStart ) {
            alert('Please fill all fields');
            setDisableButton(false);
            return;
        }

        let img = eventImg;

        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append('name', fileName);
            data.append('file', file);
            img = fileName;
            try {
                await axios.post('/upload', data);
            } catch (err) {}
        }

        if(event._id === ''){
            try {
                console.log('Creating event');
                await axios.post('/events',{
                    userId:user._id,
                    title:title,
                    desc: Desc,
                    location:location,
                    date:startDate.format('DD-MM-YYYY'),
                    startTime: timeStart.format('HH:mm:ss'),
                    img: img,
                });
            } catch (error) {}
        }else{
            try {
                console.log('Updating event');
                const res = await axios.post(`/events/update/${event._id}`,{
                    userId:user._id,
                    title:title,
                    desc: Desc,
                    location:location,
                    date:startDate.format('DD-MM-YYYY'),
                    startTime: timeStart.format('HH:mm:ss'),
                    img: img,
                });
                const updatedEvent = res.data;
                if (updatedEvent.title !== event.title) {
                    navigate(`/event/${updatedEvent.title}?id=${updatedEvent._id}`);
                }else{
                    eventDispatch({type:'UPDATE_EVENT'});
                }
            } catch (error) {
                console.log( 'error on event update: ',error);
            }
        }
        setDisableButton(false);
        if (props.rightBar){
            props.rightBar();
        }
        props.toggle();
    };

    return (
        <div className="popupEvent">
            <div className="popup-innerEvent">
                <h2 className='eventFormTitle'>{event.title===''? 'Create Event':'Update Event' }</h2>
                <form className='EventForm' onSubmit={handleCreation}>
                    <div className='topEventFormContainer'>
                        <TextField id="EventTitle" 
                            label="Event Title" 
                            variant="outlined"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                          
                        />
                    </div>
                    <div className='middleEventFormContainer'>
                        <div className='middleEventFormItem'>
                            <AsyncPaginate className='CitiesSearcher'
                                placeholder="Search for city"
                                debounceTimeout={1100}
                                value={location}
                                onChange={handleOnLocationChange}
                                loadOptions={loadOptions}
                            />
                        </div>
                        <div className='middleEventFormItem' >
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                <DatePicker 
                                    label="Event Date"
                                    value={startDate}
                                    onChange={(newDate) => setStartDate(newDate)}
                                    disablePast={true}
                                    required
                                   
                                />
                            </LocalizationProvider>
                        </div>
                        <div className='middleEventFormItem'>
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                <TimePicker 
                                    label="Event Time"
                                    value={timeStart}
                                    onChange={(newTime) => setTimeStart(newTime)}
                                    required
                                   
                                />
                            </LocalizationProvider>
                        </div>
                    </div>
                    <div className='lowerEventForm'>
                        <div className='lowerEventFormItem'>
                            <TextField 
                                id="Description"
                                label="Event Description" 
                                value={Desc}
                                variant="outlined"
                                multiline
                                fullWidth
                                rows={4}
                                onChange={(e) => setDesc(e.target.value)}
                            />
                        </div>
                        <div className='lowerEventFormItem'>
                            <label htmlFor="file" className="shareOption">
                                <PermMedia htmlColor="tomato" className="shareIcon" />
                                <span className="shareOptionText">Upload Photo</span>
                                <input
                                    style={{ display: 'none' }}
                                    type="file"
                                    id="file"
                                    accept=".png,.jpeg,.jpg"
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                            </label>
                            {file && (
                                <div className="shareEventImgContainer">
                                    <img className="shareEventImg" src={URL.createObjectURL(file)} alt="" />
                                    <Cancel className="shareEventCancelImg" onClick={() => setFile(null)} />
                                </div>
                            )}
                            {!file && eventImg !== ''  && (
                                <div className="shareEventImgContainer">
                                    <img className="shareEventImg" src={PF + eventImg} alt="" />
                                    <Cancel className="shareEventCancelImg" onClick={() => setEventImg('')} />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='eventButtons'>
                        <button className='CancelEventButton' onClick={props.toggle} disabled={disableButtons}>Cancel</button>
                        <button 
                            className='submitEventButton' 
                            type="submit" 
                            disabled={disableButtons}>
                            {event.title===''? 'Create':'Update' }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
