import { useState, useContext } from 'react';
import './DeleteAccountForm.css';
import axios from '../../../Api.js';
import TextField from '@mui/material/TextField';
import { AuthContext } from '../../../context/authContext/AuthContext.js';

export default function DeleteAccountForm (props) {

    const { user,dispatch} = useContext(AuthContext);
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log(password);
            const response = await axios.delete('/users/' + user._id, {data: { password },});
            if (response.status === 200) {
                dispatch({ type: 'LOGOUT'});
            }
        } catch (error) {
            if (error.response) {
                alert(`Error: ${error.response.data}`);
            } else if (error.request) {
                alert('Error: No response from server');
            } else {
                alert(`Error: ${error.message}`);
            }
        }

    };
    return (
        <div className="popup-Delete">
            <div className="popup-Delete-inner">
                <h2 className='popup-Delete-title'>Delete Account</h2>
                <p className='popup-Delete-Description'>
                    Are you sure you want to delete your account? 
                    <br/>This action cannot be undone.
                </p>
                <form className="delete-account-form" onSubmit={handleSubmit}>
                    <div className='delete-account-form-input'>
                        <TextField
                            error
                            fullWidth                 
                            label='Password'
                            placeholder='Enter your password'
                            type="password" 
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoFocus={true}
                        />
                    </div>
                    <div className='delete-form-buttons'>
                        <button onClick={props.toggle} >Cancel</button>
                        <button type="submit">Delete</button>
                    </div>
                </form>
            </div>
        </div>
    );
}


