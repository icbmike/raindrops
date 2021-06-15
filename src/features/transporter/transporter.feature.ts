import { Feature } from "../../dooble/feature";
import { Left, Up } from "../../physics/vector";
import { Transporter } from "./Transporter";
import { transporterSystem } from "./transporter.reducer";

export const transporterFeature: Feature = {
    reducers: [transporterSystem],
    stories: [],
    gameEntities: [
        new Transporter(
            300,
            500,
            50,
            Up,
            'a',
            'b'
        ),
        new Transporter(
            1900,
            300,
            50,
            Left,
            'b',
            'a'
        )
    ],
}