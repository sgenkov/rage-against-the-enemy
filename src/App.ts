import { PlayerShip } from './Models/Player/PlayerShip';
import { Enemy } from './Models/Enemy/Enemy';
import { Parallax } from './Parallax/Parallax';
import { Bullet } from './Models/Other/Bullet';
import { Obstacle } from './Models/Obstacle/Obstacle';
import { BulletOrigin } from './Models/Types/BulletType';

export class App {
    public score: number = 0;
    public distanceTraveled: number = 0;
    public hiScore: number = 0;
    public keysPressed: any = {};
    private generateEnemyInterval: NodeJS.Timeout;
    private generateObstacleInterval: NodeJS.Timeout;

    // public livesInfo: any = document.querySelector("#lives");
    // public scoreInfo: any = document.querySelector("#score");
    // public bulletsInfo: any = document.querySelector("#bullets");
    // public distanceTraveledInfo: any = document.querySelector("#distanceTraveled");
    // public enemiesInfo = document.querySelector("#enemies");
    // public hiScoreInfo = document.querySelector("#hiScore");
    static InfoText: PIXI.Text = new PIXI.Text("Score: ", {
        fontSize: 35,
        fill: "#ffaa",
        align: "center",
        stroke: "#bbbbbb",
        strokeThickness: 0,
    });

    private PLAYER: PlayerShip;
    private PARALLAX: Parallax;
    constructor(public app: PIXI.Application) {
        // if (this.hiScoreInfo) this.hiScoreInfo.innerHTML = 'HiScore :' + 0;
        this.loadAssets();
        // this.distanceTraveledInfo.innerHTML = 'Distance traveled: ' + JSON.stringify(this.distanceTraveled);
        document.body.appendChild(this.app.view);
        document.addEventListener("keydown", this.keysDown.bind(this));
        document.addEventListener("keyup", this.keysUp.bind(this));
        document.body.addEventListener("pointerdown", () => this.PLAYER.fire());
        App.InfoText.position.y = app.view.height - App.InfoText.height;

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
            .add("rock", "Obstacles/rock1.png")
            .add("rock2", "Obstacles/rock2.png")
            .add("rock3", "Obstacles/rock3.png")

        this.app.loader.onProgress.add(this.showProgress);
        this.app.loader.onComplete.add(() => this.doneLoading(this.app));
        this.app.loader.onError.add(this.reportError);

        this.app.loader.load();
        this.app.stage.interactive = true;
    }
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

        this.generateEnemyInterval = setInterval(() => new Enemy(app), 1200);
        this.generateObstacleInterval = setInterval(() => new Obstacle(app), 3950);

        app.ticker.add(() => this.gameLoop(app));
    };



    private reset() {

        while (Enemy.enemies.length > 0) {
            Enemy.enemies[0].removeEnemy();
        };

        while (Bullet.bullets.length > 0) {
            Bullet.bullets[0].removeBullet();
        };

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
        // this.hiScoreInfo && (this.hiScoreInfo.innerHTML = 'HiScore: ' + JSON.stringify(this.hiScore));
    };

     fn() {
        let res;
        res = document.onblur;
        return res;
    }
    private gameLoop(app: PIXI.Application) {
        // console.count();
        // console.log('enemy interval' + JSON.stringify(this.generateObstacleInterval) );
        // console.log(this.fn());
        
       

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
        Enemy.enemies.forEach(enemy => {
            const chance: number = Math.random() * 1000;
            if (chance < 5) {
                enemy.fire();
            };
        });
        Enemy.enemies.forEach(enemy => enemy.x -= enemy.movementSpeed);
        Obstacle.obstacles.forEach(obstacle => obstacle.x -= obstacle.movementSpeed);
        Bullet.bullets.forEach((bullet) => bullet.x += bullet.movementSpeed);

        Enemy.enemies.forEach((enemy) => {
            if (this.collision(enemy, this.PLAYER)) {
                this.PLAYER.livesLeft--;
                enemy.removeEnemy();
            };
        });
        Bullet.bullets.forEach((bullet) => {
            if (this.collision(bullet, this.PLAYER)) {
                bullet.removeBullet();
                this.PLAYER.livesLeft--;
            };
            Enemy.enemies.forEach((enemy) => {
                if (this.collision(enemy, bullet)) {
                    bullet.removeBullet();
                    enemy.removeEnemy();
                    this.score++;
                };
            })
        });

        Obstacle.obstacles.forEach((obstacle) => {
            if (this.collision(obstacle, this.PLAYER)) {
                this.PLAYER.livesLeft = 0;
            };
        });
        app.stage.addChild(App.InfoText);

        // this.livesInfo.innerHTML = 'Lives: ' + JSON.stringify(this.PLAYER.livesLeft);
        // this.scoreInfo.innerHTML = 'Score: ' + JSON.stringify(this.score);
        // this.distanceTraveledInfo.innerHTML = 'Distance traveled: ' + Math.ceil(this.distanceTraveled / 10);
        // this.bulletsInfo.innerHTML = 'Bullets: ' + Bullet.bullets.map((bullet, index) => {
        //     if (index > 6) {
        //         return '...';
        //     }
        //     return JSON.stringify({
        //         X: bullet.x,
        //         Y: Math.round(bullet.y)
        //     })
        // });

        // if (this.enemiesInfo) {
        //     this.enemiesInfo.innerHTML = 'Enemies: ' + Enemy.enemies.map((enemy, index) => {
        //         if (index > 6) {
        //             return '...';
        //         }
        //         return JSON.stringify({
        //             X: enemy.x,
        //             Y: Math.round(enemy.y)
        //         })
        //     });
        // }
    };


}