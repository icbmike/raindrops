export interface Vector {
    x:number;
    y:number;
}

export const Up : Vector = {
    x: 0,
    y: -1
}

export const Down : Vector = {
    x: 0,
    y: 1
}

export const Left : Vector = {
    x: -1,
    y: 0
}

export const Right : Vector = {
    x: 1,
    y: 0
}

export const Zero : Vector = {
    x: 0,
    y: 0
}

export const add = (v1: Vector, v2: Vector) : Vector => {
    return {
        x: v1.x + v2.x,
        y: v2.y + v2.y
    };
}

export const substract = (v1: Vector, v2: Vector) : Vector => {
    return {
        x: v1.x - v2.x,
        y: v1.y - v2.y
    }
}

export const scale = (v: Vector, factor: number) : Vector => {
    return {
        x: v.x * factor,
        y: v.y * factor
    }
}

export const size = (v: Vector) : number => {
    return Math.sqrt(v.x ** 2 + v.y ** 2);
}

export const fromAngleAndSize = (theta: number, size: number): Vector => {
    return {
        x: Math.cos(theta) * size,
        y: -Math.sin(theta) * size
    }
}

export const dot = (v1: Vector, v2: Vector) : number => {
    return v1.x * v2.x + v1.y * v2.y;
}

export const unit = (v: Vector) : Vector => {
    return scale(v, 1 / size(v));
}