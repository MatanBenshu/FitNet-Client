
import {  ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import {Event} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';



export default function EventListItems({item}) {
    const navigate = useNavigate();
    return (
        <ListItem disablePadding>
            <ListItemButton onClick={() => navigate(`/event/${item.title}?id=${item._id}`)}>
                <ListItemIcon>
                    <Event />
                </ListItemIcon>
                <ListItemText primary={item.title} />
            </ListItemButton> 
        </ListItem>
    );
}