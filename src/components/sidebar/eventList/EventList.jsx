
import {List, Accordion, AccordionDetails, AccordionSummary} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EventListItems from './EventListItem';

export default function EventList({event,title,}) {

 
    return (
        <Accordion >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                id="event-accordion"
            >
                {title}
            </AccordionSummary>
            <AccordionDetails>
                {event && event.length ? 
                    <List>
                        {event?.map((e)=>
                            (
                                <EventListItems item={e}/>  
                            ))}
                    </List>
                    : <p>No events found.</p>}
            </AccordionDetails>
        </Accordion>
    );
}
