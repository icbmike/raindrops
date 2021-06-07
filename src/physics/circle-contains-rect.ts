import { all } from "../util/all";
import { Circle } from "./Circle";
import { Rect, rectPoints } from "./Rect";
import { size, subtract } from "./vector";

export const circleContainsRect = (c: Circle, r: Rect): boolean => {
    const rps = rectPoints(r);

    return all(rps, p => size(subtract(p, c)) < c.radius);
}