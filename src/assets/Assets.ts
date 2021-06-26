import { Dictionary } from "../util/Dictionary";
import { Animation } from "./Animation";

export interface Assets {
    images: Dictionary<CanvasImageSource>
    animations: Dictionary<Animation>
}