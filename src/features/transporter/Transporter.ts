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
    
export interface TransporterPair {
    t1: Transporter;
    t2: Transporter;
    state: TransporterPairState
}