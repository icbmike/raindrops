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
    const waterBankTopPattern = context.createPattern(waterBankTop, 'repeat')!;
    const waterBankRightPattern = context.createPattern(waterBankRight, 'repeat')!;
    const waterBankBottomPattern = context.createPattern(waterBankBottom, 'repeat')!;
    const waterBankLeftPattern = context.createPattern(waterBankLeft, 'repeat')!;

    function waterBankDrawConfiguration(i: number){
        const l = area[i];
        const lNext = area[(i + 1) % area.length];
        
        const prevIndex = (i - 1) % area.length + (i == 0 ? area.length : 0);
        const lPrev = area[prevIndex];
    
        const lLength = lineLength(l);
    
        if(lPrev.normal == Left && l.normal == Up && lNext.normal == Left){
            return {
                cornerImg:waterBankTopLeftConvex,
                bankImg:waterBankTopPattern,
                cornerPosX: l.x1 + 0,
                cornerPosY: l.y1 + 0,
                bankPosX: l.x1 + 16,
                bankPosY: l.y1 + 0,
                bankWidth: lLength - 16,
                bankHeight: 16
            }
        } 
        else if(lPrev.normal == Up && l.normal == Left && lNext.normal == Up){
            return {
                cornerImg:waterBankBottomRightConcave,
                bankImg:waterBankLeftPattern,
                cornerPosX: l.x1 + 0,
                cornerPosY: l.y1 + 0,
                bankPosX: l.x2 + 0,
                bankPosY: l.y2 + 16,
                bankWidth: 16,
                bankHeight: lLength - 16
            }
        }
        else if(lPrev.normal == Left && l.normal == Up && lNext.normal == Right){
            return {
                cornerImg:waterBankTopLeftConvex,
                bankImg:waterBankTopPattern,
                cornerPosX: l.x1 + 0,
                cornerPosY: l.y1 + 0,
                bankPosX: l.x1 + 16,
                bankPosY: l.y1 + 0,
                bankWidth: lLength - 32,
                bankHeight: 16
            }
        }
        else if(lPrev.normal == Up && l.normal == Right && lNext.normal == Up){
            return {
                cornerImg:waterBankTopRightConvex,
                bankImg:waterBankRightPattern,
                cornerPosX: l.x1 - 16,
                cornerPosY: l.y1 + 0,
                bankPosX: l.x1 - 16,
                bankPosY: l.y1 + 16,
                bankWidth: 16,
                bankHeight: lLength - 16
            }
        }
        else if(lPrev.normal == Right && l.normal == Up && lNext.normal == Right){
            return {
                cornerImg:waterBankBottomLeftConcave,
                bankImg:waterBankTopPattern,
                cornerPosX: l.x1 - 16,
                cornerPosY: l.y1 + 0,
                bankPosX: l.x1 + 0,
                bankPosY: l.y1 + 0,
                bankWidth: lLength - 16,
                bankHeight: 16
            }
        }
        else if(lPrev.normal == Up && l.normal == Right && lNext.normal == Down){
            return {
                cornerImg: waterBankTopRightConvex,
                bankImg: waterBankRightPattern,
                cornerPosX: l.x1 - 16,
                cornerPosY: l.y1 + 0,
                bankPosX: l.x1 - 16,
                bankPosY: l.y1 + 16,
                bankWidth: 16,
                bankHeight: lLength - 32
            }
        }
        else if(lPrev.normal == Right && l.normal == Down && lNext.normal == Right){
            return {
                cornerImg: waterBankBottomRightConvex,
                bankImg: waterBankBottomPattern,
                cornerPosX: l.x1 - 16,
                cornerPosY: l.y1 - 16,
                bankPosX: l.x2 + 0,
                bankPosY: l.y2 - 16,
                bankWidth: lLength - 16,
                bankHeight: 16
            }
        }
        else if(lPrev.normal == Down && l.normal == Right && lNext.normal == Down){
            return {
                cornerImg: waterBankTopLeftConcave,
                bankImg: waterBankRightPattern,
                cornerPosX: l.x1 - 16,
                cornerPosY: l.y1 - 16,
                bankPosX: l.x1 - 16,
                bankPosY: l.y1 + 0,
                bankWidth: 16,
                bankHeight: lLength - 16
            }
        }
        else if(lPrev.normal == Right && l.normal == Down && lNext.normal == Left){
            return {
                cornerImg: waterBankBottomRightConvex,
                bankImg: waterBankBottomPattern,
                cornerPosX: l.x1 - 16,
                cornerPosY: l.y1 - 16,
                bankPosX: l.x2 + 16,
                bankPosY: l.y2 - 16,
                bankWidth: lLength - 32,
                bankHeight: 16
            }
        }
        else if(lPrev.normal == Down && l.normal == Left && lNext.normal == Down){
            return {
                cornerImg: waterBankBottomLeftConvex,
                bankImg: waterBankLeftPattern,
                cornerPosX: l.x1 + 0,
                cornerPosY: l.y1 - 16,
                bankPosX: l.x2 + 0,
                bankPosY: l.y2 + 0,
                bankWidth: 16,
                bankHeight: lLength - 16
            }
        }
        else if(lPrev.normal == Left && l.normal == Down && lNext.normal == Left){
            return {
                cornerImg: waterBankTopRightConcave,
                bankImg: waterBankBottomPattern,
                cornerPosX: l.x1 + 0,
                cornerPosY: l.y1 - 16,
                bankPosX: l.x2 + 16,
                bankPosY: l.y2 - 16,
                bankWidth: lLength - 16,
                bankHeight: 16
            }
        } else { //lPrev.normal == Down && l.normal == Left && lNext.normal == Up
            return {
                cornerImg: waterBankBottomLeftConvex,
                bankImg: waterBankLeftPattern,
                cornerPosX: l.x1 + 0,
                cornerPosY: l.y1 - 16,
                bankPosX: l.x2 + 0,
                bankPosY: l.y2 + 16,
                bankWidth: 16,
                bankHeight: lLength - 32
            }
        }        
    }

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

    // Draw waterbanks
    for (let i = 0; i < area.length; i++) {
        const x = waterBankDrawConfiguration(i);

        context.fillStyle = x.bankImg;
        context.fillRect(x.bankPosX, x.bankPosY, x.bankWidth, x.bankHeight);
        context.drawImage(x.cornerImg, x.cornerPosX, x.cornerPosY);
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