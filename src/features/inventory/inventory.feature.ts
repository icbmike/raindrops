import { Feature } from "../../dooble/Feature";
import { Gold } from "./Gold";
import { pickupSystem } from "./pickupSystem";

export const inventoryFeature: Feature = {
    systems:[pickupSystem],
    stories: []
}

export interface Inventory {
    gold: number;
    items: any[]
}
