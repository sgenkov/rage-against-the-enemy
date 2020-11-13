import { app } from '../index';
export class Parallax {
    private backgroundFar: PIXI.extras.TilingSprite;
    private backgroungMiddle: PIXI.extras.TilingSprite;
    private backgroungFore: PIXI.extras.TilingSprite;
    private positionX: number = 0;
    public scrollSpeed = 1;

    constructor(textureBack: string, textureMiddle: string, textureFront: string) {
        this.backgroundFar = this.createBg(app.loader.resources[`${textureBack}`].texture);
        this.backgroungMiddle = this.createBg(app.loader.resources[`${textureMiddle}`].texture);
        this.backgroungFore = this.createBg(app.loader.resources[`${textureFront}`].texture);
    };
    private createBg(texture: any) {

        let tiling: PIXI.extras.TilingSprite = new PIXI.extras.TilingSprite(texture, app.view.width, app.view.height);

        tiling.position.set(0, 0);
        tiling.tileScale.x = 2.5;
        tiling.tileScale.y = 3.8;
        app.stage.addChild(tiling);

        return tiling;
    };

    public updateBg() {
        this.positionX +=  this.scrollSpeed;
        this.positionX += 1;
        this.backgroungFore.tilePosition.x = -this.positionX;
        this.backgroungMiddle.tilePosition.x = -this.positionX / 2;
        this.backgroundFar.tilePosition.x = -this.positionX / 4;
    };
};