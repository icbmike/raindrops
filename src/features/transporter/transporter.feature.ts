import { Feature } from "../../dooble/feature";
import { drawTransporter } from "./drawTransporter";
import { transporterUpdateReducer } from "./transporter.reducer";

export const transporterFeature: Feature = {
    drawFunctions: [drawTransporter],
    reducers: [],
    stories: [],
    initialState: {
        transporters: [
            {
                t1: {
                    x: 300,
                    y: 500,
                    radius: 50
                },
                t2: {
                    x: 800,
                    y: 300,
                    radius: 50
                }
            }
        ]
    }
}