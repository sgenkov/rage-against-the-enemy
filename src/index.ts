import { App } from './App';
export const app: PIXI.Application = new PIXI.Application({
    width: window.innerWidth -15,
    height: window.innerHeight - 25,
    backgroundColor: 0xAAFFFF,
});

const game = new App();