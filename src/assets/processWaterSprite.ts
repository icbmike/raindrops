import { range } from "../util/range";
import { Animation } from "./Animation";
import { processSprite } from "./processSprite";
import { SpriteMapping } from "./SpriteMapping";

export async function processWaterAnimation(img: HTMLImageElement): Promise<Animation> {
    const frames = range(8).map(frameNumber =>
        createImageBitmap(img, frameNumber * 32, 4 * 32, 32, 32)
    );

    return Promise.all(frames).then(f => ({
        numberOfFrames: 8,
        frames: f
    }));
}

export async function processWaterSprite(img: HTMLImageElement): Promise<{ name: string, img: CanvasImageSource }[]> {
    const mappings: SpriteMapping[] = [
        { name: 'water_bank_left', x: 16, y: 32, width: 16, height: 32 },
        { name: 'water_bank_bottom', x: 0, y: 64, width: 32, height: 16 },
        { name: 'water_bank_top', x: 0, y: 80, width: 32, height: 16 },
        { name: 'water_bank_right', x: 0, y: 32, width: 16, height: 32 },


        { name: 'water_bank_bottom_right_convex', x: 0, y: 96, width: 16, height: 16 },
        { name: 'water_bank_bottom_left_convex', x: 16, y: 96, width: 16, height: 16 },
        { name: 'water_bank_top_left_convex', x: 16, y: 112, width: 16, height: 16 },
        { name: 'water_bank_top_right_convex', x: 0, y: 112, width: 16, height: 16 },

        { name: 'water_bank_bottom_right_concave', x: 16, y: 16, width: 16, height: 16 },
        { name: 'water_bank_bottom_left_concave', x: 0, y: 16, width: 16, height: 16 },
        { name: 'water_bank_top_left_concave', x: 0, y: 0, width: 16, height: 16 },
        { name: 'water_bank_top_right_concave', x: 16, y: 0, width: 16, height: 16 },
    ];

    return processSprite(img, mappings);
}
