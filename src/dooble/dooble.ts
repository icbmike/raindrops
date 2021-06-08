import { Action } from "./action";
import { Reducer } from "./reducer";
import { Subject } from "rxjs";
import { Story } from "./story";

export class Dooble<TState> {
    private actionSubject: Subject<Action> = new Subject();
    private stateSubject: Subject<TState> = new Subject();

    constructor(public state: TState, private reducers: Reducer<TState, Action>[], private stories: Story<TState>[]) { 
        stories
            .map(story => story(this.actionSubject, this.stateSubject))
            .forEach(obs$ => obs$.subscribe(action => this.dispatch(action)));
    }

    dispatch(action: Action) {
        this.state = this.reducers.reduce((current, reducer) => reducer(current, action), this.state);

        this.stateSubject.next(this.state);
        this.actionSubject.next(action);
    }
}
