import { setupCanvas } from "./draw/canvas";
import { loop } from "./loop";

var [_, context] = setupCanvas(document.getElementById('canvas') as HTMLCanvasElement);

console.log('starting loop');
loop(context);