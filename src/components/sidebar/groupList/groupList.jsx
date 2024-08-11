

import {List, Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GroupListItem from '../groupList/grouplistItems';


export default function GroupList({group,title,}) {

    return (
        <Accordion >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                id="group-accordion"
            >
                {title}
            </AccordionSummary>
            <AccordionDetails>
                {group && group.length ? 
                    <List>
                        {group?.map((g)=>
                            (
                                <GroupListItem item={g}/>  
                            ))}
                       
                    </List>
                    : 'No groups found'}
            </AccordionDetails>
        </Accordion>
    );
}
