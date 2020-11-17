import { PlayerShip } from './Models/Player/PlayerShip';
import { Enemy } from './Models/Enemy/Enemy';
import { Parallax } from './Parallax/Parallax';
import { Bullet } from './Models/Other/Bullet';
import { Obstacle } from './Models/Obstacle/Obstacle';
import { BulletOrigin } from './Models/Types/BulletType';
import { Explosion } from './Effects/Explosion';
import { BonusLife } from './Models/Other/BonusLife';
export class App {
    private score: number = 0;
    private distanceTraveled: number = 0;
    private hiScore: number = 0;
    private keysPressed: any = {};
    
    
    static InfoText: PIXI.Text = new PIXI.Text("Score: ", {
        fontSize: 35,
        fill: "#ffaa",
        align: "center",
        stroke: "#bbbbbb",
        strokeThickness: 0,
    });
    
    private newBonusLife: BonusLife;
    private PLAYER: PlayerShip;
    private PARALLAX: Parallax;
    constructor(public app: PIXI.Application) {
        this.loadAssets();
        document.body.appendChild(this.app.view);
        document.addEventListener("keydown", this.keysDown.bind(this));
        document.addEventListener("keyup", this.keysUp.bind(this));
        document.body.addEventListener("pointerdown", () => this.PLAYER.fire());
        document.body.addEventListener("contextmenu", (e) => {
            e.preventDefault();
        });

        App.InfoText.position.y = app.view.height - App.InfoText.height;

    };

