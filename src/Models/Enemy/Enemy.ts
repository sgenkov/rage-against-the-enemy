import { app } from '../../index';
export class Enemy {
    public static generatedEnemies: number = 0;
    private sprite: PIXI.Sprite;
    public static enemies: Enemy[] = [];

    private _movementSpeed: number = 2;

    public constructor() {
        this.sprite = PIXI.Sprite.from(app.loader.resources.enemyLeft.url);
        this.sprite.x = app.view.width - this.sprite.width / 2;
        this.sprite.y = app.view.height / 2;
        this.sprite.anchor.set(0.5);
        Enemy.generatedEnemies++;
        Enemy.enemies.push(this);

        app.stage.addChild(this.sprite);
    };

    public set x(value: number) {
    this.sprite.x = value;
  }
  public get x(): number {
      return this.sprite.x;
  }
  public set y(value: number) {
    this.sprite.y = value;
  }
  public get y(): number {
      return this.sprite.y;
  }
    public get movementSpeed(): number {
        return this._movementSpeed;
    };


    //   private collidesWith(otherSprite: PIXI.Sprite) {
    //     let ab = this.sprite.getBounds();
    //     let bb = otherSprite.getBounds();
    //     return !(
    //       ab.x > bb.x + bb.width ||
    //       ab.x + ab.width < bb.x ||
    //       ab.y + ab.height < bb.y ||
    //       ab.y > bb.y + bb.height
    //     );
    //   }

    //   public Update(delta: number, activeEntities: Array<WorldObject>) {
    //     if (this.sprite.y >= GameApp.GroundPosition) {
    //       this.sprite.y = GameApp.GroundPosition;
    //       this.verticalSpeed = 0;
    //       this.airborne = false;
    //     }

    //     if (this.airborne) {
    //       this.verticalSpeed += delta / 3;
    //     }

    //     if (GameApp.PressedSpace && !this.airborne) {
    //       this.airborne = true;
    //       this.verticalSpeed = -5;
    //     }
    //     this.sprite.y += this.verticalSpeed * delta;

    //     for (const currentEntity of GameApp.ActiveEntities) {
    //       if (currentEntity.solid && this.collidesWith(currentEntity.sprite)) {
    //         GameApp.GameOver = true;
    //       }
    //     }
    //   }
};