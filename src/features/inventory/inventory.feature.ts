import { Feature } from "../../dooble/Feature";
import { Gold } from "./Gold";
import { pickupSystem } from "./pickupSystem";

export const inventoryFeature: Feature = {
    reducers:[pickupSystem],
    stories: []
}

export interface Inventory {
    gold: number;
    items: any[]
}
