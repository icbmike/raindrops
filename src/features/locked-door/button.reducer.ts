import { UpdateAction } from "../../dooble/action";
import { on } from "../../dooble/reducer";
import { rectsOverlap } from "../../physics/intersect";
import { Rect } from "../../physics/Rect";
import { WorldState } from "../worldstate";
import { Button } from "./Button";

export const buttonUpdateReducer = on('UpdateAction', (current: WorldState, action: UpdateAction): WorldState => {
    const { buttons, player } = current;

    const newButtons: Button[] = buttons.map(b => 
    {
        const interactiveSpace: Rect = {
            x: b.x - 20,
            y: b.y - 20,
            width: 55,
            height: 70
        };

        return {
            ...b,
            interactive: rectsOverlap(interactiveSpace, player)
        };
    });

    return {
        ...current,
        buttons: newButtons
    }
});