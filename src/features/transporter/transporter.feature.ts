import { Feature } from "../../dooble/feature";
import { Down, Left, Up } from "../../physics/vector";
import { drawTransporter } from "./drawTransporter";
import { Transporter } from "./Transporter";
import { transporterUpdateReducer } from "./transporter.reducer";

export const transporterFeature: Feature = {
    reducers: [transporterUpdateReducer],
    stories: [],
    gameEntities: [
        new Transporter(
            300,
            500,
            50,
            Up,
            0
        ),
        new Transporter(
            1900,
            300,
            50,
            Left,
            0
        )
    ],
}