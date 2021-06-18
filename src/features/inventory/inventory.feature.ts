import { Feature } from "../../dooble/feature";
import { Gold } from "./Gold";
import { pickupSystem } from "./pickupSystem";

export const inventoryFeature: Feature = {
    gameEntities:[
        new Gold(550, 200, 200)
    ],
    reducers:[pickupSystem],
    stories: []
}

export interface Inventory {
    gold: number;
    items: any[]
}
