import { WorldState } from "../features/worldstate";
import { Action } from "./action";

export interface Reducer<State, Action>{
    (current: State, action:Action): State;
}

export function on<TAction extends Action>(type: string, reducer:Reducer<WorldState, TAction>) {
    return (current: WorldState, action: Action) => {
        if(action.type == type){
            return reducer(current, action as TAction)
        }

        return {...current};
    }
}