import { Animation } from "./Animation";


export interface ImageSource {
    name: string;
    src: string;
    process?: (name: string, img: HTMLImageElement) => Promise<Animation>;
}
