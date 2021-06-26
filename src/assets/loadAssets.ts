import { Assets } from "./Assets";
import { loadImage } from "../draw/loadImage";
import { assets } from "./assetList";
import { partition } from "../util/partition";
import { Animation } from './Animation';

export async function loadAssets(): Promise<Assets> {
    const images = await Promise.all(assets.map(({name, src, process}) => {
        return loadImage(src).then(img => ({name, img, process}))
    }));

    const [xs, y] = partition(images, i => !!i.process);

    const animations = await Promise.all(
        xs.map(async ({name, img, process}) => ({name, animation: await process!(img)}))
    );

    return {
        images: y.reduce((acc, {name, img}) => ({...acc, [name]: img}), {}),
        animations: animations.reduce((acc, {name, animation}) => ({...acc, [name]: animation}), {})
    };
}