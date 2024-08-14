
import {  ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import {Group} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';


export default function GrouplistItems({item}) {
    const navigate = useNavigate();
    return (
        
        <ListItem disablePadding>
            <ListItemButton onClick={() => navigate(`/group/${item}`)}>
                <ListItemIcon>
                    <Group />
                </ListItemIcon>
                <ListItemText primary={item} />
            </ListItemButton>
        </ListItem>
    );
}

