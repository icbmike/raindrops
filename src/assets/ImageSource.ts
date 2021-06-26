import { Animation } from "./Animation";

export interface ImageSource {
    name: string;
    src: string;
    process?: (img: HTMLImageElement) => Promise<Animation>;
}
