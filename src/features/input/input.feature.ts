import { Feature } from "../../dooble/Feature";
import { inputReducer, inputStory } from "./input";

export const inputFeature : Feature = {
    reducers: [inputReducer],
    stories: [inputStory]
}