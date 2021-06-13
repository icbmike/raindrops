import { EMPTY, of } from "rxjs";
import { filter, map, mergeMap, withLatestFrom } from "rxjs/operators";
import { Story } from "../../dooble/story";
import { InputAction } from "../input/input";
import { TriggerAction } from "../trigger/Trigger";
import { World } from "../worldstate";

// export const buttonStory : Story<World> = (action$, state$) => {
//     return action$.pipe(
//         filter(a => a.type == 'InputAction'),
//         map(a => a as InputAction),
//         filter(a => a.payload.e),
//         withLatestFrom(state$),
//         mergeMap(([_, state]) => {
//             const interactiveButton = state.buttons.find(b => b.interactive)!
//             if(interactiveButton){
//                 return of(new TriggerAction({code: interactiveButton.emitCode}));
//             }

//             return EMPTY;
//         })
//     )
// }
