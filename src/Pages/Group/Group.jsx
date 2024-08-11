import './Group.css';
import NavBar from '../../components/navBar/navBar';
import { GroupContextProvider } from '../../context/groupContext/GroupContext';



export default function GroupPage() {

    return (
        <>
            <NavBar />
            <GroupContextProvider>
                <Group/>
            </GroupContextProvider>
        </>
    );
}

export function Group(){
    return (
        <div className="group">
            <h2>Group Page</h2>
        </div>
    );
}