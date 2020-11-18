import { app } from '../index';
export class Parallax {
    private backgroundFar: PIXI.extras.TilingSprite;
    private backgroungMiddle: PIXI.extras.TilingSprite;
    private backgroungFore: PIXI.extras.TilingSprite;
    private positionX: number = 0;
    private scrollSpeed = 2;

    constructor(textureBack: string, textureMiddle: string, textureFront: string) {
        this.backgroundFar = this.createBackground(app.loader.resources[`${textureBack}`].texture);
        this.backgroungMiddle = this.createBackground(app.loader.resources[`${textureMiddle}`].texture);
        this.backgroungFore = this.createBackground(app.loader.resources[`${textureFront}`].texture);
    };
    private createBackground(texture: any): PIXI.extras.TilingSprite {
        let tiling: PIXI.extras.TilingSprite = new PIXI.extras.TilingSprite(texture, app.view.width, app.view.height);
        tiling.position.set(0, 0);
        tiling.tileScale.x = 2.5;
        tiling.tileScale.y = 5.0;
        app.stage.addChild(tiling);

        return tiling;
    };

    public updateBackground() {
        this.positionX +=  this.scrollSpeed;
        this.backgroungFore.tilePosition.x = -this.positionX;
        this.backgroungMiddle.tilePosition.x = -this.positionX / 2;
        this.backgroundFar.tilePosition.x = -this.positionX / 4;
    };
};