    private collision(a: any, b: any) {
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
    private reportError(e: any) {
        console.log('ERROR : ' + e.message);
    };

    public keysDown(e: any) {
        this.keysPressed[`${e.keyCode}`] = true;
    };

    public keysUp(e: any) {
        this.keysPressed[`${e.keyCode}`] = false;
    };


    private doneLoading(app: PIXI.Application) {
        this.PARALLAX = new Parallax("farground", "midground", "foreground", app);
        this.PLAYER = new PlayerShip(app);
        app.ticker.add(() => this.gameLoop(app));
    };

    private gameLoop(app: PIXI.Application) {
        App.InfoText.text =
            `Lives: ${this.PLAYER.livesLeft}    Score: ${this.score}    HiScore: ${this.hiScore}    Distance traveled: ${this.distanceTraveled}`

        this.PARALLAX.updateBackground();
        if (this.PLAYER.livesLeft < 1) {
            this.reset();
        };

        this.distanceTraveled++;
        if (this.keysPressed["87"] === true && this.PLAYER.y > 30) { // W - UP
            this.PLAYER.y -= this.PLAYER.movementSpeed;
        };
        if (this.keysPressed["83"] === true && this.PLAYER.y < app.view.height - 30) { // S - DOWN
            this.PLAYER.y += this.PLAYER.movementSpeed;
        };
        if (this.keysPressed["65"] === true && this.PLAYER.x > 50) { // A - LEFT
            this.PLAYER.x -= this.PLAYER.movementSpeed;
        };
        if (this.keysPressed["68"] === true && this.PLAYER.x < app.view.width - 50) { // D - RIGHT
            this.PLAYER.x += this.PLAYER.movementSpeed;
        };
        if (this.keysPressed["32"] === true) { // D - RIGHT
            this.PLAYER.fire();
            setTimeout(() => this.keysPressed["32"] = false, 10);
        };
        if (this.keysPressed["81"] === true) { // DELETE THISS++++++++======================================
            console.log(Bullet.bullets);
            setTimeout(() => this.keysPressed["81"] = false, 10);
        };// DELETE THISS++++++++======================================++++++++++++++++++++++++++++++++++++======

        if (this.distanceTraveled % 80 === 0) new Enemy(app);
        if (this.distanceTraveled % 350 === 0) new Obstacle(app);
        if ((this.distanceTraveled % 500 === 0) && ((this.score / this.distanceTraveled ) > 0.02 )) {
            this.newBonusLife = new BonusLife(app);
            this.newBonusLife.isInRange = true;
        };

        if (this.newBonusLife) {
            if (this.newBonusLife.isInRange) {
                this.newBonusLife.x -= this.newBonusLife.movementSpeed;
                if (this.collision(this.PLAYER, this.newBonusLife)) {
                    this.PLAYER.livesLeft ++;
                    this.newBonusLife.removeBonusLife();
                };
            };
        };
        Enemy.enemies.forEach(enemy => {
            if (Math.random() * 1000 < 3) {
                enemy.fire();
            };
        });
        Obstacle.obstacles.forEach(obstacle => obstacle.x -= obstacle.movementSpeed);

        Enemy.enemies.forEach((enemy) => {
            enemy.x -= enemy.movementSpeed;
            if (enemy.isStriked) {
                enemy.y += enemy.fallSpeed;
                enemy.fallSpeed += 0.3;
            };
            if (this.collision(enemy, this.PLAYER)) {
                this.PLAYER.livesLeft--;
                enemy.removeEnemy();
            };
        });
        Bullet.bullets.forEach((bullet) => {
            bullet.x += bullet.movementSpeed;
            if (this.collision(bullet, this.PLAYER)) {
                new Explosion(app, bullet.x, bullet.y, true);
                bullet.removeBullet();
                this.PLAYER.livesLeft--;
            };
            Enemy.enemies.forEach((enemy) => {
                if (this.collision(enemy, bullet)) {
                    new Explosion(app, bullet.x, bullet.y, true);
                    bullet.removeBullet();
                    if (enemy.isStriked) {
                        this.score += 2;
                        new Explosion(app, bullet.x, bullet.y, true);
                        enemy.removeEnemy();
                    } else {
                        enemy.isStriked = true;
                        this.score++;
                    };
                };
            })
        });

        Obstacle.obstacles.forEach((obstacle) => {
            if (this.collision(obstacle, this.PLAYER)) {
                this.PLAYER.livesLeft = 0;
            };
        });
        app.stage.addChild(App.InfoText);

    };

    private reset() {

        while (Enemy.enemies.length > 0) {
            Enemy.enemies[0].removeEnemy(false);
        };

        while (Bullet.bullets.length > 0) {
            Bullet.bullets[0].removeBullet();
        };
        this.newBonusLife && this.newBonusLife.removeBonusLife();

        while (Obstacle.obstacles.length > 0) {
            Obstacle.obstacles[0].removeObstacle();
        };

        this.PLAYER.removePlayer();
        this.PLAYER = new PlayerShip(this.app);
        this.distanceTraveled = 0;

        if (this.score > this.hiScore) {
            this.hiScore = this.score;
        };
        this.score = 0;
    };

    private loadAssets() {
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
            .add("rock1", "Obstacles/rock1.png")
            .add("rock2", "Obstacles/rock2.png")
            .add("rock3", "Obstacles/rock3.png")
            .add("rock4", "Obstacles/rock4.png")
            .add("rock5", "Obstacles/rock5.png")
            .add("rock6", "Obstacles/rock6.png")
            .add("rock7", "Obstacles/rock7.png")
            .add("expl1", "Explosion/keyframes/explosion_01.png")
            .add("expl2", "Explosion/keyframes/explosion_02.png")
            .add("expl3", "Explosion/keyframes/explosion_03.png")
            .add("expl4", "Explosion/keyframes/explosion_04.png")
            .add("expl5", "Explosion/keyframes/explosion_05.png")
            .add("expl6", "Explosion/keyframes/explosion_06.png")
            .add("expl7", "Explosion/keyframes/explosion_07.png")
            .add("expl8", "Explosion/keyframes/explosion_08.png")
            .add("expl9", "Explosion/keyframes/explosion_09.png");
        for (let i = 1; i <= 30; ++i) {
            this.app.loader.add(`live${i}`, `BonusLive/live${i}.png`);
        };


        this.app.loader.onProgress.add(this.showProgress);
        this.app.loader.onComplete.add(() => this.doneLoading(this.app));
        this.app.loader.onError.add(this.reportError);

        this.app.loader.load();
        this.app.stage.interactive = true;
    };
};