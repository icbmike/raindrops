import { Action } from "./action";
import { Reducer } from "./reducer";

export class Dooble<TState> {

    constructor(public state: TState, private reducers: Reducer<TState, Action>[], private stories: Story[]) {}

    dispatch(action: Action) {
        this.state = this.reducers.reduce((current, reducer) => reducer(current, action), this.state);
    }
}

export interface Story {

}