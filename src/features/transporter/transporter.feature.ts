import { Feature } from "../../dooble/feature";
import { Down, Left, Up } from "../../physics/vector";
import { drawTransporter } from "./drawTransporter";
import { transporterUpdateReducer } from "./transporter.reducer";

export const transporterFeature: Feature = {
    reducers: [transporterUpdateReducer],
    stories: [],
    gameEntities: [],
    // initialState: {
    //     transporters: [
    //         // {
    //         //     t1: {
    //         //         x: 300,
    //         //         y: 500,
    //         //         radius: 50,
    //         //         exitDirection: Up,
    //         //         transportProgressPercent: 0
    //         //     },
    //         //     t2: {
    //         //         x: 1900,
    //         //         y: 300,
    //         //         radius: 50,
    //         //         exitDirection: Left,
    //         //         transportProgressPercent: 0
    //         //     },
    //         //     state: 'Idle'
    //         // }
    //     ]
    // }
}