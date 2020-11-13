import { app } from '../../index';
import { Bullet } from '../../Models/Other/Bullet';
import { BulletOrigin } from '../Types/BulletType';
export class Enemy {
    public static generatedEnemies: number = 0;
    private static enemyShipsTypes: string[] = ["enemyLeft", "enemyLeft2", "enemyLeft3"]; 
    private sprite: PIXI.Sprite;
    public static enemies: Enemy[] = [];

    public static movementSpeed: number = 1;

    public constructor() {
        this.sprite = PIXI.Sprite.from(app.loader.resources[`${Enemy.enemyShipsTypes[Math.round(Math.random()*2)]}`].url);
        this.sprite.scale.x = -0.1;
        this.sprite.scale.y = 0.1;
        this.sprite.x = app.view.width - this.sprite.width / 2;
        // this.sprite.y = Math.random() * app.view.height + this.sprite.height/2; 
        this.sprite.y = Math.random() * (app.view.height - 45) + 20; 
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
    // public set movementSpeed(value: number) {
    //     Enemy._movementSpeed += value;
    // };
    // public get movementSpeed(): number {
    //     return Enemy._movementSpeed;
    // };

    public getBounds(): any {
        return this.sprite.getBounds();
    };

    public removeEnemy(): void {
        app.stage.removeChild(this.sprite);
        Enemy.enemies.splice(Enemy.enemies.findIndex(enemy => (enemy.x === this.sprite.x)&&(enemy.y === this.sprite.y) ), 1);
        // Bullet.bullets.splice(Bullet.bullets.findIndex(bullet => (bullet.x === this.sprite.x)&&(bullet.y === this.sprite.y)), 1);
        // Enemy.enemies = Enemy.enemies.filter(enemy => enemy.x !== this.sprite.x);
    };
    public fire(): Bullet {
        return new Bullet((this.x - this.sprite.width / 2 - 8), this.y + 5, BulletOrigin.enemy);
    };
   
};