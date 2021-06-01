import { Observable } from "rxjs";
import { filter, mergeMap, tap, map } from "rxjs/operators";
import { Action } from "../../dooble/action";
import { createRandomEvents } from "./createRandomEvents";
import { NewRaindropAction } from "./actions";

export const createRandomTicks = (ctx: CanvasRenderingContext2D) => {
    return(actions$: Observable<Action>) =>
        actions$.pipe(
            filter(action => action.type === 'StartAction'),
            mergeMap(_ => createRandomEvents(10000)),
            map(tick => new NewRaindropAction({x: Math.random() * ctx.canvas.clientWidth, y: Math.random() * ctx.canvas.clientHeight}))
    );
}
