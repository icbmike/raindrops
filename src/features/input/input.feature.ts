import { Feature } from "../../dooble/feature";
import { inputReducer, inputStory } from "./input";

export const inputFeature : Feature = {
    reducers: [inputReducer],
    stories: [inputStory],
    gameEntities: []
}