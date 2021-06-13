import { UpdateAction } from "../../dooble/action";
import { on } from "../../dooble/reducer";
import { World } from "../worldstate";

export const buttonInputReducer = on('InputAction', (current: World, action: UpdateAction): World => {
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
            
        }
    }

    return current;
});

