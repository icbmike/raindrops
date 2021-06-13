import { UpdateAction } from "../../dooble/action";
import { on } from "../../dooble/reducer";
import { rectsOverlap } from "../../physics/intersect";
import { Rect } from "../../physics/Rect";
import { World } from "../worldstate";
import { Button } from "./Button";

export const buttonUpdateReducer = on('UpdateAction', (current: World, action: UpdateAction): World => {

    // const newButtons: Button[] = buttons.map(b => 
    // {
    //     const interactiveSpace: Rect = {
    //         x: b.x - 20,
    //         y: b.y - 20,
    //         width: 55,
    //         height: 70
    //     };

    //     return {
    //         ...b,
    //         interactive: rectsOverlap(interactiveSpace, player)
    //     };
    // });

    return {
        ...current,
    }
});