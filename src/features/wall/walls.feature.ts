import { Feature } from "../../dooble/feature";
import { drawWalls } from "./draw";
import { initialWalls } from "./wall";

export const wallsFeature: Feature = {
    drawFunctions: [drawWalls],
    reducers: [],
    stories: [],
    initialState: {
        walls: initialWalls
    }
}