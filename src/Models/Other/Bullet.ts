import { app } from '../../index';
import { BulletOrigin } from '../Types/BulletType';
export class Bullet {
    public static bullets: Bullet[] = [];
    private sprite: PIXI.Sprite;
    private _movementSpeed: number; 
    public _origin: BulletOrigin;

    public constructor(ownerX: number, ownerY: number, origin: BulletOrigin) {
        const bullet = (origin === BulletOrigin.player? "bulletRight" : "bulletLeft")
        this.sprite = PIXI.Sprite.from(app.loader.resources[(origin === BulletOrigin.player)? "bulletRight" : "bulletLeft"].url);
        this.sprite.x = ownerX;
        this.sprite.y = ownerY;
        this.sprite.scale.x = ((origin === BulletOrigin.player)? 0.2 : -0.2);
        this.sprite.scale.y = 0.2;
        this.sprite.anchor.set(0.5);
        this.origin = origin;
        this.movementSpeed = ((origin === BulletOrigin.player)? 20 : -10);
        Bullet.bullets.push(this);
        app.stage.addChild(this.sprite);
    };

    public set x(value: number) {
        this.sprite.x = value;
        if ((value > app.view.width - this.sprite.width / 2) || (value < 0)) {
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


    public set movementSpeed(value: number) {
        this._movementSpeed = value;
    };

    public get movementSpeed(): number {
        return this._movementSpeed;
    };

    public get origin(): BulletOrigin {
        return this._origin;
    };

    public set origin(value: BulletOrigin) {
        this._origin = value;
    };

    public getBounds(): any {
        return this.sprite.getBounds();
    };

    public removeBullet(): void {
        app.stage.removeChild(this.sprite);
        Bullet.bullets.splice(Bullet.bullets.findIndex(bullet => (bullet.x === this.sprite.x)&&(bullet.y === this.sprite.y)), 1);
    };

};