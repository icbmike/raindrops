import { Feature } from "../../dooble/feature";
import { buttonUpdateReducer } from "./button.reducer";
import { buttonStory } from "./button.story";
import { buttonInputReducer } from "./buttonInput.reducer";
import { drawButton } from "./drawButton";
import { drawDoors } from "./drawDoor";

export const lockedDoorFeature: Feature = {
    reducers: [buttonUpdateReducer, buttonInputReducer],
    stories: [buttonStory],
    gameEntities: []
    // initialState: {
    //     // doors: [
    //     //     new Door(
    //     //         '#door-1',
    //     //         'Closed',
    //     //         600,
    //     //         800,
    //     //         200,
    //     //         10,
    //     //     )
    //     // ],
    //     // buttons:[{
    //     //     x: 1300,
    //     //     y: 400,
    //     //     on: false,
    //     //     interactive: false,
    //     //     emitCode: '#door-1'
    //     // }]
    // }    
};

