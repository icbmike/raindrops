import { Feature } from "../../dooble/feature";
import { buttonUpdateReducer } from "./button.reducer";
import { buttonStory } from "./button.story";
import { buttonInputReducer } from "./buttonInput.reducer";
import { Door } from "./Door";
import { doorTriggerReducer } from "./door.reducer";
import { drawButton } from "./drawButton";
import { drawDoors } from "./drawDoor";

export const lockedDoorFeature: Feature = {
    reducers: [buttonUpdateReducer, buttonInputReducer, doorTriggerReducer],
    drawFunctions: [drawDoors, drawButton],
    stories: [buttonStory],
    initialState: {
        doors: [
            new Door(
                '#door-1',
                'Closed',
                600,
                800,
                200,
                10,
            )
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

class DrawComponent implements Component{
    readonly type = 'Draw';
}



export interface GameEntity {
    components: Component[]
}

export interface Component {
    type: string;
}

