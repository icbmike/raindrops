import { range } from "../util/range";

export async function processWaterSprite(name: string, img: HTMLImageElement): Promise<{name: string, img:CanvasImageSource}[]> {
    return Promise.all(
        range(8).map(frameNumber => 
            createImageBitmap(img, frameNumber * 32, 4 * 32, 32, 32)
                .then(bm => ({name: `${name}_frame${frameNumber}`, img: bm}))
        )
    );
}