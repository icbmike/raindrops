import { StartAction } from "../../dooble/action";
import { findComponents } from "../../dooble/GameEntity";
import { on } from "../../dooble/system";
import { lineLength } from "../../physics/Line";
import { Down, Up } from "../../physics/vector";
import { Wall } from "../wall/wall";
import { MapComponent } from "./MapComponent";

export const mapWallFactorySystem = on('StartAction', (world, _: StartAction) => {
    const { component: map } = findComponents<MapComponent>(world.gameEntities, MapComponent.Type)[0];

    const walls: Wall[] = [];
    for (let i = 0; i < map.accessibleAreas.length; i++) {
        const area = map.accessibleAreas[i];

        for (let j = 0; j < area.length; j++) {
            const l = area[j];

            const diff = lineLength(l);

            const isHorizontal = l.normal == Up || l.normal == Down
            const width = isHorizontal ? diff : 16;
            const height = isHorizontal ? 16 : diff;
            
            const wall = l.x2 - l.x1 > 0 || l.y2 - l.y1 > 0
                ? new Wall(l.x1, l.y1, width, height)
                : new Wall(l.x2, l.y2, width, height);  
            
            walls.push(wall);
        }
    }

    world.gameEntities.push(...walls);
});