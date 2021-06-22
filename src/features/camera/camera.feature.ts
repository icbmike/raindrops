import { Feature } from "../../dooble/Feature";
import { cameraUpdateReducer, cameraZoomReducer } from "./camera-reducers";

export const cameraFeature: Feature = {
    reducers: [cameraZoomReducer, cameraUpdateReducer],
    stories: []
}