import { Bullet } from '../../Models/Other/Bullet';
import { BulletOrigin } from '../Types/BulletType';
import { Explosion } from '../../Effects/Explosion';
export class Enemy {
    public static generatedEnemies: number = 0;
    private static enemyShipsTypes: string[] = ["enemyLeft", "enemyLeft2", "enemyLeft3"];
    private sprite: PIXI.Sprite;
    public static enemies: Enemy[] = [];
    private shipType: string;
    private _fallSpeed: number = 0;
    private _isStriked: boolean = false;

    private _movementSpeed: number = 1;

    public constructor(public app: PIXI.Application) {
        this.shipType = Enemy.enemyShipsTypes[Math.round(Math.random() * 2)];
        this.sprite = PIXI.Sprite.from(app.loader.resources[this.shipType].url);
        this.sprite.scale.x = -0.1;
        this.sprite.scale.y = 0.1;
        this.sprite.x = app.view.width + this.sprite.width;
        this.sprite.y = Math.random() * (app.view.height - 45) + 20;
        this.sprite.anchor.set(0.5);
        this.movementSpeed = this.setSpeed();
        // this.sprite.rotation=Math.atan(this._fallSpeed / this._movementSpeed);
        Enemy.generatedEnemies++;
        Enemy.enemies.push(this);
        app.stage.addChild(this.sprite);
    };

    public set x(value: number) {
        this.sprite.x = value;
        // if(this._isStriked){
        //     this.sprite.rotation = -Math.atan(this._fallSpeed / this._movementSpeed);
        // };
        this.sprite.rotation = -Math.atan(this._fallSpeed / this._movementSpeed);
        if (value < - this.sprite.width) {
            this.removeEnemy();
        };
    };
    public get x(): number {
        return this.sprite.x;
    };
    public set y(value: number) {
        this.sprite.y = value;
        if (this.sprite.y > this.app.view.height - this.sprite.height) {
            this.removeEnemy();
        };
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

    public set isStriked(value: boolean) {
        this._isStriked = value;
    };
    public get isStriked(): boolean {
        return this._isStriked;
    };

    public get fallSpeed(): number {
        return this._fallSpeed;
    };

    public set fallSpeed(value: number) {
        this._fallSpeed = value;
    };
    


    public getBounds(): any {
        return this.sprite.getBounds();
    };

    public removeEnemy(): void {
        new Explosion(this.app, this.sprite.x, this.sprite.y);
        this.app.stage.removeChild(this.sprite);
        Enemy.enemies.splice(Enemy.enemies.indexOf(this), 1);
    };
    public fire(): Bullet {
        return (
            new Bullet((this.x - this.sprite.width / 2 - (
                (
                    this.movementSpeed > 2)
                    ? 9
                    : 8
            )),
                this.y + 5, BulletOrigin.enemy,
                this.app
            )
        );
    };

    private setSpeed(): number {
        return Enemy.enemyShipsTypes.indexOf(this.shipType) + 1;
    };

    // public deadlyStricken(): void {
    //     setInterval(() => {
    //         this.y += this.fallSpeed;
    //     }, 100);
    // };

};