import { useState,useContext } from 'react';
import { AuthContext } from '../../context/AuthContext.js';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker,TimePicker } from '@mui/x-date-pickers';
import TextField from '@mui/material/TextField';
import './EventForm.css';
import axios ,{ geoApiOptions, GEO_API_URL } from '../../Api.js';
import { Cancel, PermMedia } from '@mui/icons-material';
import { AsyncPaginate } from 'react-select-async-paginate';

export default function EventForm(props) {

    const [disableButtons, setDisableButton] = useState(false);
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState(null);
    //const [longitude, setLongitude] = useState('');
    const [file, setFile] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [timeStart, setTimeStart] = useState(null);
    const [Desc, setDesc] = useState('');
    const { user} = useContext(AuthContext);


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
        console.log(searchData);
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

        let img = '';

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

        try {
            await axios.post('/events',{
                userId:user._id,
                title:title,
                desc: Desc,
                location:location,
                date:startDate,
                startTime: timeStart,
                img: img,
            });
        } catch (error) {
            
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
                <h2 className='eventFormTitle'>Create Event</h2>
                <form className='EventForm' onSubmit={handleCreation}>
                    <div className='topEventFormContainer'>
                        <TextField id="EventTitle" 
                            label="Event Title" 
                            variant="outlined"
                            required
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
                                    onChange={(newDate) => setStartDate(newDate.format('YYYY-MM-DD'))}
                                    disablePast={true}
                                    required
                                   
                                />
                            </LocalizationProvider>
                        </div>
                        <div className='middleEventFormItem'>
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                <TimePicker 
                                    label="Event Time"
                                    onChange={(newTime) => setTimeStart(newTime.format('HH:mm:ss'))}
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
                        </div>
                    </div>
                    <div className='eventButtons'>
                        <button className='CancelEventButton' onClick={props.toggle} disabled={disableButtons}>Cancel</button>
                        <button className='submitEventButton' type="submit" disabled={disableButtons}>Create</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
