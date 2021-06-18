import { Feature } from "../../dooble/feature";
import { Button } from "./Button";
import { InteractiveSystem } from "./button.reducer";
import { triggerSourceStory, triggerStory } from "./button.story";
import { Door } from "./Door";

export const lockedDoorFeature: Feature = {
    reducers: [InteractiveSystem],
    stories: [triggerSourceStory, triggerStory],
    gameEntities: [
        new Door(
            '#door-1',
            'Closed',
            600,
            800,
            200,
            10,
        ),
        new Button(
            '#door-1',
            1300,
            400,
            false,
        )
    ]    
};

