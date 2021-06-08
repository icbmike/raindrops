import { Action } from "./action";
import { Observable } from "rxjs";

export interface Story<TState> {
    (actions$: Observable<Action>, state$: Observable<TState>): Observable<Action>;
}
