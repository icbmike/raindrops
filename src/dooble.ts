import { Action, RandomTickAction } from "./action";
import { Reducer } from "./reducer";
import { connectable, Observable, Subject } from "rxjs";
import { connect, filter, map, mergeMap, multicast, publish, tap } from "rxjs/operators";
import { createRandomEvents } from "./createRandomEvents";

export class Dooble<TState> {
    private subject: Subject<Action> = new Subject();

    constructor(public state: TState, private reducers: Reducer<TState, Action>[], private stories: Story[]) { 

        const multicast$ = connectable(this.subject)

        stories
            .map(story => story.createStory(multicast$))
            .forEach(obs$ => obs$.subscribe(action => this.dispatch(action)));

        multicast$.connect();
    }

    dispatch(action: Action) {
        this.state = this.reducers.reduce((current, reducer) => reducer(current, action), this.state);

        this.subject.next(action);
    }
}

export interface Story {
    createStory(actions$: Observable<Action>) : Observable<Action>
}

export class OneSecondStory implements Story {
    createStory(actions$: Observable<Action>){
        return actions$.pipe(
            filter(action => action.type === 'StartAction'),
            mergeMap(_ => createRandomEvents(5000)),
            tap(_ => console.log('An event!')),
            map(tick => new RandomTickAction())
        );
    }
}

