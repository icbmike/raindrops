import { Assets } from "./Assets";
import { loadImage } from "../draw/loadImage";
import { assets } from "./assetList";

export async function loadAssets(): Promise<Assets> {
    const images = await Promise.all(assets.map(({name, src, processAnimation, processSprite}) => {
        return loadImage(src).then(img => ({name, img, processAnimation, processSprite}))
    }));

    const animationsToProcess = images.filter(i => !!i.processAnimation);
    const spritesToProcess = images.filter(i => !!i.processSprite);
    const rest = images.filter(i => !i.processAnimation && !i.processSprite);

    const animations = await Promise.all(
        animationsToProcess.map(async ({name, img, processAnimation}) => ({name, animation: await processAnimation!(img)}))
    );

    const sprites = await Promise.all(
        spritesToProcess.flatMap(async({img, processSprite}) => await processSprite!(img))
    );
    
    return {
        images: [...rest, ...sprites.flat()].reduce((acc, {name, img}) => ({...acc, [name]: img}), {}),
        animations: animations.reduce((acc, {name, animation}) => ({...acc, [name]: animation}), {})
    };
}