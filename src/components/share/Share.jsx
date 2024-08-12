import './share.css';
import {PermMedia, EmojiEmotions, Cancel} from '@mui/icons-material';
import {Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { useContext, useRef, useState } from 'react';
import { AuthContext } from '../../context/authContext/AuthContext';
import { GroupContext } from '../../context/groupContext/GroupContext';
import axios from '../../Api';
import EmojiPicker from 'emoji-picker-react';

export default function Share({handler}) {
    const { user } = useContext(AuthContext);
    const { group} = useContext(GroupContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const desc = useRef();
    const [file, setFile] = useState(null);
    const [open, setOpen] = useState(false);


    const handleClickOpen = () => {
        setOpen(true);
    };
  
    const handleClose = () => {
        setOpen(false);
    };


    const submitHandler = async (e) => {
        e.preventDefault();
        if (!desc.current.value && !file){
            alert('Please enter a description');
            return;
        }
        const newPost = {
            userId: user._id,
            desc: desc.current.value,
            group: group._id
        };
        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append('name', fileName);
            data.append('file', file);
            newPost.img = fileName;
            console.log(newPost);
            try {
                await axios.post('/upload', data);
            } catch (err) {}
        }
        try {
            await axios.post('/posts', newPost);
            desc.current.value = '';
            setFile(null);
            handler();
            //window.location.reload();
        } catch (err) {}
    };

    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img
                        className="shareProfileImg"
                        src={
                            user.profilePicture
                                ? PF + user.profilePicture
                                : PF + 'person/noAvatar.png'
                        }
                        alt=""
                    />
                    <input
                        placeholder={'What\'s in your mind ' + user.username + '?'}
                        className="shareInput"
                        ref={desc}
                    />
                </div>
                <hr className="shareHr" />
                {file && (
                    <div className="shareImgContainer">
                        <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
                        <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
                    </div>
                )}
                <form className="shareBottom" onSubmit={submitHandler}>
                    <div className="shareOptions">
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
                        <div className="shareOption">
                            <Dialog open={open}>
                                <DialogTitle>Choose Emoji:</DialogTitle>
                                <DialogContent>
                                    <EmojiPicker
                                        className="emojiPicker"
                                        reactionsDefaultOpen={true}
                                        height={300} width={350}
                                        searchDisabled={true}
                                        emojiStyle={'native'}
                                        onEmojiClick={(e) => desc.current.value += e.emoji} />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>close</Button>
                                </DialogActions>
                            </Dialog>
                            <EmojiEmotions htmlColor="goldenrod" className="shareIcon" onClick={handleClickOpen} />
                            <span className="shareOptionText" onClick={handleClickOpen}>Feelings</span>
                        </div>
                    </div>
                    <button className="shareButton" type="submit">
                        Share
                    </button>
                </form>
            </div>
        </div>
    );
}
