import { UpdateAction } from "../../dooble/action";
import { on } from "../../dooble/reducer";
import { circleContainsRect } from "../../physics/circle-contains-rect";
import { scale, size, subtract } from "../../physics/vector";
import { replace } from "../../util/replace";
import { World } from "../worldstate";
import { Transporter, TransporterPairState } from "./Transporter";

export const transporterUpdateReducer = on('UpdateAction', (current: World, action: UpdateAction) => {
    // const { delta } = action.payload;
    // const {player} = current

    // for(let i = 0; i < current.transporters.length; i++){
    //     const pair = current.transporters[i];

    //     const { t1, t2 } = pair;

    //     if(pair.state == 'Idle'){
    //         let entryPad : Transporter | null;
    //         let exitPad : Transporter | null;

    //         if(circleContainsRect(t1, current.player)){
    //             entryPad = t1;
    //             exitPad = t2;
    //         }else if(circleContainsRect(t2, current.player)) {
    //             entryPad = t2;
    //             exitPad = t1;
    //         }else {
    //             entryPad = null;
    //             exitPad = null;
    //         }

    //         if(entryPad && exitPad){
    //             const newTransportProgress = entryPad.transportProgressPercent + 0.1 * delta;
    //             const newState: TransporterPairState = newTransportProgress >= 100 ? 'Transporting' : 'Idle';

    //             if(newState == 'Idle'){
    //                 return {
    //                     ...current,
    //                     transporters: replace(current.transporters, i, {
    //                         ...pair,
    //                         state: newState,
    //                         t1: {
    //                             ...t1,
    //                             transportProgressPercent: entryPad == t1 ? newTransportProgress: t1.transportProgressPercent
    //                         },
    //                         t2: {
    //                             ...t2,
    //                             transportProgressPercent: entryPad == t2 ? newTransportProgress: t2.transportProgressPercent
    //                         }
    //                     })
    //                 }
    //             } else {
    //                 return {
    //                     ...current,
    //                     transporters: replace(current.transporters, i, {
    //                         ...pair,
    //                         state: newState,
    //                         t1: {
    //                             ...t1,
    //                             transportProgressPercent: entryPad == t1 ? 100 : t1.transportProgressPercent
    //                         },
    //                         t2: {
    //                             ...t2,
    //                             transportProgressPercent: entryPad == t2 ? 100 : t2.transportProgressPercent
    //                         }
    //                     }),
    //                     player: { // transport the player
    //                         ...player,
    //                         x: exitPad.x - player.width / 2,
    //                         y: exitPad.y - player.height / 2
    //                     }
    //                 }
    //             }
    //         } else {
    //             const newTransportProgress1 = t1.transportProgressPercent == 0 ? 0 : Math.max(0, t1.transportProgressPercent - 0.05 * delta);
    //             const newTransportProgress2 = t2.transportProgressPercent == 0 ? 0 : Math.max(0, t2.transportProgressPercent - 0.05 * delta);
    //             return {
    //                 ...current,
    //                 transporters: replace(current.transporters, i, {
    //                     state: 'Idle',
    //                     t1: {
    //                         ...t1,
    //                         transportProgressPercent: newTransportProgress1
    //                     },
    //                     t2: {
    //                         ...t2,
    //                         transportProgressPercent: newTransportProgress2
    //                     }
    //                 })
    //             }
    //         }
    //     } else {
    //         const exitPad = t1.transportProgressPercent == 100 ? t2 : t1;

    //         // Move player out by exit direction
    //         const moveVector = scale(exitPad.exitDirection, 0.3 * delta);
    //         const newX = player.x + moveVector.x;
    //         const newY = player.y + moveVector.y;

    //         if(size(subtract(exitPad, player)) > t2.radius * 2){
    //             return {
    //                 ...current,
    //                 player: {
    //                     ...player,
    //                     x: newX,
    //                     y: newY
    //                 },
    //                 transporters: replace(current.transporters, i, {
    //                     t1: {
    //                         ...t1,
    //                         transportProgressPercent: 0
    //                     },
    //                     t2: {
    //                         ...t2,
    //                         transportProgressPercent: 0
    //                     },
    //                     state: 'Idle',
    //                 })
    //             }
    //         } 
    //         return {
    //             ...current,
    //             player: {
    //                 ...player,
    //                 x: newX,
    //                 y: newY
    //             }
    //         }
    //     }
    // }
    
    return current;
});