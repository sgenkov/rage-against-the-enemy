import { app } from '../../index';
import { Bullet } from '../../Models/Other/Bullet';
import { BulletOrigin } from '../Types/BulletType';
export class Enemy {
    public static generatedEnemies: number = 0;
    private sprite: PIXI.Sprite;
    public static enemies: Enemy[] = [];

    private _movementSpeed: number = 2;

    public constructor() {
        this.sprite = PIXI.Sprite.from(app.loader.resources.enemyLeft.url);
        this.sprite.x = app.view.width - this.sprite.width / 2;
        this.sprite.y = Math.random() * app.view.height; //app.view.height / 2;
        this.sprite.anchor.set(0.5);
        Enemy.generatedEnemies++;
        Enemy.enemies.push(this);
        
        app.stage.addChild(this.sprite);
    };

    public set x(value: number) {
        this.sprite.x = value;
        if (value < this.sprite.width / 2) {
            this.removeEnemy();
            // Enemy.enemies.splice(Enemy.enemies.findIndex(enemy => enemy.x === this.sprite.x), 1);
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

    public removeEnemy(): void {
        app.stage.removeChild(this.sprite);
        Enemy.enemies.splice(Enemy.enemies.findIndex(enemy => enemy.x === this.sprite.x), 1);
    };
    public fire(): Bullet {
        return new Bullet((this.x - this.sprite.width / 2 - 8), this.y, BulletOrigin.enemy);
    };
   
};