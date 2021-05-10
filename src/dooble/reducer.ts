export interface Reducer<State, Action>{
    (current: State, action:Action): State;
} 