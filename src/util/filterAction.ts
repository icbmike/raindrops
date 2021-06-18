import { Observable } from "rxjs";
import { filter, map } from "rxjs/operators";
import { Action } from "../dooble/action";

export const filterAction = <TAction extends Action>(actionType: string) =>
    (action$: Observable<Action>) => action$.pipe(
        filter(a => a.type === actionType),
        map(a => a as TAction)
    );