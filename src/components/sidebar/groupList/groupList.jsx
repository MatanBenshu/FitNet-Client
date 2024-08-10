

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
                <List>
                    {group?.map((g)=>
                        (
                            <GroupListItem item={g}/>  
                        ))}
                </List>
            </AccordionDetails>
        </Accordion>
    );
}
