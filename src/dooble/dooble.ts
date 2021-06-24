import { Action } from "./action";
import { System } from "./system";
import { Subject } from "rxjs";
import { Story } from "./story";

export class Dooble<TState> {
    private actionSubject: Subject<Action> = new Subject();
    private stateSubject: Subject<TState> = new Subject();

    constructor(public state: TState, private reducers: System<TState, Action>[], private stories: Story<TState>[]) { 
        stories
            .map(story => story(this.actionSubject, this.stateSubject))
            .forEach(obs$ => obs$.subscribe(action => this.dispatch(action)));
    }

    dispatch(action: Action) {
        this.reducers.forEach(r => r(this.state, action));

        this.stateSubject.next(this.state);
        this.actionSubject.next(action);
    }
}
