import { UpdateAction } from "../../dooble/action";
import { on } from "../../dooble/reducer";
import { circleContainsRect } from "../../physics/circle-contains-rect";
import { scale, size, subtract } from "../../physics/vector";
import { replace } from "../../util/replace";
import { WorldState } from "../worldstate";
import { TransporterPair, TransporterPairState } from "./Transporter";

export const transporterUpdateReducer = on('UpdateAction', (current: WorldState, action: UpdateAction) => {
    const { delta } = action.payload;
    const {player} = current

    for(let i = 0; i < current.transporters.length; i++){
        const pair = current.transporters[i];

        const { t1, t2 } = pair;

        if(pair.state == 'Idle'){
            if(circleContainsRect(t1, current.player)){
                const newTransportProgress = t1.transportProgressPercent + 0.05 * delta;
                const newState: TransporterPairState = newTransportProgress >= 100 ? 'Transporting' : 'Idle';

                if(newState == 'Idle'){
                    return {
                        ...current,
                        transporters: replace(current.transporters, i, {
                            ...pair,
                            state: newState,
                            t1: {
                                ...t1,
                                transportProgressPercent: newTransportProgress
                            }
                        })
                    }
                } else {
                    return {
                        ...current,
                        transporters: replace(current.transporters, i, {
                            ...pair,
                            state: newState,
                            t1: {
                                ...t1,
                                transportProgressPercent: 0 // reset the transport progress
                            }
                        }),
                        player: { // transport the player
                            ...player,
                            x: t2.x - player.width / 2,
                            y: t2.y - player.height / 2
                        }
                    }
                }
            } else {
                const newTransportProgress = t1.transportProgressPercent == 0 ? 0 : Math.max(0, t1.transportProgressPercent - 0.05 * delta);
                return {
                    ...current,
                    transporters: replace(current.transporters, i, {
                        ...pair,
                        state: 'Idle',
                        t1: {
                            ...t1,
                            transportProgressPercent: newTransportProgress
                        }
                    })
                }
            }
        } else {
            // Move player out by exit direction
            const moveVector = scale(t2.exitDirection, 0.1 * delta);
            const newX = player.x + moveVector.x;
            const newY = player.y + moveVector.y;

            if(size(subtract(t2, player)) > t2.radius){
                return {
                    ...current,
                    player: {
                        ...player,
                        x: newX,
                        y: newY
                    },
                    transporters: replace(current.transporters, i, {
                        ...pair,
                        state: 'Idle',
                    })
                }
            } 
            return {
                ...current,
                player: {
                    ...player,
                    x: newX,
                    y: newY
                }
            }
        }
    }
    
    return current;
});