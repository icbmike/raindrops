import { Assets } from "../../assets/Assets";
import { DrawFunc } from "../../draw/draw";
import { Rect } from "../../physics/Rect";
import { subtract } from "../../physics/vector";
import { Area, Map } from './Map';

let lastFrame = Date.now();

function drawWater(context: CanvasRenderingContext2D, assets: Assets, bounds: Rect){
    const water = assets.animations['water']!;
    
    const now = Date.now();
    const deltaSeconds = (now - lastFrame) / 1000;
    const frame = Math.floor(deltaSeconds * 4) % 8;
    
    const waterPattern = context.createPattern(water.frames[frame], 'repeat')!;
    context.fillStyle = waterPattern;

    context.fillRect(bounds.x, bounds.y, bounds.width, bounds.height);
}

function drawArea(
    context: CanvasRenderingContext2D, 
    grassPattern: CanvasPattern, 
    waterBankTop: CanvasImageSource, 
    waterBankRight: CanvasImageSource, 
    waterBankBottom: CanvasImageSource, 
    waterBankLeft: CanvasImageSource,
    waterBankTopRight: CanvasImageSource,
    waterBankBottomRight: CanvasImageSource,
    waterBankBottomLeft: CanvasImageSource,
    waterBankTopLeft: CanvasImageSource,
    area: Area
){
    // Draw grass
    context.beginPath();

    context.moveTo(area[0].x, area[0].y);

    for (let i = 1; i < area.length; i++) {
        const { x, y } = area[i];

        context.lineTo(x, y);
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
        const p = area[i];
        const pNext = area[(i + 1) % area.length];

        const prevIndex = (i - 1) % area.length + (i == 0 ? area.length : 0);

        const pPrev = area[prevIndex];
        const diffNext = subtract(pNext, p);
        
        // assume clockwise
        if(diffNext.y == 0 && diffNext.x > 0){
            context.fillStyle = waterBankTopPattern;
            context.fillRect(p.x, p.y, diffNext.x, 16);
        }
        else if(diffNext.x == 0 && diffNext.y > 0){
            context.fillStyle = waterBankRightPattern;
            context.fillRect(p.x - 16, p.y, 16, diffNext.y - 16);
        }
        else if(diffNext.y == 0 && diffNext.x < 0){
            context.fillStyle = waterBankBottomPattern;
            context.fillRect(pNext.x, pNext.y - 16, diffNext.x * -1 - 16, 16);
        }
        else if(diffNext.x == 0 && diffNext.y < 0){
            context.fillStyle = waterBankLeftPattern;
            context.fillRect(pNext.x, pNext.y + 16, 16, diffNext.y * -1 - 16);
        }
 
        const diffPrev = subtract(p, pPrev);
        if(diffPrev.x > 0 && diffNext.y > 0){
            context.drawImage(waterBankTopRight, p.x - 16, p.y);
        }
        else if((diffPrev.y > 0 && diffNext.x < 0) || (diffPrev.x > 0 && diffNext.y < 0)){
            context.drawImage(waterBankBottomRight, p.x - 16, p.y - 16);
        }
        else if(diffPrev.x < 0 && diffNext.y < 0){
            context.drawImage(waterBankBottomLeft, p.x, p.y - 16);
        }
        else if(diffPrev.y < 0 && diffNext.x > 0){
            context.drawImage(waterBankTopLeft, p.x, p.y);
        }
    }
}

function drawAreas(context: CanvasRenderingContext2D, assets: Assets, areas: Area[]){
    const grass = assets.images['grass_tile']!;
    const waterBankTop = assets.images['water_bank_top']!;
    const waterBankRight = assets.images['water_bank_right']!;
    const waterBankBottom = assets.images['water_bank_bottom']!;
    const waterBankLeft = assets.images['water_bank_left']!;

    const waterBankTopRight = assets.images['water_bank_top_right']!;
    const waterBankBottomRight = assets.images['water_bank_bottom_right']!;
    const waterBankBottomLeft = assets.images['water_bank_bottom_left']!;
    const waterBankTopLeft = assets.images['water_bank_top_left']!;

    const grassPattern = context.createPattern(grass,'repeat')!;

    for (let i = 0; i < areas.length; i++) {
        const area = areas[i];
        drawArea(
            context, 
            grassPattern, 
            waterBankTop, 
            waterBankRight, 
            waterBankBottom, 
            waterBankLeft, 
            waterBankTopRight,
            waterBankBottomRight,
            waterBankBottomLeft,
            waterBankTopLeft,
            area
        );
    }    
}

export const drawMap: DrawFunc<Map> = (context: CanvasRenderingContext2D, map: Map, assets: Assets) => {
    const { accessibleAreas, bounds } = map.mapComponent;

    drawWater(context, assets, bounds);

    drawAreas(context, assets, accessibleAreas);
}