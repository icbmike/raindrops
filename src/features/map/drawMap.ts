import { Assets } from "../../assets/Assets";
import { DrawFunc } from "../../draw/draw";
import { Rect } from "../../physics/Rect";
import { Down, Left, Right, subtract, Up } from "../../physics/vector";
import { Area, Map } from './Map';
import { lineLength } from '../../physics/Line';

let lastFrame = Date.now();

function drawWater(context: CanvasRenderingContext2D, assets: Assets, bounds: Rect) {
    const water = assets.animations['water']!;

    const now = Date.now();
    const deltaSeconds = (now - lastFrame) / 1000;
    const frame = Math.floor(deltaSeconds * 4) % 8;

    const waterPattern = context.createPattern(water.frames[frame], 'repeat')!;
    context.fillStyle = waterPattern;

    context.fillRect(bounds.x, bounds.y, bounds.width, bounds.height);
}

function x(){
    
}

function drawArea(
    context: CanvasRenderingContext2D,
    grassPattern: CanvasPattern,
    waterBankTop: CanvasImageSource,
    waterBankRight: CanvasImageSource,
    waterBankBottom: CanvasImageSource,
    waterBankLeft: CanvasImageSource,
    waterBankTopRightConvex: CanvasImageSource,
    waterBankBottomRightConvex: CanvasImageSource,
    waterBankBottomLeftConvex: CanvasImageSource,
    waterBankTopLeftConvex: CanvasImageSource,
    waterBankTopRightConcave: CanvasImageSource,
    waterBankBottomRightConcave: CanvasImageSource,
    waterBankBottomLeftConcave: CanvasImageSource,
    waterBankTopLeftConcave: CanvasImageSource,
    area: Area
) {
    // Draw grass
    context.beginPath();

    context.moveTo(area[0].x1, area[0].y1);

    for (let i = 1; i < area.length; i++) {
        const { x1, y1 } = area[i];

        context.lineTo(x1, y1);
    }

    context.closePath();
    context.fillStyle = grassPattern;
    context.fill();

    const waterBankTopPattern = context.createPattern(waterBankTop, 'repeat')!;
    const waterBankRightPattern = context.createPattern(waterBankRight, 'repeat')!;
    const waterBankBottomPattern = context.createPattern(waterBankBottom, 'repeat')!;
    const waterBankLeftPattern = context.createPattern(waterBankLeft, 'repeat')!;

    // Draw waterbank
    for (let i = 0; i < area.length; i++) {
        const l = area[i];
        const lNext = area[(i + 1) % area.length];
        const lLength = lineLength(l);
        const prevIndex = (i - 1) % area.length + (i == 0 ? area.length : 0);

        const pPrev = area[prevIndex];

        if (l.normal == Up) {
            context.fillStyle = waterBankTopPattern;
            context.fillRect(l.x1 + 16, l.y1, lLength - 32, 16);
        }
        else if (l.normal == Right) {
            context.fillStyle = waterBankRightPattern;
            context.fillRect(l.x1 - 16, l.y1 + 16, 16, lLength - 32);
        }
        else if (l.normal == Down) {
            context.fillStyle = waterBankBottomPattern;
            context.fillRect(l.x1 + 16, l.y1 - 16, lLength - 32, 16);
        }
        else if (l.normal == Left) {
            context.fillStyle = waterBankLeftPattern;
            context.fillRect(l.x1, l.y1 + 16, 16, lLength- 32);
        }

        // const diffPrev = subtract(p, pPrev);
        // if (diffPrev.x > 0 && diffNext.y > 0) {
        //     context.drawImage(waterBankTopRightConvex, p.x - 16, p.y);
        // }
        // else if ((diffPrev.y > 0 && diffNext.x < 0)) {
        //     context.drawImage(waterBankBottomRightConvex, p.x - 16, p.y - 16);
        // }
        // else if (diffPrev.x < 0 && diffNext.y < 0) {
        //     context.drawImage(waterBankBottomLeftConvex, p.x, p.y - 16);
        // }
        // else if (diffPrev.y < 0 && diffNext.x > 0) {
        //     context.drawImage(waterBankTopLeftConvex, p.x, p.y);
        // } 
        // else if (diffPrev.x > 0 && diffNext.y < 0) {
        //     context.drawImage(waterBankBottomRightConcave, p.x - 16, p.y );
        // } 
        // else if (diffPrev.x < 0 && diffNext.y > 0) {
        //     context.drawImage(waterBankTopLeftConcave, p.x - 16 , p.y - 16 );
        // } 
        // else if (diffPrev.y > 0 && diffNext.x > 0) {
        //     context.drawImage(waterBankBottomLeftConcave, p.x - 16 , p.y);
        // }
        // else if (diffPrev.y < 0 && diffNext.x < 0) {
        //     context.drawImage(waterBankTopRightConcave, p.x , p.y - 16);
        // }
    }
}

function drawAreas(context: CanvasRenderingContext2D, assets: Assets, areas: Area[]) {
    const grass = assets.images['grass_tile']!;
    const waterBankTop = assets.images['water_bank_top']!;
    const waterBankRight = assets.images['water_bank_right']!;
    const waterBankBottom = assets.images['water_bank_bottom']!;
    const waterBankLeft = assets.images['water_bank_left']!;

    const waterBankTopRightConvex = assets.images['water_bank_top_right_convex']!;
    const waterBankBottomRightConvex = assets.images['water_bank_bottom_right_convex']!;
    const waterBankBottomLeftConvex = assets.images['water_bank_bottom_left_convex']!;
    const waterBankTopLeftConvex = assets.images['water_bank_top_left_convex']!;

    const waterBankTopRightConcave = assets.images['water_bank_top_right_concave']!;
    const waterBankBottomRightConcave = assets.images['water_bank_bottom_right_concave']!;
    const waterBankBottomLeftConcave = assets.images['water_bank_bottom_left_concave']!;
    const waterBankTopLeftConcave = assets.images['water_bank_top_left_concave']!;

    const grassPattern = context.createPattern(grass, 'repeat')!;

    for (let i = 0; i < areas.length; i++) {
        const area = areas[i];
        drawArea(
            context,
            grassPattern,
            waterBankTop,
            waterBankRight,
            waterBankBottom,
            waterBankLeft,
            waterBankTopRightConvex,
            waterBankBottomRightConvex,
            waterBankBottomLeftConvex,
            waterBankTopLeftConvex,
            waterBankTopRightConcave,
            waterBankBottomRightConcave,
            waterBankBottomLeftConcave,
            waterBankTopLeftConcave,
            area
        );
    }
}

export const drawMap: DrawFunc<Map> = (context: CanvasRenderingContext2D, map: Map, assets: Assets) => {
    const { accessibleAreas, bounds } = map.mapComponent;

    drawWater(context, assets, bounds);

    drawAreas(context, assets, accessibleAreas);
}