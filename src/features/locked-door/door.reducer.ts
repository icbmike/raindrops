import { on } from "../../dooble/reducer";
import { TriggerAction } from "../trigger/Trigger";
import { WorldState } from "../worldstate";
import { Door } from "./Door";

export const doorReducer = on('TriggerAction', (current:WorldState, action:TriggerAction) => {
    const {code} = action.payload;

    const newDoors: Door[] = current.doors.map(d => {

        const matchesCode = d.code == code;
        return {
            ...d,
            state: matchesCode && d.state == 'Closed' ? 'Open' : 'Closed' 
        }
    });

    return {
        ...current,
        doors: newDoors
    }
});