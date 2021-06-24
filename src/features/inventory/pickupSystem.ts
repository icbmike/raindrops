import { UpdateAction } from "../../dooble/action";
import { findComponents } from "../../dooble/GameEntity";
import { PositionComponent } from "../../dooble/PositionComponent";
import { on } from "../../dooble/system";
import { rectsOverlap } from "../../physics/intersect";
import { any } from "../../util/any";
import { World } from "../worldstate";
import { PickupComponent } from "./PickupComponent";

export const pickupSystem = on('UpdateAction', (world: World, action: UpdateAction) => {
    const { player, inventory, gameEntities } = world;

    const overlappingPickups = 
        findComponents<PositionComponent, PickupComponent>(gameEntities, PositionComponent.Type, PickupComponent.Type)
        .filter(({components: [{x,y}, _]}) => rectsOverlap(player.colliable, {x: x - 2.5, y: y-2.5 , width:5, height:5}));
    
    if(!any(overlappingPickups)){
        return;
    }

    const sum = overlappingPickups.reduce((acc, {components: [_, {value}]}) => acc + value, 0);

    inventory.gold += sum;
    world.gameEntities = gameEntities.filter(ge => !overlappingPickups.map(op => op.gameEntity).includes(ge)); 
});