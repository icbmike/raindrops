import { processSprite } from "./processSprite";
import { SpriteMapping } from "./SpriteMapping";

export async function processSpriteSheet(img: HTMLImageElement): Promise<{ name: string, img: CanvasImageSource }[]> {
    const mappings: SpriteMapping[] = [
        { name: 'tree_light', x: 0, y: 32, width: 64, height: 64 },
        { name: 'tree_dark', x: 64, y: 32, width: 64, height: 64 },
        { name: 'tree_orange', x: 128, y: 32, width: 64, height: 64 },
    ];

    return processSprite(img, mappings);
}