import { fromEvent, merge } from "rxjs";
import { map, tap } from "rxjs/operators";
import { Action } from "../../dooble/action";
import { on } from "../../dooble/reducer";
import { Story } from "../../dooble/story";
import { WorldState } from "../worldstate";

export interface InputState {
    up:boolean;
    down:boolean;
    left:boolean;
    right:boolean;
    leftSquareBracket:boolean;
    rightSquareBracket:boolean;
    e:boolean;
}

export class InputAction implements Action {
    readonly type = 'InputAction';

    constructor(public payload: InputState) {}
}

const keys: {
    [key: string] : boolean
} = {};

const input$ =
    merge(
        fromEvent(window, 'keyup')
            .pipe(map((e: KeyboardEvent): [string, KeyboardEvent] => ['keyup', e])),
        fromEvent(window, 'keydown')
            .pipe(map((e: KeyboardEvent): [string, KeyboardEvent] => ['keydown', e]))
        
    ).pipe(
        tap(([eventName, e]) => {
            if(eventName == 'keydown'){
                keys[e.key] = true;
            }
            if(eventName == 'keyup'){
                keys[e.key] = false
            }
        }),
        map(_ => new InputAction({
            up: keys['ArrowUp'],
            down: keys['ArrowDown'],
            left: keys['ArrowLeft'],
            right: keys['ArrowRight'],
            leftSquareBracket: keys['['],
            rightSquareBracket: keys[']'],
            e: keys['e']
        }))
    );

export const inputStory: Story = (action$) => input$;

export const inputReducer = on('InputAction', (current: WorldState, action: InputAction) => {
    return {
        ...current,
        input: {
            ...action.payload
        }
    }
});
