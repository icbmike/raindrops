import { DrawFunc } from "../../draw/draw";
import { WorldState } from "../worldstate";

export const drawDoors: DrawFunc = (context: CanvasRenderingContext2D, state:WorldState) => {
    state.doors.forEach(d => {
        const isVertical = d.width < d.height;

        const thickness = isVertical ? d.width : d.height;

        // Door pane
        if(d.state == 'Closed') {
            context.fillStyle = 'blue';

            context.fillRect(d.x, d.y, d.width, d.height);
        }

        // Door frame
        context.fillStyle = 'gray';
        context.fillRect(d.x - 2.5, d.y - 2.5, thickness + 5, thickness + 5);

        context.fillRect(
            (isVertical ? d.x : d.x + d.width) - 2.5, 
            (isVertical ? d.y + d.height : d.y) - 2.5, 
            thickness + 5, 
            thickness + 5
        );
    })
}