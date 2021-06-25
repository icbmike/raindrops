export async function loadImage(url: string): Promise<HTMLImageElement> {
    const image = new Image();

    return new Promise(resolve => {
        image.onload = () => {
            resolve(image);
        }

        image.src = url;
    });
}