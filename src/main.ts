import { Feature } from "./dooble/Feature";
import { setupCanvas } from "./draw/canvas";
import { cameraFeature } from "./features/camera/camera.feature";
import { inputFeature } from "./features/input/input.feature";
import { inventoryFeature } from "./features/inventory/inventory.feature";
import { playerFeature } from "./features/player/player.feature";
import { transporterFeature } from "./features/transporter/transporter.feature";
import { triggerFeature } from "./features/trigger/trigger.feature";
import { loadLevel } from "./level/loadLevel";
import { loop } from "./loop";

var [_, context] = setupCanvas(document.getElementById('canvas') as HTMLCanvasElement);

const features: Feature[] = [
    cameraFeature,
    inputFeature,
    triggerFeature,
    transporterFeature,
    playerFeature,
    inventoryFeature,
]

loop(context, features, loadLevel());