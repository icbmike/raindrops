/**
 * Adapted from https://github.com/pgkelley4/line-segments-intersect
 */

import { Line } from "./Line";
import { Point } from "./Point";
import { Vector } from "./vector";

export function linesIntersect(l1: Line, l2: Line): boolean {
	const p = { x: l1.x1, y: l1.y1 };
	const p2 = { x: l1.x2, y: l1.y2 };

	const q = { x: l2.x1, y: l2.y1 };
	const q2 = { x: l2.x2, y: l2.y2 };

	var r = subtractPoints(p2, p);
	var s = subtractPoints(q2, q);

	var uNumerator = crossProduct(subtractPoints(q, p), r);
	var denominator = crossProduct(r, s);

	if (uNumerator == 0 && denominator == 0) {
		// They are coLlinear
		
		// Do they touch? (Are any of the points equal?)
		if (equalPoints(p, q) || equalPoints(p, q2) || equalPoints(p2, q) || equalPoints(p2, q2)) {
			return true
		}
		// Do they overlap? (Are all the point differences in either direction the same sign)
		const isOverlap = !allEqual([
				(q.x - p.x < 0),
				(q.x - p2.x < 0),
				(q2.x - p.x < 0),
				(q2.x - p2.x < 0)
			]) ||
			!allEqual([
				(q.y - p.y < 0),
				(q.y - p2.y < 0),
				(q2.y - p.y < 0),
				(q2.y - p2.y < 0)
			]);

		return isOverlap;
	}

	if (denominator == 0) {
		// lines are paralell
		return false;
	}

	var u = uNumerator / denominator;
	var t = crossProduct(subtractPoints(q, p), s) / denominator;

	const isTU = (t > 0) && (t < 1) && (u > 0) && (u < 1);

	return isTU;
}

function crossProduct(v1: Vector, v2: Vector) {
	return v1.x * v2.y - v1.y * v2.x;
}

function subtractPoints(point1: Point, point2: Point): Vector {
	return {
		 x: point1.x - point2.x,
		 y: point1.y - point2.y
	};
}

function equalPoints(point1: Point, point2: Point): boolean {
	return (point1.x == point2.x) && (point1.y == point2.y)
}

function allEqual<T>(values: T[]) {
	var firstValue = values[0];

	for (let i = 1; i < values.length; i++) {
		if (values[i] != firstValue) {
			return false;
		}
	}
	return true;
}
