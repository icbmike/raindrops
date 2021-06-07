import { Feature } from "../../dooble/feature";
import { drawRect } from "./drawRect";
import { rectReducer } from "./update.reducer";

export const playerFeature: Feature = {
    drawFunctions: [drawRect],
    reducers: [rectReducer],
    stories: [],
    initialState: {
        player: {
            x: 150,
            y: 150,
            height: 50,
            width: 50
        }
    }
}