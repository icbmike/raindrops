import { World } from "../features/worldstate";
import { Action } from "./action";

export interface System<State, Action>{
    (current: State, action:Action): void;
}

export function on<TAction extends Action>(type: string, reducer:System<World, TAction>) {
    return (current: World, action: Action) => {
        if(action.type == type){
            return reducer(current, action as TAction)
        }

        return {...current};
    }
}