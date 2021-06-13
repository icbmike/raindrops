import { Feature } from "../../dooble/feature";
import { drawRaindrops } from "./draw";
import { raindropTickReducer, raindropUpdateReducer } from "./raindrop";
import { createRandomTicks } from "./randomticks.story";

export const createRaindropsFeature = (canvasContext: CanvasRenderingContext2D): Feature => ({
    reducers: [raindropUpdateReducer, raindropTickReducer],
    stories: [createRandomTicks(canvasContext)],
    gameEntities: []
})