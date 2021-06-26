import { Animation } from "./Animation";

export interface ImageSource {
    name: string;
    src: string;
    processAnimation?: (img: HTMLImageElement) => Promise<Animation>;
    processSprite?: (img: HTMLImageElement) => Promise<{name: string, img: CanvasImageSource}[]>
}
