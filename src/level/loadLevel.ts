import { Gold } from "../features/inventory/Gold";
import { Button } from "../features/locked-door/Button";
import { Door } from "../features/locked-door/Door";
import { Transporter } from "../features/transporter/Transporter";
import { Up, Left, Vector, Right, Down } from "../physics/vector";
import { Level } from "./Level";
import { Map } from '../features/map/map';
import { Tree } from "../features/tree/Tree";
import { Point } from "../physics/Point";
import { LineWithNormal } from "../physics/Line";

function buildLinesWithNormals(points: Point[], normals: Vector[]) : LineWithNormal[] {
    if(points.length != normals.length){
        throw new Error('number of points and normals dont match');
    }

    return points.map((p, i) => {
        const pNext = points[(i + 1) % points.length];
        
        const normal = normals[i];

        return {
            x1: p.x,
            y1: p.y,
            x2: pNext.x,
            y2: pNext.y,
            normal
        }
    });
}

const map = new Map(
    {
        x: -200,
        y: -200,
        width: 5000,
        height: 5000
    }, 
    [
        buildLinesWithNormals(
        [
            { x: 0, y: 0, },
            { x: 800, y: 0, },
            { x: 800, y: 800, },
            { x: 0, y: 800, },
        ],[
            Up, Right, Down, Left
        ]),
        buildLinesWithNormals(
        [
            { x: 1200, y: 0, },
            { x: 1392,  y: 0, },
            { x: 1392,  y: -160, },
            { x: 1712, y: -160 },
            { x: 1712, y: 0 },
            { x: 2000, y: 0 },
            { x: 2000, y: 640, },
            { x: 1776, y: 640, },
            { x: 1776, y: 800, },
            { x: 1264, y: 800, },
            { x: 1264, y: 736, },
            { x: 1200, y: 736, },
        ],[
            Up, Left, Up, Right, Up, Right, Down, Right, Down, Left, Down, Left
        ])
    ]
);

export function loadLevel(): Level {
    return {
        gameEntities: [
            map,
            new Gold(550, 200, 200),
            new Door(
                '#door-1',
                'Closed',
                600,
                1800,
                200,
                10,
            ),
            new Button(
                '#door-1',
                1300,
                400,
                false,
            ),
            new Transporter(
                300,
                500,
                50,
                Up,
                'a',
                'b'
            ),
            new Transporter(
                1900,
                300,
                50,
                Left,
                'b',
                'a'
            ),
            new Tree(200, 200, 'tree_dark'),
            new Tree(300, 200, 'tree_light'),
            new Tree(200, 500, 'tree_dark'),
        ]
    }
}