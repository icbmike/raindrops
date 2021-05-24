
let lastFrame = Date.now();

export const drawFPS = (context: CanvasRenderingContext2D) => {
    const now = Date.now();
    const deltaSeconds = (now - lastFrame) / 1000;
    lastFrame = now;
    const fps = 1 / deltaSeconds;
    context.textBaseline = "top";

    context.fillStyle = 'white';
    context.fillText(`FPS: ${fps.toPrecision(4)}`, 10, 10);
}