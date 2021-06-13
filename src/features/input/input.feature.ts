import { Feature } from "../../dooble/feature";
import { inputReducer, inputStory } from "./input";

export const inputFeature : Feature = {
    reducers: [inputReducer],
    stories: [inputStory],
    gameEntities: []
    // initialState: {
    //     input: {
    //         down: false,
    //         left: false,
    //         right: false,
    //         up: false,
    //         leftSquareBracket: false,
    //         rightSquareBracket: false,
    //         e: false
    //     }
    // }
}