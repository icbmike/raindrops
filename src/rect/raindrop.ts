export interface Raindrop {
    x: number;
    y: number;
    radius: number;
}

export const raindropReducer = (current:Raindrop, delta: number): Raindrop => {
    return {
        ...current,
        radius: current.radius + 0.5 * delta
    }
}