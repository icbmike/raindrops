import { Feature } from "../../dooble/feature";
import { cameraUpdateReducer, cameraZoomReducer } from "./camera-reducers";

export const cameraFeature: Feature = {
    reducers: [cameraZoomReducer, cameraUpdateReducer],
    stories: [],
    gameEntities: []
}