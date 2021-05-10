import { Action } from "./action";
import { Observable } from "rxjs";

export interface Story {
    (actions$: Observable<Action>): Observable<Action>;
}
