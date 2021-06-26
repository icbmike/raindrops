import { Feature } from "../../dooble/Feature";
import { cameraUpdateSystem, cameraZoomSystem } from "./camera-systems";

export const cameraFeature: Feature = {
    systems: [cameraZoomSystem, cameraUpdateSystem],
    stories: []
}