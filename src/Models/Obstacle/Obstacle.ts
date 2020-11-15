import { Enemy } from '../Enemy/Enemy';

export class Obstacle {
    private sprite: PIXI.Sprite;
    private _movementSpeed: number = 2;
    public static obstacles: Obstacle[] = [];
    private static obstacleTypes: string[] = ["rock1", "rock2", "rock3","rock4","rock5","rock6","rock7"];
    private obstacleType: string;
    public constructor(public app: PIXI.Application) {
        this.obstacleType = `${Obstacle.obstacleTypes[Math.round(Math.random() * (Obstacle.obstacleTypes.length - 1))]}`;
        this.sprite = PIXI.Sprite.from(app.loader.resources[`${this.obstacleType}`].url);
        this.sprite.scale.x = Math.random() * 1 + 0.2;
        this.sprite.scale.y = Math.random() * 1 + 0.2;
        this.sprite.x = app.view.width + this.sprite.width * this.sprite.scale.x / 2 + Math.random() * 100;
        this.sprite.y = app.view.height - 45;
        this.sprite.anchor.set(0.5);
        Obstacle.obstacles.push(this);
        app.stage.addChild(this.sprite);
    };

    public set x(value: number) {
        this.sprite.x = value;
        if (value < -this.sprite.width / 2) {
            this.removeObstacle();
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

    public removeObstacle(): void {
        this.app.stage.removeChild(this.sprite);
        Obstacle.obstacles.splice(Obstacle.obstacles.indexOf(this), 1);
    };
    
};