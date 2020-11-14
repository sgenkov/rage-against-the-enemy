(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const PlayerShip_1 = require("./Models/Player/PlayerShip");
const Enemy_1 = require("./Models/Enemy/Enemy");
const Parallax_1 = require("./Parallax/Parallax");
const Bullet_1 = require("./Models/Other/Bullet");
const Obstacle_1 = require("./Models/Obstacle/Obstacle");
const BulletType_1 = require("./Models/Types/BulletType");
class App {
    constructor(app) {
        this.app = app;
        this.score = 0;
        this.distanceTraveled = 0;
        this.hiScore = 0;
        this.keysPressed = {};
        this.loadAssets();
        document.body.appendChild(this.app.view);
        document.addEventListener("keydown", this.keysDown.bind(this));
        document.addEventListener("keyup", this.keysUp.bind(this));
        document.body.addEventListener("pointerdown", () => this.PLAYER.fire());
        App.InfoText.position.y = app.view.height - App.InfoText.height;
    }
    ;
    loadAssets() {
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
            .add("rock3", "Obstacles/rock3.png");
        this.app.loader.onProgress.add(this.showProgress);
        this.app.loader.onComplete.add(() => this.doneLoading(this.app));
        this.app.loader.onError.add(this.reportError);
        this.app.loader.load();
        this.app.stage.interactive = true;
    }
    collision(a, b) {
        const aBox = a.getBounds();
        const bBox = b.getBounds();
        if ((a instanceof Enemy_1.Enemy) && (b instanceof Bullet_1.Bullet) && (b.origin === BulletType_1.BulletOrigin.enemy)
            || (b instanceof Enemy_1.Enemy) && (a instanceof Bullet_1.Bullet) && (a.origin === BulletType_1.BulletOrigin.enemy)) {
            return false;
        }
        ;
        if (aBox.x + aBox.width > bBox.x
            && aBox.x < bBox.x + bBox.width
            && aBox.y + aBox.height > bBox.y
            && aBox.y < bBox.y + bBox.height) {
            return true;
        }
        else {
            return false;
        }
    }
    ;
    showProgress(e) {
        console.log(e.progress);
    }
    ;
    reportError(e) {
        console.log('ERROR : ' + e.message);
    }
    ;
    keysDown(e) {
        this.keysPressed[`${e.keyCode}`] = true;
    }
    ;
    keysUp(e) {
        this.keysPressed[`${e.keyCode}`] = false;
    }
    ;
    doneLoading(app) {
        this.PARALLAX = new Parallax_1.Parallax("farground", "midground", "foreground", app);
        this.PLAYER = new PlayerShip_1.PlayerShip(app);
        app.ticker.add(() => this.gameLoop(app));
    }
    ;
    reset() {
        while (Enemy_1.Enemy.enemies.length > 0) {
            Enemy_1.Enemy.enemies[0].removeEnemy();
        }
        ;
        while (Bullet_1.Bullet.bullets.length > 0) {
            Bullet_1.Bullet.bullets[0].removeBullet();
        }
        ;
        while (Obstacle_1.Obstacle.obstacles.length > 0) {
            Obstacle_1.Obstacle.obstacles[0].removeObstacle();
        }
        ;
        this.PLAYER.removePlayer();
        this.PLAYER = new PlayerShip_1.PlayerShip(this.app);
        this.distanceTraveled = 0;
        if (this.score > this.hiScore) {
            this.hiScore = this.score;
        }
        ;
        this.score = 0;
    }
    ;
    gameLoop(app) {
        App.InfoText.text =
            `Lives: ${this.PLAYER.livesLeft}    Score: ${this.score}    HiScore: ${this.hiScore}    Distance traveled: ${this.distanceTraveled}`;
        this.PARALLAX.updateBackground();
        if (this.PLAYER.livesLeft < 1) {
            this.reset();
        }
        ;
        this.distanceTraveled++;
        if (this.keysPressed["87"] === true && this.PLAYER.y > 30) { // W - UP
            this.PLAYER.y -= this.PLAYER.movementSpeed;
        }
        ;
        if (this.keysPressed["83"] === true && this.PLAYER.y < app.view.height - 30) { // S - DOWN
            this.PLAYER.y += this.PLAYER.movementSpeed;
        }
        ;
        if (this.keysPressed["65"] === true && this.PLAYER.x > 50) { // A - LEFT
            this.PLAYER.x -= this.PLAYER.movementSpeed;
        }
        ;
        if (this.keysPressed["68"] === true && this.PLAYER.x < app.view.width - 50) { // D - RIGHT
            this.PLAYER.x += this.PLAYER.movementSpeed;
        }
        ;
        if (this.keysPressed["32"] === true) { // D - RIGHT
            this.PLAYER.fire();
            setTimeout(() => this.keysPressed["32"] = false, 10);
        }
        ;
        if (this.distanceTraveled % 60 === 0)
            new Enemy_1.Enemy(app);
        if (this.distanceTraveled % 250 === 0)
            new Obstacle_1.Obstacle(app);
        Enemy_1.Enemy.enemies.forEach(enemy => {
            if (Math.random() * 1000 < 5) {
                enemy.fire();
            }
            ;
        });
        Obstacle_1.Obstacle.obstacles.forEach(obstacle => obstacle.x -= obstacle.movementSpeed);
        Enemy_1.Enemy.enemies.forEach((enemy) => {
            enemy.x -= enemy.movementSpeed;
            if (this.collision(enemy, this.PLAYER)) {
                this.PLAYER.livesLeft--;
                enemy.removeEnemy();
            }
            ;
        });
        Bullet_1.Bullet.bullets.forEach((bullet) => {
            bullet.x += bullet.movementSpeed;
            if (this.collision(bullet, this.PLAYER)) {
                bullet.removeBullet();
                this.PLAYER.livesLeft--;
            }
            ;
            Enemy_1.Enemy.enemies.forEach((enemy) => {
                if (this.collision(enemy, bullet)) {
                    bullet.removeBullet();
                    enemy.removeEnemy();
                    this.score++;
                }
                ;
            });
        });
        Obstacle_1.Obstacle.obstacles.forEach((obstacle) => {
            if (this.collision(obstacle, this.PLAYER)) {
                this.PLAYER.livesLeft = 0;
            }
            ;
        });
        app.stage.addChild(App.InfoText);
    }
    ;
}
exports.App = App;
App.InfoText = new PIXI.Text("Score: ", {
    fontSize: 35,
    fill: "#ffaa",
    align: "center",
    stroke: "#bbbbbb",
    strokeThickness: 0,
});
;

},{"./Models/Enemy/Enemy":2,"./Models/Obstacle/Obstacle":3,"./Models/Other/Bullet":4,"./Models/Player/PlayerShip":5,"./Models/Types/BulletType":6,"./Parallax/Parallax":7}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Enemy = void 0;
const Bullet_1 = require("../../Models/Other/Bullet");
const BulletType_1 = require("../Types/BulletType");
class Enemy {
    constructor(app) {
        this.app = app;
        this._movementSpeed = 1;
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
    }
    ;
    set x(value) {
        this.sprite.x = value;
        if (value < -this.sprite.width / 2) {
            this.removeEnemy();
        }
        ;
    }
    ;
    get x() {
        return this.sprite.x;
    }
    ;
    set y(value) {
        this.sprite.y = value;
    }
    ;
    get y() {
        return this.sprite.y;
    }
    ;
    set movementSpeed(value) {
        this._movementSpeed = value;
    }
    ;
    get movementSpeed() {
        return this._movementSpeed;
    }
    ;
    getBounds() {
        return this.sprite.getBounds();
    }
    ;
    removeEnemy() {
        this.app.stage.removeChild(this.sprite);
        Enemy.enemies.splice(Enemy.enemies.indexOf(this), 1);
    }
    ;
    fire() {
        return (new Bullet_1.Bullet((this.x - this.sprite.width / 2 - ((this.movementSpeed > 2)
            ? 9
            : 8)), this.y + 5, BulletType_1.BulletOrigin.enemy, this.app));
    }
    ;
    setSpeed() {
        return Enemy.enemyShipsTypes.indexOf(this.shipType) + 1;
    }
    ;
}
exports.Enemy = Enemy;
Enemy.generatedEnemies = 0;
Enemy.enemyShipsTypes = ["enemyLeft", "enemyLeft2", "enemyLeft3"];
Enemy.enemies = [];
;

},{"../../Models/Other/Bullet":4,"../Types/BulletType":6}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Obstacle = void 0;
class Obstacle {
    constructor(app) {
        this.app = app;
        this._movementSpeed = 2;
        this.obstacleType = `${Obstacle.obstacleTypes[Math.round(Math.random() * 2)]}`;
        this.sprite = PIXI.Sprite.from(app.loader.resources[`${this.obstacleType}`].url);
        this.sprite.scale.x = Math.random() * 1 + 0.2;
        this.sprite.scale.y = Math.random() * 1 + 0.2;
        this.sprite.x = app.view.width + this.sprite.width * this.sprite.scale.x / 2 + Math.random() * 100;
        this.sprite.y = app.view.height - 45;
        this.sprite.anchor.set(0.5);
        Obstacle.obstacles.push(this);
        app.stage.addChild(this.sprite);
    }
    ;
    set x(value) {
        this.sprite.x = value;
        if (value < -this.sprite.width / 2) {
            this.removeObstacle();
        }
        ;
    }
    ;
    get x() {
        return this.sprite.x;
    }
    ;
    set y(value) {
        this.sprite.y = value;
    }
    ;
    get y() {
        return this.sprite.y;
    }
    ;
    set movementSpeed(value) {
        this._movementSpeed = value;
    }
    ;
    get movementSpeed() {
        return this._movementSpeed;
    }
    ;
    getBounds() {
        return this.sprite.getBounds();
    }
    ;
    removeObstacle() {
        this.app.stage.removeChild(this.sprite);
        Obstacle.obstacles.splice(Obstacle.obstacles.indexOf(this), 1);
    }
    ;
}
exports.Obstacle = Obstacle;
Obstacle.obstacleTypes = ["rock", "rock2", "rock3"];
Obstacle.obstacles = [];
;

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bullet = void 0;
const BulletType_1 = require("../Types/BulletType");
class Bullet {
    constructor(ownerX, ownerY, origin, app) {
        this.app = app;
        const bullet = (origin === BulletType_1.BulletOrigin.player ? "bulletRight" : "bulletLeft");
        this.sprite = PIXI.Sprite.from(app.loader.resources[(origin === BulletType_1.BulletOrigin.player) ? "bulletRight" : "bulletLeft"].url);
        this.sprite.x = ownerX;
        this.sprite.y = ownerY;
        this.sprite.scale.x = ((origin === BulletType_1.BulletOrigin.player) ? 0.2 : -0.2);
        this.sprite.scale.y = 0.2;
        this.sprite.anchor.set(0.5);
        this.origin = origin;
        this.movementSpeed = ((origin === BulletType_1.BulletOrigin.player) ? 20 : -10);
        Bullet.bullets.push(this);
        app.stage.addChild(this.sprite);
    }
    ;
    set x(value) {
        this.sprite.x = value;
        if ((value > 10 + this.app.view.width - this.sprite.width / 2) || (value < -10)) {
            this.removeBullet();
        }
        ;
    }
    ;
    get x() {
        return this.sprite.x;
    }
    ;
    set y(value) {
        this.sprite.y = value;
    }
    ;
    get y() {
        return this.sprite.y;
    }
    ;
    set movementSpeed(value) {
        this._movementSpeed = value;
    }
    ;
    get movementSpeed() {
        return this._movementSpeed;
    }
    ;
    get origin() {
        return this._origin;
    }
    ;
    set origin(value) {
        this._origin = value;
    }
    ;
    getBounds() {
        return this.sprite.getBounds();
    }
    ;
    removeBullet() {
        this.app.stage.removeChild(this.sprite);
        Bullet.bullets.splice(Bullet.bullets.indexOf(this), 1);
    }
    ;
}
exports.Bullet = Bullet;
Bullet.bullets = [];
;

},{"../Types/BulletType":6}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerShip = void 0;
const Bullet_1 = require("../Other/Bullet");
const BulletType_1 = require("../Types/BulletType");
class PlayerShip {
    constructor(app) {
        this.app = app;
        this._livesLeft = 3;
        this._movementSpeed = 5;
        this.sprite = PIXI.Sprite.from(app.loader.resources.shipRight.url);
        this.sprite.scale.x = 0.1;
        this.sprite.scale.y = 0.1;
        this.sprite.x = this.sprite.width / 2;
        this.sprite.y = app.view.height / 2;
        this.sprite.anchor.set(0.5);
        ++PlayerShip.shipsCreated; // for later use
        app.stage.addChild(this.sprite);
    }
    ;
    set x(value) {
        this.sprite.x = value;
    }
    ;
    get x() {
        return this.sprite.x;
    }
    ;
    set y(value) {
        this.sprite.y = value;
    }
    ;
    get y() {
        return this.sprite.y;
    }
    ;
    get movementSpeed() {
        return this._movementSpeed;
    }
    ;
    set movementSpeed(value) {
        this._movementSpeed = value;
    }
    ;
    get livesLeft() {
        return this._livesLeft;
    }
    ;
    set livesLeft(value) {
        this._livesLeft = value;
    }
    ;
    getBounds() {
        return this.sprite.getBounds();
    }
    ;
    fire() {
        return new Bullet_1.Bullet(this.x + this.sprite.width / 2 + 1, this.y + 5, BulletType_1.BulletOrigin.player, this.app);
    }
    ;
    removePlayer() {
        this.app.stage.removeChild(this.sprite);
    }
    ;
}
exports.PlayerShip = PlayerShip;
PlayerShip.shipsCreated = 0;
;

},{"../Other/Bullet":4,"../Types/BulletType":6}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BulletOrigin = void 0;
var BulletOrigin;
(function (BulletOrigin) {
    BulletOrigin[BulletOrigin["player"] = 1] = "player";
    BulletOrigin[BulletOrigin["enemy"] = 2] = "enemy";
})(BulletOrigin = exports.BulletOrigin || (exports.BulletOrigin = {}));
;

},{}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parallax = void 0;
class Parallax {
    constructor(textureBack, textureMiddle, textureFront, app) {
        this.app = app;
        this.positionX = 0;
        this.scrollSpeed = 2;
        this.backgroundFar = this.createBackground(app.loader.resources[`${textureBack}`].texture);
        this.backgroungMiddle = this.createBackground(app.loader.resources[`${textureMiddle}`].texture);
        this.backgroungFore = this.createBackground(app.loader.resources[`${textureFront}`].texture);
    }
    ;
    createBackground(texture) {
        let tiling = new PIXI.extras.TilingSprite(texture, this.app.view.width, this.app.view.height);
        tiling.position.set(0, 0);
        tiling.tileScale.x = 2.5;
        tiling.tileScale.y = 5.0;
        this.app.stage.addChild(tiling);
        return tiling;
    }
    ;
    updateBackground() {
        this.positionX += this.scrollSpeed;
        this.backgroungFore.tilePosition.x = -this.positionX;
        this.backgroungMiddle.tilePosition.x = -this.positionX / 2;
        this.backgroundFar.tilePosition.x = -this.positionX / 4;
    }
    ;
}
exports.Parallax = Parallax;
;

},{}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = require("./App");
const app = new PIXI.Application({
    width: window.innerWidth - 15,
    height: window.innerHeight - 25,
    backgroundColor: 0xAAFFFF,
});
const game = new App_1.App(app);

},{"./App":1}]},{},[8]);
