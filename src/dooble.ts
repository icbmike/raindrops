import { Action } from "./action";
import { Reducer } from "./reducer";
import { connectable, Observable, Subject } from "rxjs";

export class Dooble<TState> {
    private subject: Subject<Action> = new Subject();

    constructor(public state: TState, private reducers: Reducer<TState, Action>[], private stories: Story[]) { 

        const multicast$ = connectable(this.subject)

        stories
            .map(story => story(multicast$))
            .forEach(obs$ => obs$.subscribe(action => this.dispatch(action)));

        multicast$.connect();
    }

    dispatch(action: Action) {
        this.state = this.reducers.reduce((current, reducer) => reducer(current, action), this.state);

        this.subject.next(action);
    }
}

export interface Story {
    (actions$: Observable<Action>) : Observable<Action>
}

