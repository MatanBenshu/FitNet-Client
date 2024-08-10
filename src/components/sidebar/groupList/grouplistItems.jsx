
import {  ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import {Group} from '@mui/icons-material';

// need to add link to group page with 'groups/item'
// use navigte on click
export default function grouplistItems({item}) {
    return (
        
        <ListItem disablePadding>
            <ListItemButton onClick={() => console.log(item)}>
                <ListItemIcon>
                    <Group />
                </ListItemIcon>
                <ListItemText primary={item} />
            </ListItemButton>
        </ListItem>
    );
}

