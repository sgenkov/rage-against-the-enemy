import { Bullet } from '../../Models/Other/Bullet';
import { BulletOrigin } from '../Types/BulletType';
export class Enemy {
    public static generatedEnemies: number = 0;
    private static enemyShipsTypes: string[] = ["enemyLeft", "enemyLeft2", "enemyLeft3"];
    private sprite: PIXI.Sprite;
    public static enemies: Enemy[] = [];
    private shipType: string;

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
        Enemy.generatedEnemies++;
        Enemy.enemies.push(this);
        app.stage.addChild(this.sprite);
    };

    public set x(value: number) {
        this.sprite.x = value;
        if (value < -this.sprite.width / 2) {
            this.removeEnemy();
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

    public getBounds(): any {
        return this.sprite.getBounds();
    };

    public removeEnemy(): void {
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

};