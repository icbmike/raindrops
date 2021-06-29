import { Gold } from "../features/inventory/Gold";
import { Button } from "../features/locked-door/Button";
import { Door } from "../features/locked-door/Door";
import { Transporter } from "../features/transporter/Transporter";
import { Up, Left } from "../physics/vector";
import { Level } from "./Level";
import { Map } from '../features/map/map';
import { Tree } from "../features/tree/Tree";

const map = new Map(
    {
        x: -200,
        y: -200,
        width: 5000,
        height: 5000
    }, 
    [
        [
            { x: 0, y: 0, },
            { x: 800, y: 0, },
            { x: 800, y: 800, },
            { x: 0, y: 800, },
        ],
        [
            { x: 1200, y: 0, },
            { x: 1392,  y: 0, },
            { x: 1392,  y: -160, },
            { x: 2000, y: -160, },
            { x: 2000, y: 800, },
            { x: 1200, y: 800, },
        ]
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