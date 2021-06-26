import { Assets } from "../../assets/Assets";
import { DrawFunc } from "../../draw/draw";
import { Map } from './Map';

export const drawMap: DrawFunc<Map> = (context: CanvasRenderingContext2D, map: Map, assets: Assets) => {
    const grass = assets.images['grass_tile']!;
    const water = assets.animations['water']!;

    const grassPattern = context.createPattern(grass, 'repeat')!;
    const waterPattern = context.createPattern(water.frames[0], 'repeat')!;

    const { accessibleAreas, bounds } = map.mapComponent;

    context.fillStyle = waterPattern;
    context.fillRect(bounds.x, bounds.y, bounds.width, bounds.height);

    context.fillStyle = grassPattern;

    for (let i = 0; i < accessibleAreas.length; i++) {
        const area = accessibleAreas[i];

        context.beginPath();

        context.moveTo(area[0].x, area[0].y);

        for (let j = 1; j < area.length; j++) {
            const { x, y } = area[j];

            context.lineTo(x, y);
        }

        context.closePath();

        context.fill();
    }
}