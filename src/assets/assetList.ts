import { ImageSource } from "./ImageSource";
import { processWaterAnimation, processWaterSprite } from "./processWaterSprite";

export const assets: ImageSource[] = [
    { name: 'grass_tile', src: './assets/grass_tile.png' },
    { name: 'water', src: './assets/water_sprite.png', processAnimation: processWaterAnimation, processSprite: processWaterSprite }
];
