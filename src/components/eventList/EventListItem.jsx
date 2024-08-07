
import {  ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import {Event} from '@mui/icons-material';



export default function EventListItems({item}) {
    return (
        
        <ListItem disablePadding>
            <ListItemButton onClick={() => console.log(item)}>
                <ListItemIcon>
                    <Event />
                </ListItemIcon>
                <ListItemText primary={item} />
            </ListItemButton>
        </ListItem>
    );
}