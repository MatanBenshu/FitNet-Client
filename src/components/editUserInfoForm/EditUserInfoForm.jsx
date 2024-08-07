
import { useState,useContext } from 'react';
import { AuthContext } from '../../context/AuthContext.js';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import './EditUserInfoForm.css';
import axios from 'axios';
import { Cancel, PermMedia,Replay} from '@mui/icons-material';
import dayjs from 'dayjs';

export default function EditUserInfoForm(props) {

    const [disableButtons, setDisableButton] = useState(false);
    const { user,dispatch} = useContext(AuthContext);
    const [firstName,SetFirstName] = useState(user.firstName);
    const [lastName,SetLastName] = useState(user.lastName);
    const [dob,SetDob] = useState(dayjs(user.birthDate));
    const [address,SetAddress] = useState(user.address);
    const [gender,SetGender] = useState(user.gender);
    const Genders = [{value: 'Male'}, {value: 'Female'}, {value: 'Other'}];

    console.log(user);

    
    const [file1, setFile1] = useState(null);
    const [file2, setFile2] = useState(null);

    const  handleCreation =  async (e)  => {
        e.preventDefault();
        setDisableButton(true);
        
        const UpdateFields = {
            userId:user._id,
            firstName:firstName,
            lastName:lastName,
            birthDate: dob.toISOString(),
            address:address,
            gender:gender,
            profilePicture: user.profilePicture,
            coverPicture: user.coverPicture,
        };


        if (file1) {
            const data = new FormData();
            const fileName = Date.now() + file1.name;
            data.append('name', fileName);
            data.append('file', file1);
            UpdateFields.profilePicture = fileName;
            try {
                await axios.post('/upload', data);
            } catch (err) {}
        }
        if (file2) {
            const data = new FormData();
            const fileName = Date.now() + file2.name;
            data.append('name', fileName);
            data.append('file', file2);
            UpdateFields.coverPicture = fileName;
            try {
                await axios.post('/upload', data);
            } catch (err) {}
        }

        try {
            const response = await axios.post('/users/'+user._id, UpdateFields);
            dispatch({ type:'UPDATE_USER', payload:response.data });
        } catch (error) {     
        }
        setDisableButton(false);
        props.toggle();
    };
    

    return (
        <div className="popup">
            <div className="popup-inner">
                <h2>Edit Info</h2>
                <form className='InfoForm' onSubmit={handleCreation}>
                    <div className='middleFormContainer'>
                        <div className='middleFormItem'>
                            <Replay htmlColor="tomato" className="resetIcon" onClick={()=> SetFirstName(user.firstName)}/>
                            <TextField
                                label='first name'
                                required
                                type="text" 
                                value={firstName}
                                onChange={(e) => SetFirstName(e.target.value)}
                                placeholder='Enter First Name'
                            />
                        </div>
                        <div className='middleFormItem' >
                            <Replay htmlColor="tomato" className="resetIcon" onClick={()=> SetLastName(user.lastName)}/>
                            <TextField
                                label='Last name'
                                required
                                type="text" 
                                value={lastName}
                                onChange={(e) => SetLastName(e.target.value)}
                                placeholder='Enter Last Name'
                            />
                        </div>
                        <div className='middleFormItem'>
                            <TextField
                                select
                                label="Gender"
                                defaultValue={gender}
                                onChange={(e) => SetGender(e.target.value)}
                            >
                                {Genders.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.value}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>
                    </div>
                    <div className='middleFormContainer'>
                        <div className='middleFormItem' >
                            <Replay htmlColor="tomato" className="resetIcon" onClick={()=> SetAddress(user.address)}/>
                            <TextField
                                label='address'
                                required
                                type="text" 
                                value={address}
                                onChange={(e) => SetAddress(e.target.value)}
                                placeholder='Enter Address'
                            />
                        </div>
                        <div className='middleFormItem'>
                            <Replay htmlColor="tomato" className="resetIcon" onClick={()=> SetDob(dayjs(user.birthDate))}/>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Date of Birth"
                                    value={dob}
                                    onChange={(newDate) => SetDob(newDate)}
                                    required
                                />
                            </LocalizationProvider>
                        </div>
                    </div>
                    <div className='lowerForm'>
                        <div className='lowerFormItem'>
                            <label htmlFor="file1" className="shareOption">
                                <PermMedia htmlColor="tomato" className="shareIcon" />
                                <span className="shareOptionText">profile img</span>
                                <input
                                    style={{ display: 'none' }}
                                    type="file"
                                    id="file1"
                                    accept=".png,.jpeg,.jpg"
                                    onChange={(e) => setFile1(e.target.files[0])}
                                />
                            </label>
                            {file1 && (
                                <div className="shareImgContainer">
                                    <img className="shareImg" src={URL.createObjectURL(file1)} alt="" />
                                    <Cancel className="shareCancelImg" onClick={() => setFile1(null)} />
                                </div>
                            )}
                        </div>
                        <div className='lowerFormItem'>
                            <label htmlFor="file2" className="shareOption">
                                <PermMedia htmlColor="tomato" className="shareIcon" />
                                <span className="shareOptionText">cover img</span>
                                <input
                                    style={{ display: 'none' }}
                                    type="file"
                                    id="file2"
                                    accept=".png,.jpeg,.jpg"
                                    onChange={(e) => setFile2(e.target.files[0])}
                                />
                            </label>
                            {file2 && (
                                <div className="shareImgContainer">
                                    <img className="shareImg" src={URL.createObjectURL(file2)} alt="" />
                                    <Cancel className="shareCancelImg" onClick={() => setFile2(null)} />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='buttons'>
                        <button className='CancelButton' onClick={props.toggle} disabled={disableButtons}>Cancel</button>
                        <button className='submitButton' type="submit" disabled={disableButtons}>Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
