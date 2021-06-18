import { from } from "rxjs";
import { filter, ignoreElements, mergeMap, tap, withLatestFrom } from "rxjs/operators";
import { findComponents } from "../../dooble/GameEntity";
import { Story } from "../../dooble/story";
import { filterAction } from "../../util/filterAction";
import { InputAction } from "../input/input";
import { TriggerComponent } from "./TriggerComponent";
import { TriggerAction } from "./TriggerAction";
import { TriggerSourceComponent } from "./TriggerSourceComponent";
import { World } from "../worldstate";
import { InteractiveComponent } from "./InteractiveComponent";

export const triggerSourceStory : Story<World> = (action$, world$) => 
    action$.pipe(
        filterAction<InputAction>('InputAction'),
        filter(a => a.payload.e),
        withLatestFrom(world$),
        mergeMap(([_, world]) => {
            const triggerActions = findComponents<InteractiveComponent, TriggerSourceComponent>(world.gameEntities, InteractiveComponent.Type, TriggerSourceComponent.Type)
                .filter(([ic, _]) => ic.isInteractive)
                .map(([_, {code}]) => new TriggerAction({code}))

            return from(triggerActions)
        })
    );

export const triggerStory: Story<World> = (action$, world$) =>
    action$.pipe(
        filterAction<TriggerAction>('TriggerAction'),
        withLatestFrom(world$),
        tap<[TriggerAction, World]>(([action, world]) => {
            findComponents<TriggerComponent>(world.gameEntities, TriggerComponent.Type)
                .filter(tc => tc.code === action.payload.code)
                .forEach(tc => tc.fn());
        }),
        ignoreElements()
    )
