import { UpdateAction } from "../../dooble/action";
import { on } from "../../dooble/reducer";
import { circleContainsRect } from "../../physics/circle-contains-rect";
import { Collidable } from "../../physics/Collidable";
import { scale, size, subtract } from "../../physics/vector";
import { replace } from "../../util/replace";
import { World } from "../worldstate";
import { Transporter } from "./Transporter";
import { TransporterState } from "./TransporterState";
import { TransporterComponent } from "./TransporterComponent";

function transporterPairs(ts: Transporter[], t: Transporter) : {t1:Transporter, t2: Transporter} {
    const {targetTransporter} = t.transporterCompoent;

    const target = ts.find(t => t.transporterCompoent.transporterId === targetTransporter)!;

    return { t1: t, t2: target };
}

export const transporterUpdateReducer = on('UpdateAction', (world: World, action: UpdateAction) => {
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

        if (t1.transporterCompoent.state === 'Idle'){
            let entryPad : TransporterComponent | null;
            let exitPad : TransporterComponent | null;

            if(circleContainsRect(t1.transporterCompoent, playerCollidable)){
                entryPad = t1.transporterCompoent;
                exitPad = t2.transporterCompoent;
            }else if(circleContainsRect(t2.transporterCompoent, playerCollidable)){
                entryPad = t2.transporterCompoent;
                exitPad = t1.transporterCompoent;
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
                const newTransportProgress1 = t1.transporterCompoent.transportProgressPercent == 0 ? 0 : Math.max(0, t1.transporterCompoent.transportProgressPercent - 0.05 * delta);
                const newTransportProgress2 = t2.transporterCompoent.transportProgressPercent == 0 ? 0 : Math.max(0, t2.transporterCompoent.transportProgressPercent - 0.05 * delta);
                
                t1.transporterCompoent.transportProgressPercent = newTransportProgress1;
                t2.transporterCompoent.transportProgressPercent = newTransportProgress2;
            }
        } else {
            const exitPad = t1.transporterCompoent.transportProgressPercent == 100 ? t2 : t1;

            // Move player out by exit direction
            const moveVector = scale(exitPad.transporterCompoent.exitDirection, 0.3 * delta);
            const newX = playerCollidable.x + moveVector.x;
            const newY = playerCollidable.y + moveVector.y;

            if(size(subtract(exitPad.transporterCompoent, playerCollidable)) > t2.transporterCompoent.radius * 2){
                t1.transporterCompoent.transportProgressPercent = 0;
                t2.transporterCompoent.transportProgressPercent = 0;
                t1.transporterCompoent.state = 'Idle';
                t2.transporterCompoent.state = 'Idle';
            } 

            playerCollidable.x = newX;
            playerCollidable.y = newY;
        }
    }
    
    return world;
});