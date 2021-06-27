import { repeat } from "rxjs/operators";
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
        const p1 = area[i];
        const p2 = area[(i + 1) % area.length];

        const prevIndex = (i - 1) % area.length + (i == 0 ? area.length : 0);

        const p3 = area[prevIndex];
        const diff = subtract(p2, p1);
        
        // assume clockwise
        if(diff.y == 0 && diff.x > 0){
            context.fillStyle = waterBankTopPattern;
            context.fillRect(p1.x + 16, p1.y, diff.x - 32, 16);
        }
        else if(diff.x == 0 && diff.y > 0){
            context.fillStyle = waterBankRightPattern;
            context.fillRect(p1.x - 16, p1.y + 16, 16, diff.y - 32);
        }
        else if(diff.y == 0 && diff.x < 0){
            context.fillStyle = waterBankBottomPattern;
            context.fillRect(p2.x + 16, p2.y - 16, diff.x * -1 - 32, 16);
        }
        else if(diff.x == 0 && diff.y < 0){
            context.fillStyle = waterBankLeftPattern;
            context.fillRect(p2.x, p2.y + 16, 16, diff.y * -1 - 32);
        }
 
        const diffP3 = subtract(p1, p3);
        if(diffP3.x > 0 && diff.y > 0){
            context.drawImage(waterBankTopRight, p1.x - 16, p1.y);
        }
        else if(diffP3.y > 0 && diff.x < 0){
            context.drawImage(waterBankBottomRight, p1.x - 16, p1.y - 16);
        }
        else if(diffP3.x < 0 && diff.y < 0){
            context.drawImage(waterBankBottomLeft, p1.x, p1.y - 16);
        }
        else if(diffP3.y < 0 && diff.x > 0){
            context.drawImage(waterBankTopLeft, p1.x, p1.y);
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