import { Feature } from "../../dooble/Feature";
import { cameraUpdateSystem } from "./camera-systems";
import { cameraZoomSystem } from "./cameraZoomSystem";

export const cameraFeature: Feature = {
    systems: [cameraZoomSystem, cameraUpdateSystem],
    stories: []
}