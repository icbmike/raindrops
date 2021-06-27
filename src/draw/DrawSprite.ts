import { Assets } from "../assets/Assets";
import { DrawComponent } from "./DrawComponent";

export class DrawSpriteComponent extends DrawComponent<any> {
    constructor(
        spriteName: string,
        x: number,
        y: number
    ){
        super((context: CanvasRenderingContext2D, _: any, assets: Assets) =>{
            const image = assets.images[spriteName]!;

            context.drawImage(image, x, y);
        })
    }
}