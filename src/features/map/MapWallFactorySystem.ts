import { StartAction } from "../../dooble/action";
import { findComponents } from "../../dooble/GameEntity";
import { on } from "../../dooble/system";
import { subtract } from "../../physics/vector";
import { Wall } from "../wall/wall";
import { MapComponent } from "./MapComponent";

export const mapWallFactorySystem = on('StartAction', (world, _: StartAction) => {
    const { component: map } = findComponents<MapComponent>(world.gameEntities, MapComponent.Type)[0];

    const walls: Wall[] = [];
    for (let i = 0; i < map.accessibleAreas.length; i++) {
        const area = map.accessibleAreas[i];

        for (let j = 0; j < area.length; j++) {
            const p1 = area[j];

            const nextIndex = (j + 1) % area.length;

            const p2 = area[nextIndex];

            const diff = subtract(p2, p1)

            const isHorizontal = diff.y === 0;
            const width = isHorizontal ? Math.abs(diff.x) : 10;
            const height = isHorizontal ? 10 : Math.abs(diff.y);
            
            const wall = diff.x > 0 || diff.y > 0
                ? new Wall(p1.x, p1.y, width, height)
                : new Wall(p2.x, p2.y, width, height);  
            
            walls.push(wall);
        }
    }

    world.gameEntities.push(...walls);
});