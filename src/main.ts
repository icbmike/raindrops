import { Feature } from "./dooble/feature";
import { setupCanvas } from "./draw/canvas";
import { cameraFeature } from "./features/camera/camera.feature";
import { fpsFeature } from "./features/fps/fps.feature";
import { inputFeature } from "./features/input/input.feature";
import { lockedDoorFeature } from "./features/locked-door/locked-door.feature";
import { playerFeature } from "./features/player/player.feature";
import { createRaindropsFeature } from "./features/raindrops/raindrops.feature";
import { transporterFeature } from "./features/transporter/transporter.feature";
import { wallsFeature } from "./features/wall/walls.feature";
import { loop } from "./loop";

var [_, context] = setupCanvas(document.getElementById('canvas') as HTMLCanvasElement);

console.log('starting loop');

const features: Feature[] = [
    //createRaindropsFeature(context),
    cameraFeature,
    //inputFeature,
    wallsFeature,
    //lockedDoorFeature,
    //transporterFeature,
    playerFeature,
    //fpsFeature,
]

loop(context, features);