import { App } from './App';
const app: PIXI.Application = new PIXI.Application({
    width: 1050,
    height: 600,
    backgroundColor: 0xAAFFFF,
});

let keyContainer: any = {};

const game = new App(app);