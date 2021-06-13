import { UpdateAction } from "../../dooble/action";
import { on } from "../../dooble/reducer";
import { NewRaindropAction } from "./actions";

import { World } from "../worldstate";

export interface Raindrop {
    x: number;
    y: number;
    radius: number;
    r: number;
    g: number;
    b: number;
}

// export const raindropUpdateReducer = 
//     on('UpdateAction', (current: World, action: UpdateAction) => 
//         {
//             return ({
//                 ...current,
//                 raindrops: current.raindrops.map(raindrop => ({
//                     ...raindrop,
//                     radius: raindrop.radius + 0.5 * action.payload.delta,
//                 })).filter(raindrop => raindrop.radius <= 3000),
//             });
//         }
//     );

// export const raindropTickReducer = 
//     on('RandomTickAction', (current: World, action: NewRaindropAction) => {
//         const { payload: {x, y} } = action;
        
//         const r = Math.floor(Math.random() * 127 + 127);
//         const g = Math.floor(Math.random() * 127 + 127);
//         const b = Math.floor(Math.random() * 127 + 127);

//         return {
//             ...current,
//             raindrops: [ ...current.raindrops, {radius: 0, x, y, r, g, b} ],
//         };
//     });