export function setupCanvas(canvas: HTMLCanvasElement): [HTMLCanvasElement, CanvasRenderingContext2D] {
    // Get the device pixel ratio, falling back to 1.
    var dpr = window.devicePixelRatio || 1;
    
    var ctx = canvas.getContext('2d')!;
    // Scale all drawing operations by the dpr, so you
    // don't have to worry about the difference.
    ctx.scale(dpr, dpr);

    window.addEventListener('resize', () => {
        canvas.width = canvas.parentElement!.clientWidth;
        canvas.height = canvas.parentElement!.clientHeight;
    });

    canvas.width = canvas.parentElement!.clientWidth;
    canvas.height = canvas.parentElement!.clientHeight;

    return [canvas, ctx];
}
