import { Gold } from "../features/inventory/Gold";
import { Button } from "../features/locked-door/Button";
import { Door } from "../features/locked-door/Door";
import { Transporter } from "../features/transporter/Transporter";
import { Wall } from "../features/wall/wall";
import { Up, Left } from "../physics/vector";
import { Level } from "./Level";

const walls: Wall[] = [
    {
        x: 0,
        y: 0,
        width: 10,
        height: 800
    },
    {
        x: 0,
        y: 0,
        width: 800,
        height: 10
    },
    {
        x: 800,
        y: 0,
        height: 800,
        width: 10
    },
    {
        x: 0,
        y: 800,
        height: 10,
        width: 600
    },
    {
        x: 1200,
        y: 0,
        width: 10,
        height: 800
    },
    {
        x: 1200,
        y: 0,
        width: 800,
        height: 10
    },
    {
        x: 2000,
        y: 0,
        height: 800,
        width: 10
    },
    {
        x: 1200,
        y: 800,
        height: 10,
        width: 810
    },
    {
        x: 800,
        y: 0,
        width: 400,
        height: 10
    }
].map(({x, y, width, height}) => new Wall(x, y, width, height));

export function loadLevel(): Level{
    return {
        gameEntities:[
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
            ...walls
        ]
    }
}