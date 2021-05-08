export interface RectState {
    leftPos: number;
    velocity: number;
}

export const createReducer = (cvs: CanvasRenderingContext2D) => {
    return  (current: RectState, delta: number): RectState => {
        if (current.leftPos >= cvs.canvas.width - 250){
            return {
                leftPos: current.leftPos - 1 * delta,
                velocity: -1
            }
        }
        else if(current.leftPos < 150){
            return {
                leftPos: current.leftPos + 1 * delta,
                velocity: 1
            };
        }

        return {
            ...current,
            leftPos: current.leftPos + current.velocity * delta
        }
    };
}