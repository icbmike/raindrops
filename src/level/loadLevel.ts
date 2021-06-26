import { Gold } from "../features/inventory/Gold";
import { Button } from "../features/locked-door/Button";
import { Door } from "../features/locked-door/Door";
import { Transporter } from "../features/transporter/Transporter";
import { Up, Left } from "../physics/vector";
import { Level } from "./Level";
import { Map } from '../features/map/map';

const map = new Map(
    {
        x: -1000,
        y: 1000,
        width: 2000,
        height: 2000
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
            { x: 2000,  y: 0, },
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
                800,
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
        ]
    }
}