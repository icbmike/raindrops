import { Assets } from "./draw/Assets";
import { loadImage } from "./draw/loadImage";

const assetUrls = [
    { name: 'grass_tile', src: './assets/grass_tile.png' },
    { name: 'water', src: './assets/[A]Water2_pipo.png' }
];

export async function loadAssets(): Promise<Assets> {
    const images = await Promise.all(assetUrls.map(({name, src}) => {
        return loadImage(src).then(img => ({name, img}))
    }));

    return images.reduce((acc, {name, img}) => ({...acc, [name]: img}), {});
}