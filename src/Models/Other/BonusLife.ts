export class BonusLife {

    private textureContainer: PIXI.Texture[] = [];

    private bonusLife: PIXI.extras.AnimatedSprite;

    public isInRange: boolean = false;

    private _movementSpeed: number = 4;
    public constructor(private app: PIXI.Application) {
        for (let i = 1; i <= 30; ++i) {
            this.textureContainer.push(PIXI.Texture.from(app.loader.resources[`live${i}`].url));
        };

        this.bonusLife = new PIXI.extras.AnimatedSprite(this.textureContainer);
        this.bonusLife.anchor.set(0.5);
        this.bonusLife.animationSpeed = 0.4;
        this.bonusLife.loop = true;
        this.bonusLife.scale.x =  0.3;
        this.bonusLife.scale.y =  0.3;
        this.bonusLife.x = app.view.width;
        this.bonusLife.y =  Math.random() * (app.view.height - 250) + this.bonusLife.height/2  ;
        app.stage.addChild(this.bonusLife);
        this.bonusLife.play();
        // setTimeout(() => {app.stage.removeChild(this.bonusLive)}, 100);      
    };


    public set x(value: number) {
            this.bonusLife.x = value;
            if (this.bonusLife.x <  -this.bonusLife.width) {
                this.removeBonusLife();
            };
    };
    public get x(): number {
        return this.bonusLife.x ;
    };

    public get movementSpeed(): number {
        return this._movementSpeed;
    };
    public getBounds(): any {
        return this.bonusLife.getBounds();
    };

    public removeBonusLife(): void {
        this.app.stage.removeChild(this.bonusLife);
        this.isInRange = false;
    };
};