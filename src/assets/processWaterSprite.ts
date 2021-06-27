import { range } from "../util/range";
import { Animation } from "./Animation";

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
    return [
        { name: 'water_bank_right', img: await createImageBitmap(img, 0, 32, 16, 32) },
        { name: 'water_bank_left', img: await createImageBitmap(img, 16, 32, 16, 32) },
        { name: 'water_bank_bottom', img: await createImageBitmap(img, 0, 64, 32, 16) },
        { name: 'water_bank_top', img: await createImageBitmap(img, 0, 80, 32, 16) },

        { name: 'water_bank_bottom_right', img: await createImageBitmap(img, 0, 96, 16, 16) },
        { name: 'water_bank_bottom_left', img: await createImageBitmap(img, 16, 96, 16, 16) },
        { name: 'water_bank_top_left', img: await createImageBitmap(img, 16, 112, 16, 16) },
        { name: 'water_bank_top_right', img: await createImageBitmap(img, 0, 112, 16, 16) },
    ];
}