import { PlayerShip } from './Models/Player/PlayerShip';
import { Enemy } from './Models/Enemy/Enemy';
import { Parallax } from './Parallax/Parallax';
import { Bullet } from './Models/Other/Bullet';
import { BulletOrigin } from './Models/Types/BulletType';
export let keyssss: any = {};
export class App {
    public score: number = 0;
    public distanceTraveled: number = 0;
    public hiScore: number = 0;
    public livesInfo: any = document.querySelector("#lives");
    public scoreInfo: any = document.querySelector("#score");
    public bulletsInfo: any = document.querySelector("#bullets");
    public distanceTraveledInfo: any = document.querySelector("#distanceTraveled");
    public enemiesInfo = document.querySelector("#enemies");
    public hiScoreInfo = document.querySelector("#hiScore");
    public keyssss: any = {};

    public PLAYER: PlayerShip;
    public PARALLAX: Parallax;
    constructor(public app: PIXI.Application) {
        if (this.hiScoreInfo) this.hiScoreInfo.innerHTML = 'HiScore :' + 0;
        this.createApp();
        this.distanceTraveledInfo.innerHTML = 'Distance traveled: ' + JSON.stringify(this.distanceTraveled);
        document.body.appendChild(this.app.view);
        document.addEventListener("keydown", this.keysDown);
        document.addEventListener("keyup", this.keysUp);
        document.body.addEventListener("pointerdown", () => this.PLAYER.fire());
    };

    private createApp() {
        this.app.loader.baseUrl = "../src/assets";
        this.app.loader
            .add("shipRight", "Ships/shipRight.png")
            .add("enemyLeft", "Ships/plane_3_red.png")
            .add("enemyLeft2", "Ships/plane_3_blue.png")
            .add("enemyLeft3", "Ships/plane_3_yellow.png")
            .add("bulletRight", "Bullets/bulletRight.png")
            .add("bulletLeft", "Bullets/enemyBulletLeft.png")
            .add("foreground", "Mountains/foreground_mountains.png")
            .add("midground", "Mountains/midground_mountains.png")
            .add("farground", "Mountains/farground_mountains.png")

        this.app.loader.onProgress.add(this.showProgress);
        this.app.loader.onComplete.add(() => this.doneLoading(this.app));
        this.app.loader.onError.add(this.reportError);

        this.app.loader.load();
        this.app.stage.interactive = true;
    }
    private collision(a: any, b: any) { //function collision(a: Enemy, b: PlayerShip) { // ADD SOME INTERFACE FOR Enemy and Player calsses
        const aBox = a.getBounds();
        const bBox = b.getBounds();
        if ((a instanceof Enemy) && (b instanceof Bullet) && (b.origin === BulletOrigin.enemy)
            || (b instanceof Enemy) && (a instanceof Bullet) && (a.origin === BulletOrigin.enemy)) {
            return false;
        };

        if (aBox.x + aBox.width > bBox.x
            && aBox.x < bBox.x + bBox.width
            && aBox.y + aBox.height > bBox.y
            && aBox.y < bBox.y + bBox.height) {
            return true;
        } else {
            return false;
        }
    };

    private showProgress(e: any) {
        console.log(e.progress);
    };

    private doneLoading(app: PIXI.Application) {
        this.PARALLAX = new Parallax("farground", "midground", "foreground", app);
        this.PLAYER = new PlayerShip(app);

        setInterval(() => new Enemy(app), 1200);


        app.ticker.add(() => this.gameLoop(app));

    };



    private reset() {

        for (let i = 0; i < Enemy.enemies.length; ++i) {
            Enemy.enemies[i].removeEnemy();
            --i;
        };
        for (let i = 0; i < Bullet.bullets.length; ++i) {
            Bullet.bullets[i].removeBullet();
            --i;
        };
        this.PLAYER.livesLeft = 3;
        this.distanceTraveled = 0;
        if (this.score > this.hiScore) {
            this.hiScore = this.score;
        };
        this.score = 0;
        this.hiScoreInfo && (this.hiScoreInfo.innerHTML = 'HiScore: ' + JSON.stringify(this.hiScore));
    };
    private gameLoop(app: PIXI.Application) {
        this.PARALLAX.updateBg();
        if (this.PLAYER.livesLeft < 1) {
            this.reset();
        };


        this.distanceTraveled++;
        if (keyssss["87"] === true && this.PLAYER.y > 30) { // W - UP

            this.PLAYER.y -= this.PLAYER.movementSpeed;

        };
        if (keyssss["83"] === true && this.PLAYER.y < app.view.height - 30) { // S - DOWN
            this.PLAYER.y += this.PLAYER.movementSpeed;
        };
        if (keyssss["65"] === true && this.PLAYER.x > 50) { // A - LEFT
            this.PLAYER.x -= this.PLAYER.movementSpeed;
        };
        if (keyssss["68"] === true && this.PLAYER.x < app.view.width - 50) { // D - RIGHT
            this.PLAYER.x += this.PLAYER.movementSpeed;
        };
        if (keyssss["32"] === true) { // D - RIGHT
            this.PLAYER.fire();
            setTimeout(() => this.keyssss["32"] = false, 10);
        };
        Enemy.enemies.forEach(enemy => {
            const chance: number = Math.random() * 1000;
            if (chance < 5) {
                enemy.fire();
            };
        });
        Enemy.enemies.forEach(enemy => enemy.x -= enemy.movementSpeed);

        Enemy.enemies.forEach((enemy) => {
            if (this.collision(enemy, this.PLAYER)) {
                this.PLAYER.livesLeft--;
                enemy.removeEnemy();
            };
        });
        Bullet.bullets.forEach((bullet) => bullet.x += bullet.movementSpeed);
        Bullet.bullets.forEach((bullet, bulletIndex) => {
            if (this.collision(bullet, this.PLAYER)) {
                bullet.removeBullet();
                this.PLAYER.livesLeft--;
            };
            Enemy.enemies.forEach((enemy, enemyIndex) => {
                if (this.collision(enemy, bullet)) {
                    bullet.removeBullet();
                    enemy.removeEnemy();
                    this.score++;
                };
            })
        });


        this.livesInfo.innerHTML = 'Lives: ' + JSON.stringify(this.PLAYER.livesLeft);
        this.scoreInfo.innerHTML = 'Score: ' + JSON.stringify(this.score);
        this.distanceTraveledInfo.innerHTML = 'Distance traveled: ' + Math.ceil(this.distanceTraveled / 10);
        this.bulletsInfo.innerHTML = 'Bullets: ' + Bullet.bullets.map((bullet, index) => {
            if (index > 6) {
                return '...';
            }
            return JSON.stringify({
                X: bullet.x,
                Y: Math.round(bullet.y)
            })
        });

        if (this.enemiesInfo) {
            this.enemiesInfo.innerHTML = 'Enemies: ' + Enemy.enemies.map((enemy, index) => {
                if (index > 6) {
                    return '...';
                }
                return JSON.stringify({
                    X: enemy.x,
                    Y: Math.round(enemy.y)
                })
            });
        }


    };

    private reportError(e: any) {
        console.log('ERROR : ' + e.message);
    };

    public keysDown(e: any) {
        keyssss[`${e.keyCode}`] = true;
    };

    public keysUp(e: any) {
        keyssss[`${e.keyCode}`] = false;
    };

}