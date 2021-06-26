import { Assets } from "./Assets";
import { loadImage } from "../draw/loadImage";
import { assets } from "./assetList";

export async function loadAssets(): Promise<Assets> {
    const images = await Promise.all(assets.map(({name, src}) => {
        return loadImage(src).then(img => ({name, img}))
    }));

    return {
        images: images.reduce((acc, {name, img}) => ({...acc, [name]: img}), {}),
        animations: {}
    };
}