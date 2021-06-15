import { Feature } from "../../dooble/feature";
import { Button } from "./Button";
import { Door } from "./Door";

export const lockedDoorFeature: Feature = {
    reducers: [],
    stories: [],
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
            false,
        )
    ]    
};

