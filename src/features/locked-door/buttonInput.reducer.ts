import { UpdateAction } from "../../dooble/action";
import { on } from "../../dooble/reducer";
import { WorldState } from "../worldstate";

export const buttonInputReducer = on('InputAction', (current: WorldState, action: UpdateAction): WorldState => {
    const {e} = current.input;
    const {buttons} = current;
    
    if(e){
        const newButtons = buttons.map(b => {
            return {
                ...b,
                on: b.interactive ? !b.on : b.on
            }
        });

        return {
            ...current,
            buttons: newButtons
        }
    }

    return current;
});

