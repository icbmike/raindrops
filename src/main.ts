import { Feature } from "./dooble/Feature";
import { setupCanvas } from "./draw/canvas";
import { cameraFeature } from "./features/camera/camera.feature";
import { inputFeature } from "./features/input/input.feature";
import { inventoryFeature } from "./features/inventory/inventory.feature";
import { mapFeature } from "./features/map/map.feature";
import { Player } from "./features/player/Player";
import { playerFeature } from "./features/player/player.feature";
import { transporterFeature } from "./features/transporter/transporter.feature";
import { triggerFeature } from "./features/trigger/trigger.feature";
import { World } from "./features/worldstate";
import { loadLevel } from "./level/loadLevel";
import { loadAssets } from "./loadAssets";
import { loop } from "./loop";

var [_, context] = setupCanvas(document.getElementById('canvas') as HTMLCanvasElement);

const features: Feature[] = [
    mapFeature,
    cameraFeature,
    inputFeature,
    triggerFeature,
    transporterFeature,
    playerFeature,
    inventoryFeature,
];

const world: World = {
    canvasContext: context,
    gameEntities: loadLevel().gameEntities,
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

loadAssets().then(assets => {
    loop(context, features, world, assets);
});
