import { UpdateAction } from "../../dooble/action";
import { on } from "../../dooble/reducer";
import { circleContainsRect } from "../../physics/circle-contains-rect";
import { WorldState } from "../worldstate";

export const transporterUpdateReducer = on('UpdateAction', (current: WorldState, action: UpdateAction) => {
    
    
    for(let i = 0; i < current.transporters.length; i++){
        const pair = current.transporters[i];

        const {t1, t2} = pair;

        if(circleContainsRect(t1, current.player)){
            return 
        }

        if(circleContainsRect(t2, current.player)){
            
        }


    }
    
    return current;
});