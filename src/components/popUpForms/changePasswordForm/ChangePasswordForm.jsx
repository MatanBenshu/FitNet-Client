import { useState, useContext } from 'react';
import './ChangePasswordForm.css';
import axios from '../../../Api.js';
import TextField from '@mui/material/TextField';
import { AuthContext } from '../../../context/authContext/AuthContext.js';

export default function ChangePasswordForm (props) {

    const { user,dispatch} = useContext(AuthContext);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorCurrent, setError] = useState(false);
    const [errorNew, setErrorNew] = useState(false);
    const [errorConfirm, setErrorConfirm] = useState(false);


    const validatePassword = (password) => {
        const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    };
    
    const handleCurrentPasswordChange = (e) => {
        setCurrentPassword(e.target.value);
        setError(!validatePassword(e.target.value));
    };
    
    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
        setErrorNew(!validatePassword(e.target.value));
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setErrorConfirm(!validatePassword(e.target.value));
    };
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validatePassword(currentPassword) || 
        !validatePassword(newPassword) || 
        !validatePassword(confirmPassword)) {
            return;
        }

        if (currentPassword === newPassword) {
            alert('New password cannot be the same as the current password!');
            return;
        }

        if (newPassword === confirmPassword) {
            try {
                const response = await axios.post('/users/change-password/' + user._id, { currentPassword, newPassword });
                if (response.status === 200) {
                    dispatch({ type: 'UPDATE_USER', payload: response.data });
                    props.toggle();
                }
            } catch (error) {
                if (error.response.status === 403) {
                    alert('Current password is incorrect!');
                } else {
                    console.error(error);
                }
            }
        } else {
            alert('New password and confirm password do not match!');
        }
    };
    return (
        <div className="popup-password">
            <div className="popup-password-inner">
                <h2 className='popup-password-title'>Change Password</h2>
                <p className='popup-password-Description'>
                    New password must be at least 8 characters long,
                    <br/> contain at least one uppercase letter,
                    <br/> one number, and one special character.
                </p>
                <form className="change-password-form" onSubmit={handleSubmit}>
                    <div className='change-password-form-input'>
                        <TextField
                            fullWidth 
                            error={errorCurrent}                  
                            label='Current Password'
                            placeholder='Enter your current password'
                            type="password" 
                            required
                            value={currentPassword}
                            onChange={handleCurrentPasswordChange}
                            autoFocus={true}
                            helperText={errorCurrent? 'Field does not meet the requirements ' : ''}
                        />
                    </div>
                    <div className='change-password-form-input'>
                        <TextField
                            fullWidth 
                            error={errorNew}   
                            label='New Password'
                            placeholder='Enter your new password'
                            type="password" 
                            required
                            value={newPassword}
                            onChange={handleNewPasswordChange}
                            helperText={errorNew? 'Field does not meet the requirements ' : ''}
                        />
                    </div>
                    <div className='change-password-form-input'>
                        <TextField
                            fullWidth 
                            error={errorConfirm}   
                            label='Confirm New Password'
                            placeholder='Enter your new password again'
                            type="password" 
                            required
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            helperText={errorConfirm? 'Field does not meet the requirements ' : ''}
                        />
                    </div>
                    <div className='change-password-form-buttons'>
                        <button onClick={props.toggle} >Cancel</button>
                        <button type="submit">Change</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
