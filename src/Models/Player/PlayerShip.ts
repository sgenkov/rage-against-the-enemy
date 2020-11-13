// import { app } from '../../index';
import { Bullet } from '../Other/Bullet';
import { BulletOrigin } from '../Types/BulletType';
// import { App } from '../../App';
export class PlayerShip {

    public static shipsCreated = 0;
    private sprite: PIXI.Sprite;
    private _livesLeft: number = 3;
    private _movementSpeed: number = 5;

    public constructor(public app: PIXI.Application) {
        this.sprite = PIXI.Sprite.from(app.loader.resources.shipRight.url);
        this.sprite.scale.x = 0.1;
        this.sprite.scale.y = 0.1;
        this.sprite.x = this.sprite.width / 2;
        this.sprite.y = app.view.height / 2;
        this.sprite.anchor.set(0.5);
        ++PlayerShip.shipsCreated;
        app.stage.addChild(this.sprite);
    };

    public set x(value: number) {
        this.sprite.x = value;
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

    public set movementSpeed(value: number) {
        this._movementSpeed = value;
    };

    public get livesLeft(): number {
        return this._livesLeft;
    };

    public set livesLeft(value: number) {
        this._livesLeft = value;
    };

    public getBounds(): any {
        return this.sprite.getBounds();
    };

    public fire(): Bullet {
        return new Bullet(this.x + this.sprite.width / 2 + 1, this.y + 5, BulletOrigin.player, this.app );
    };
};