import { Transporter } from "./Transporter";
import { TransporterState } from "./TransporterState";
import { TransporterComponent } from "./TransporterComponent";
import { UpdateAction } from "../../dooble/action";
import { on } from "../../dooble/reducer";
import { circleContainsRect } from "../../physics/circle-contains-rect";
import { Collidable } from "../../physics/Collidable";
import { scale, size, subtract } from "../../physics/vector";
import { World } from "../worldstate";

function transporterPairs(ts: Transporter[], t: Transporter) : {t1:TransporterComponent, t2: TransporterComponent} {
    const {targetTransporter} = t.transporterComponent;

    const target = ts.find(t => t.transporterComponent.transporterId === targetTransporter)!;

    return { t1: t.transporterComponent, t2: target.transporterComponent };
}

export const transporterSystem = on('UpdateAction', (world: World, action: UpdateAction) => {
    const { delta } = action.payload;
    const { player, gameEntities } = world

    const playerCollidable = player.getComponent<Collidable>('Collidable')!

    const ts = gameEntities.flatMap(ge => {
        const tc = ge.getComponent<TransporterComponent>('TransporterComponent');

        return tc ? [ge as Transporter]: [];
    });

    for(let i = 0; i < ts.length; i++){
        const t = ts[i];

        const { t1, t2 } = transporterPairs(ts, t);

        if (t1.state === 'Idle'){
            let entryPad : TransporterComponent | null;
            let exitPad : TransporterComponent | null;

            if(circleContainsRect(t1, playerCollidable)){
                entryPad = t1;
                exitPad = t2;
            }else if(circleContainsRect(t2, playerCollidable)){
                entryPad = t2;
                exitPad = t1;
            } else {
                entryPad = null;
                exitPad = null;
            }

            if(entryPad && exitPad){
                const newTransportProgress = entryPad.transportProgressPercent + 0.1 * delta;
                const newState: TransporterState = newTransportProgress >= 100 ? 'Transporting' : 'Idle';

                if(newState == 'Idle'){
                    entryPad.state = newState;
                    entryPad.transportProgressPercent = newTransportProgress;
                } else {
                    entryPad.state = newState;
                    entryPad.transportProgressPercent = 100;

                    playerCollidable.x = exitPad.x - playerCollidable.width / 2;
                    playerCollidable.y = exitPad.y - playerCollidable.height / 2
                }
            } else {
                const newTransportProgress1 = t1.transportProgressPercent == 0 ? 0 : Math.max(0, t1.transportProgressPercent - 0.05 * delta);
                const newTransportProgress2 = t2.transportProgressPercent == 0 ? 0 : Math.max(0, t2.transportProgressPercent - 0.05 * delta);
                
                t1.transportProgressPercent = newTransportProgress1;
                t2.transportProgressPercent = newTransportProgress2;
            }
        } else {
            const exitPad = t1.transportProgressPercent == 100 ? t2 : t1;

            // Move player out by exit direction
            const moveVector = scale(exitPad.exitDirection, 0.3 * delta);
            const newX = playerCollidable.x + moveVector.x;
            const newY = playerCollidable.y + moveVector.y;

            if(size(subtract(exitPad, playerCollidable)) > t2.radius * 2){
                t1.transportProgressPercent = 0;
                t2.transportProgressPercent = 0;
                t1.state = 'Idle';
                t2.state = 'Idle';
            } 

            playerCollidable.x = newX;
            playerCollidable.y = newY;
        }
    }
    
    return world;
});