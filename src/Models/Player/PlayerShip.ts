import { app } from '../../index';
import { Bullet } from '../Other/Bullet';
import { BulletOrigin } from '../Types/BulletType';
export class PlayerShip {

    public static shipsCreated = 0;
    private sprite: PIXI.Sprite;
    private _livesLeft: number = 3;
    private _movementSpeed: number = 5;

    public constructor() {
        this.sprite = PIXI.Sprite.from(app.loader.resources.shipRight.url);
        // this.sprite = PIXI.Sprite.from('/src/images/shipRight.png'); 
        // this.printer(app.loader.resources);
        this.sprite.scale.x = 0.1;
        this.sprite.scale.y = 0.1;
        this.sprite.x = this.sprite.width / 2;
        this.sprite.y = app.view.height / 2;
        this.sprite.anchor.set(0.5);
        ++PlayerShip.shipsCreated;

        // this.livesLeft = 3;
        // console.log(this.sprite.texture);

        // this.sprite.y = GameApp.GroundPosition;
        // this.sprite.animationSpeed = 0.05;
        // this.sprite.play();
        app.stage.addChild(this.sprite);
        // GameApp.Stage.addChild(this.sprite);
    }

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
        return new Bullet(this.x + this.sprite.width / 2 + 1, this.y + 5, BulletOrigin.player );
    };


    // private collidesWith(otherSprite: PIXI.Sprite) {
    //     let ab = this.sprite.getBounds();
    //     let bb = otherSprite.getBounds();
    //     return !(
    //         ab.x > bb.x + bb.width ||
    //         ab.x + ab.width < bb.x ||
    //         ab.y + ab.height < bb.y ||
    //         ab.y > bb.y + bb.height
    //     );
    // }

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