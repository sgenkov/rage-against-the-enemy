import { app } from '../../index';
export class Bullet {
    public static bullets: Bullet[] = [];
    private sprite: PIXI.Sprite;
    private _movementSpeed: number = 20;

    public constructor(ownerX: number, ownerY: number) {
        this.sprite = PIXI.Sprite.from(app.loader.resources.bulletRight.url);
        this.sprite.x = ownerX;
        this.sprite.y = ownerY;
        this.sprite.anchor.set(0.5);
        Bullet.bullets.push(this);
        app.stage.addChild(this.sprite);
    };

    public set x(value: number) {
        this.sprite.x = value;
        if (value > app.view.width - this.sprite.width / 2) {
            this.removeBullet();
            // Bullet.bullets.filter(bullet => bullet.x === this.sprite.x);
            // Bullet.bullets.splice(Bullet.bullets.findIndex(bullet => bullet.x === this.sprite.x), 1);
        };
    };
    public get x(): number {
        return this.sprite.x;
    };
    public set y(value: number) {
        this.sprite.y = value;
    };
    public get y(): number {
        return this.sprite.y;
    };

    public get movementSpeed(): number {
        return this._movementSpeed;
    };

    public getBounds(): any {
        return this.sprite.getBounds();
    };

    public removeBullet(): void {
        app.stage.removeChild(this.sprite);
        Bullet.bullets.splice(Bullet.bullets.findIndex(bullet => bullet.x === this.sprite.x), 1);
    };

};