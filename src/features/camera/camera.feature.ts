import { Feature } from "../../dooble/Feature";
import { cameraUpdateSystem, cameraZoomSystem } from "./camera-reducers";

export const cameraFeature: Feature = {
    systems: [cameraZoomSystem, cameraUpdateSystem],
    stories: []
}