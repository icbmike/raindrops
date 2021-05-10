import { on } from "../dooble/reducer";
import { NewRaindropAction, UpdateAction } from "./actions";
import { WorldState } from "./worldstate";

export interface Raindrop {
    x: number;
    y: number;
    radius: number;
}

export const raindropUpdateReducer = 
    on('UpdateAction', (current: WorldState, action: UpdateAction) => 
        ({
            ...current,
            raindrops: current.raindrops.map(raindrop => ({
                ...raindrop,
                radius: raindrop.radius + 0.5 * action.payload.delta,
                
            })),
        })
    );

export const raindropTickReducer = 
    on('RandomTickAction', (current: WorldState, action: NewRaindropAction) => {
        const { payload: {x, y} } = action;
    
        return {
            ...current,
            raindrops: [ ...current.raindrops, {radius: 0, x, y} ],
        };
    });