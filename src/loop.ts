import { Dooble } from "./dooble/dooble";
import { redraw } from "./draw/draw";
import { World } from "./features/worldstate";
import { StartAction, UpdateAction } from "./dooble/action";
import { Feature } from "./dooble/feature";
import { Player } from "./features/player/Player";

export const loop = (context: CanvasRenderingContext2D, features: Feature[]) => {
    const initialState: World = {
        canvasContext: context,
        gameEntities: features.flatMap(f => f.gameEntities),
        camera: {
            x: 0,
            y: 0,
            zoom: 1
        },
        player: new Player(150, 150, 25, 25),
        input: {
            down: false,
            left: false,
            right: false,
            up: false,
            leftSquareBracket: false,
            rightSquareBracket: false,
            e: false
        },
        inventory:{
            gold: 0,
            items: []
        }
    };

    const dooble = new Dooble<World>(
        initialState as any, 
        [
            ...features.flatMap(f => f.reducers)
        ], 
        [
            ...features.flatMap(f => f.stories)
        ]
    );

    let lastUpdateTime = 0;
    
    // The loop
    const rafCallback = (now: number) => {
        const delta = (now - lastUpdateTime);
        lastUpdateTime = now;

        dooble.dispatch(new UpdateAction({delta}));

        redraw(context, dooble.state);

        window.requestAnimationFrame(rafCallback);
    };

    // Start
    dooble.dispatch(new StartAction());
    window.requestAnimationFrame(rafCallback);
}