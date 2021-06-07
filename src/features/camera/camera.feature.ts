import { Feature } from "../../dooble/feature";
import { cameraUpdateReducer, cameraZoomReducer } from "./camera-reducers";

export const cameraFeature: Feature = {
    drawFunctions: [],
    reducers: [cameraZoomReducer, cameraUpdateReducer],
    stories: [],
    initialState: {
        camera: {
            x: 0,
            y: 0,
            zoom: 1
        },
    }
}