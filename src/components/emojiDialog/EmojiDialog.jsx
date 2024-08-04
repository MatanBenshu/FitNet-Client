import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import EmojiPicker from 'emoji-picker-react';
import Button from '@mui/material/Button';

function emojiDialog({handler,state,text}) {

    return (
        <Dialog open={state}>
            <DialogTitle>Subscribe</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Choose Emoji:
                </DialogContentText>
                <EmojiPicker
                    className="emojiPicker"
                    disableAutoFocus={true} 
                    onEmojiClick={(e) => text.current.value += e.emoji} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handler(false)}>close</Button>
            </DialogActions>
        </Dialog>

    );
}
export default emojiDialog;