import { Assets } from "../../draw/Assets";
import { DrawFunc } from "../../draw/draw";
import { Map } from './Map';
import { MapComponent } from "./MapComponent";

export const drawMap: DrawFunc<Map> = (context: CanvasRenderingContext2D, map: Map, assets: Assets) => {
    const grass = assets['grass_tile']!;

    const patt = context.createPattern(grass, 'repeat')!;

    const {accessibleAreas} = map.mapComponent;

    for (let i = 0; i < accessibleAreas.length; i++) {
        const area = accessibleAreas[i];
        
        context.beginPath();

        context.moveTo(area[0].x, area[0].y);

        for (let j = 1; j < area.length; j++) {
            const {x, y} = area[j];
            
            context.lineTo(x, y);
        }

        context.closePath();

        context.fillStyle = patt;
        context.fill();
    }
}