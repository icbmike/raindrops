import { Observable } from "rxjs";
import { filter, mergeMap, tap, map } from "rxjs/operators";
import { Action } from "../dooble/action";
import { createRandomEvents } from "../createRandomEvents";
import { RandomTickAction } from "./actions";

export const RandomTicks$ = (actions$: Observable<Action>) =>
    actions$.pipe(
        filter(action => action.type === 'StartAction'),
        mergeMap(_ => createRandomEvents(5000)),
        tap(_ => console.log('An event!')),
        map(tick => new RandomTickAction())
    );
