import { ImageSource } from "./ImageSource";
import { processWaterSprite } from "./processWaterSprite";

export const assets: ImageSource[] = [
    { name: 'grass_tile', src: './assets/grass_tile.png' },
    { name: 'water', src: './assets/water_sprite.png', process: processWaterSprite }
];
