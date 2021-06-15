import { UpdateAction } from "../../dooble/action";
import { on } from "../../dooble/reducer";
import { rectsOverlap } from "../../physics/intersect";
import { InputAction } from "../input/input";
import { World } from "../worldstate";
import { InteractiveComponent } from "./Button";

export const InteractiveSystem = on('UpdateAction', (world: World, _: UpdateAction) => {
    const playerCollidable = world.player.colliable;
    
    const interactiveGameEntities = world.gameEntities.flatMap(ge => {
        const ic = ge.getComponent<InteractiveComponent>('InteractiveComponent');

        return ic ? [ic] : [];
    });

    for (let i = 0; i < interactiveGameEntities.length; i++) {
        const ic = interactiveGameEntities[i];
        
        ic.isInteractive = rectsOverlap(ic.interactiveArea, playerCollidable);
    }
});
