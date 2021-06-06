import { Dooble } from "./dooble/dooble";
import { redraw } from "./draw/draw";
import { WorldState } from "./features/worldstate";
import { createRandomTicks } from "./features/raindrops/randomticks.story";
import { raindropUpdateReducer, raindropTickReducer } from "./features/raindrops/raindrop";
import { StartAction, UpdateAction } from "./dooble/action";
import { rectReducer } from "./features/moving-rect/update.reducer";
import { drawRect } from "./features/moving-rect/drawRect";
import { drawRaindrops } from "./features/raindrops/draw";
import { drawFPS } from "./draw/drawFps";
import { inputReducer, inputStory } from "./input/input";
import { walls } from "./features/wall/wall";
import { drawWalls } from "./features/wall/draw";
import { cameraUpdateReducer, cameraZoomReducer } from "./draw/camera";

export const loop = (context: CanvasRenderingContext2D) => {
    const initalState: WorldState = {
        rect: {
            x: 150,
            y: 150,
            height: 50,
            width: 50
        },
        raindrops: [],
        canvasContext: context,
        input: {
            down: false,
            left: false,
            right: false,
            up: false,
            leftSquareBracket: false,
            rightSquareBracket: false
        },
        camera: {
            x: 0,
            y: 0,
            zoom: 1
        },
        walls
    }
     
    const dooble = new Dooble<WorldState>(
        initalState, 
        [
            rectReducer, 
            raindropUpdateReducer, 
            raindropTickReducer,
            inputReducer,
            cameraZoomReducer,
            cameraUpdateReducer
        ], 
        [
            createRandomTicks(context),
            inputStory
        ]
    );

    let lastUpdateTime = 0;
    
    // The loop
    const rafCallback = (now: number) => {
        const delta = (now - lastUpdateTime);
        lastUpdateTime = now;

        dooble.dispatch(new UpdateAction({delta}));

        redraw(context, dooble.state, [
            drawRaindrops,
            drawRect,
            drawWalls,
            drawFPS
        ]);

        window.requestAnimationFrame(rafCallback);
    };

    // Start
    dooble.dispatch(new StartAction());
    window.requestAnimationFrame(rafCallback);
}