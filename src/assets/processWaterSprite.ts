import { range } from "../util/range";
import { Animation } from "./Animation";

export async function processWaterSprite(img: HTMLImageElement): Promise<Animation> {
    const frames = range(8).map(frameNumber => 
        createImageBitmap(img, frameNumber * 32, 4 * 32, 32, 32)
    );

    return Promise.all(frames).then(f => ({
        numberOfFrames: 8,
        frames: f
    }));
}