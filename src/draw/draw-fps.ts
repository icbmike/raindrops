
let lastFrame = Date.now();

export const drawFPS = (context: CanvasRenderingContext2D) => {
    const now = Date.now();
    const deltaSeconds = (now - lastFrame) / 1000;
    lastFrame = now;
    const fps = 1 / deltaSeconds;
   
    context.textBaseline = "top";

    const text = `FPS: ${fps.toPrecision(4)}`;

    const textMetric = context.measureText(text);
    
    context.fillStyle = 'black';
    context.fillRect(10, 10, textMetric.width + 10, textMetric.actualBoundingBoxDescent + 10);

    context.fillStyle = 'white';
    context.fillText(text, 15, 15);
}