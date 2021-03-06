import { app } from '../index';
export class Explosion {

    private textureContainer: PIXI.Texture[] = [];

    private blast: PIXI.extras.AnimatedSprite;
    constructor(positionX: number = app.view.width / 2, positionY: number = app.view.height / 2, smallBlast: boolean = false) {
        for (let i = 1; i <= 9; ++i) {
            this.textureContainer.push(PIXI.Texture.from(app.loader.resources[`expl${i}`].url));
        };
        this.blast = new PIXI.extras.AnimatedSprite(this.textureContainer);
        this.blast.anchor.set(0.5);
        this.blast.animationSpeed = 0.5;
        this.blast.loop = false;
        this.blast.scale.x = smallBlast ? 0.1 : 0.3;
        this.blast.scale.y = smallBlast ? 0.1 : 0.3;
        this.blast.x = positionX;
        this.blast.y = positionY;
        app.stage.addChild(this.blast);
        this.blast.play();
        setTimeout(() => { app.stage.removeChild(this.blast) }, 400);
    };
};