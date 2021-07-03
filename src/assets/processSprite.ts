import { SpriteMapping } from "./SpriteMapping";

export function processSprite(img: HTMLImageElement, mappings: SpriteMapping[]) {
    return Promise.all(mappings.map(async ({name, x, y, width, height}) => 
        ({ name, img: await createImageBitmap(img, x, y, width, height)})
    ));
}