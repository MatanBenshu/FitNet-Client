import { useState,useContext } from 'react';
import { AuthContext } from '../../context/AuthContext.js';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker,TimePicker } from '@mui/x-date-pickers';
import TextField from '@mui/material/TextField';
import './EventForm.css';
import axios from '../../Api.js';
import { Cancel, PermMedia } from '@mui/icons-material';

export default function EventForm(props) {

    const [disableButtons, setDisableButton] = useState(false);
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [file, setFile] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [timeStart, setTimeStart] = useState(null);
    const [Desc, setDesc] = useState('');
    const { user} = useContext(AuthContext);


    const  handleCreation =  async (e)  => {
        e.preventDefault();
        setDisableButton(true);
        
        if (!title ||!location ||!startDate ||!timeStart ) {
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
        <div className="popup">
            <div className="popup-inner">
                <h2>Create Event</h2>
                <form className='EventForm' onSubmit={handleCreation}>
                    <div className='topFormContainer'>
                        <TextField id="Title" 
                            label="Event Title" 
                            variant="outlined"
                            required
                            onChange={(e) => setTitle(e.target.value)}
                          
                        />
                    </div>
                    <div className='middleFormContainer'>
                        <div className='middleFormItem'>
                            <TextField id="location" 
                                label="Event Location" 
                                variant="outlined"
                                required
                                onChange={(e) => setLocation(e.target.value)}  
                              
                            />
                        </div>
                        <div className='middleFormItem' >
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                <DatePicker 
                                    label="Event Date"
                                    onChange={(newDate) => setStartDate(newDate.format('YYYY-MM-DD'))}
                                    disablePast={true}
                                    required
                                   
                                />
                            </LocalizationProvider>
                        </div>
                        <div className='middleFormItem'>
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                <TimePicker 
                                    label="Event Time"
                                    onChange={(newTime) => setTimeStart(newTime.format('HH:mm:ss'))}
                                    required
                                   
                                />
                            </LocalizationProvider>
                        </div>
                    </div>
                    <div className='lowerForm'>
                        <div className='lowerFormItem'>
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
                        <div className='lowerFormItem'>
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
                                <div className="shareImgContainer">
                                    <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
                                    <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='buttons'>
                        <button className='CancelButton' onClick={props.toggle} disabled={disableButtons}>Cancel</button>
                        <button className='submitButton' type="submit" disabled={disableButtons}>Create</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
