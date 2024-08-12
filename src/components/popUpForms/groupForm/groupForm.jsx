import { useState,useContext } from 'react';
import { AuthContext } from '../../../context/authContext/AuthContext.js';
import { GroupContext } from '../../../context/groupContext/GroupContext.js';
import './groupForm.css';
import axios from '../../../Api.js';
import { useNavigate } from 'react-router-dom';

export default function GroupForm(props) {

    const [disableButtons, setDisableButton] = useState(false);
    const { group,groupDispatch } = useContext(GroupContext);
    const { user} = useContext(AuthContext);
    const [title,setTitle] = useState(group.groupname);
    const [Desc,setDesc] = useState(group.desc);
    const [type,setType] = useState((group.type === '') ? 'public' : group.type);
    const navigate = useNavigate();


    const  handleCreation =  async (e)  => {
        e.preventDefault();
        setDisableButton(true);

        if (title.trim() === '' || Desc.trim() === '') {
            alert('Please enter a title and description');
            setDisableButton(false);
            return;
        }
        
        if (group._id === ''){
            try {
                const response = await axios.post('/groups',{
                    Admin:user._id,
                    groupname: title.trim(),
                    desc: Desc,
                    type: type,
                });
                console.log(response);
            } catch (error) {
                alert(`The group name ${title.trim()} already exists`);
                setDisableButton(false);
                return;
            }
        }else{
            try {
                const response = await axios.put(`/groups/${group._id}`,{
                    Admin:user._id,
                    groupname: title.trim(),
                    desc: Desc,
                    type: type,
                });
                const updatedGroup = response.data;
                if (updatedGroup.groupname !== group.groupname) {
                    navigate(`/group/${updatedGroup.groupname}`);
                }else{
                    groupDispatch({type:'UPDATE_GROUP'});
                }
            } catch (error) {
                alert(`The group name ${title.trim()} already exists`);
                setDisableButton(false);
                return;
            }      
        }
        setDisableButton(false);
        props.rightBar?.();
        props.toggle();
    };

    return (
        <div className="GroupPopup">
            <div className="GroupPopup-inner">
                <h2 className='GroupPopup-title'>{group.groupname === '' ? 'Create Group' : 'Update Group'}</h2>
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
                            value = {title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder='Enter Group Name'
                            minLength={10}
                        />
                    </div>
                    <div className='textContainer'>
                        <textarea 
                            className='Description'
                            name="Description" 
                            id="Description" 
                            value = {Desc}
                            onChange={(e) => setDesc(e.target.value)}
                            cols="30" 
                            rows="5" 
                            placeholder="Enter Group Description" 
                            maxLength={100}
                        ></textarea>
                    </div>
                    <div className='buttons'>
                        <button className='CancelButton' onClick={props.toggle} disabled={disableButtons}>Cancel</button>
                        <button className='submitButton' type="submit" disabled={disableButtons}>
                            {group.groupname === '' ? 'Create' : 'update'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
