import { Feature } from "../../dooble/feature";
import { buttonUpdateReducer } from "./button.reducer";
import { buttonStory } from "./button.story";
import { buttonInputReducer } from "./buttonInput.reducer";
import { doorReducer } from "./door.reducer";
import { drawButton } from "./drawButton";
import { drawDoors } from "./drawDoor";

export const lockedDoorFeature: Feature = {
    reducers: [buttonUpdateReducer, buttonInputReducer, doorReducer],
    drawFunctions: [drawDoors, drawButton],
    stories: [buttonStory],
    initialState: {
        doors: [
            {
                x: 500,
                y: 800,
                height: 10,
                width: 200,
                state: 'Closed',
                code: '#door-1'
            }
        ],
        buttons:[{
            x: 1300,
            y: 400,
            on: false,
            interactive: false,
            emitCode: '#door-1'
        }]
    }    
};