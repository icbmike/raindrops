export async function processSpriteSheet(img: HTMLImageElement): Promise<{ name: string, img: CanvasImageSource }[]> {
    const lightTreeBm = await createImageBitmap(img, 0, 32, 64, 64);
    const darkTreeBm = await createImageBitmap(img, 64, 32, 64, 64);
    const orangeTreeBm = await createImageBitmap(img, 128, 32, 64, 64);

    return [
        { name: 'tree_light', img: lightTreeBm },
        { name: 'tree_dark', img: darkTreeBm },
        { name: 'tree_orange', img: orangeTreeBm },
    ];
}