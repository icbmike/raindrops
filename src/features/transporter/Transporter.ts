import { GameEntity } from "../../dooble/GameEntity";
import { DrawComponent } from "../../draw/DrawComponent";
import { Vector } from "../../physics/vector";
import { drawTransporter } from "./drawTransporter";
import { TransporterComponent } from "./TransporterComponent";

export class Transporter extends GameEntity{
    private _transporterComponent: TransporterComponent;

    constructor(
        x: number,
        y: number,
        radius: number,
        exitDirection: Vector,
        transporterId: string,
        targetTransporter: string
    ){
        super([
            new DrawComponent(drawTransporter),
            new TransporterComponent(
                'Idle', 
                transporterId, 
                targetTransporter,
                x,
                y,
                radius,
                exitDirection,
            )
        ])

        this._transporterComponent = this.components.find(c => c.type === 'TransporterComponent') as TransporterComponent;
    }

    public get transporterComponent(){
        return this._transporterComponent;
    }
}
