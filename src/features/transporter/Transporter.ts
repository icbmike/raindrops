import { GameEntity } from "../../dooble/GameEntity";
import { Vector } from "../../physics/vector";

export interface Transporter {
    x: number;
    y: number;
    radius: number;
    exitDirection: Vector
    transportProgressPercent: number; 
}

export type TransporterPairState = 
    'Idle' | 'Transporting';
    
export class TransporterPair extends GameEntity{
    t1: Transporter;
    t2: Transporter;
    state: TransporterPairState
}