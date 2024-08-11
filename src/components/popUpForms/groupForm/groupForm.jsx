import { useRef,useState,useContext } from 'react';
import { AuthContext } from '../../../context/authContext/AuthContext.js';
import './groupForm.css';
import axios from '../../../Api.js';

export default function GroupForm(props) {

    const [disableButtons, setDisableButton] = useState(false);
    const { user} = useContext(AuthContext);
    const title = useRef();
    const Desc = useRef();
    const [type,setType] = useState('public');


    const  handleCreation =  async (e)  => {
        e.preventDefault();
        setDisableButton(true);

        try {
            const response = await axios.post('/groups',{
                Admin:user._id,
                groupname: title.current.value,
                desc: Desc.current.value,
                type: type,
            });
            console.log(response);
        } catch (error) {
            
        }
        setDisableButton(false);
        props.rightBar?.();
        props.toggle();
    };

    return (
        <div className="GroupPopup">
            <div className="GroupPopup-inner">
                <h2 className='GroupPopup-title'>Create Group</h2>
                <form onSubmit={handleCreation}>
                    <div className='textContainer'>
                        <div className='radioContainer'>
                            <input
                                type="radio"
                                id="public"
                                name="groupType"
                                value="public"
                                checked={type === 'public'}
                                onChange={() => setType('public')}
                            />
                            <label htmlFor="public">Public</label>
                            <br/>
                            <input
                                type="radio"
                                id="private"
                                name="groupType"
                                value="private"
                                checked={type === 'private'}
                                onChange={() => setType('private')}
                            />
                            <label htmlFor="private">Private</label>
                        </div>
                        <input
                            className='name'
                            required
                            type="text" 
                            ref={title}
                            placeholder='Enter Group Name'
                            minLength={10}
                        />
                    </div>
                    <div className='textContainer'>
                        <textarea 
                            className='Description'
                            name="Description" 
                            id="Description" 
                            ref={Desc}
                            cols="30" 
                            rows="5" 
                            placeholder="Enter Group Description" 
                            maxLength={100}
                        ></textarea>
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
