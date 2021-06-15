import { GameEntity } from "../../dooble/GameEntity";
import { DrawComponent } from "../../draw/draw.component";
import { Vector } from "../../physics/vector";
import { drawTransporter } from "./drawTransporter";

export class Transporter extends GameEntity{
    constructor(
        public x: number,
        public y: number,
        public radius: number,
        public exitDirection: Vector,
        public transportProgressPercent: number
    ){
        super([
            new DrawComponent(drawTransporter)
        ])
    }
}

export type TransporterPairState = 
    'Idle' | 'Transporting';
    
export class TransporterPair extends GameEntity{
    t1: Transporter;
    t2: Transporter;
    state: TransporterPairState
}