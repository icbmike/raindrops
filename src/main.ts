function setupCanvas(canvas: HTMLCanvasElement): [HTMLCanvasElement, CanvasRenderingContext2D] {
    // Get the device pixel ratio, falling back to 1.
    var dpr = window.devicePixelRatio || 1;
    
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;
    var ctx = canvas.getContext('2d');
    // Scale all drawing operations by the dpr, so you
    // don't have to worry about the difference.
    ctx?.scale(dpr, dpr);

    return [canvas, ctx];
}

interface rectState {
    leftPos: number;
    velocity: number;
}

const initalState: rectState = {
    leftPos: 150,
    velocity: 1
}

var [cvs, context] = setupCanvas(document.getElementById('canvas') as HTMLCanvasElement);

const rectStateReducer = (current: rectState, delta): rectState => {
    if (current.leftPos >= cvs.width - 250){
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

let currentState = initalState;

function redraw(context: CanvasRenderingContext2D, delta: number) {
    // clear the canvas
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.fillStyle = 'white';

    currentState = rectStateReducer(currentState, delta);
    
    context.fillRect(currentState.leftPos, 150, 100, 100);
}


window.addEventListener('resize', () => {
    cvs.width = cvs.parentElement.clientWidth;
    cvs.height = cvs.parentElement.clientHeight;
});

cvs.width = cvs.parentElement.clientWidth;
cvs.height = cvs.parentElement.clientHeight;

let lastUpdateTime = 0;
const rafCallback = (now: number) => {
    const delta = now - lastUpdateTime;
    lastUpdateTime = now;
    redraw(context, delta);
    window.requestAnimationFrame(rafCallback)
};

window.requestAnimationFrame(rafCallback)