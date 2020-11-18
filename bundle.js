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
const Explosion_1 = require("./Effects/Explosion");
const BonusLife_1 = require("./Models/Other/BonusLife");
const index_1 = require("./index");
class App {
    constructor() {
        this.score = 0;
        this.distanceTraveled = 0;
        this.hiScore = 0;
        this.keysPressed = {};
        this.loadAssets();
        document.body.appendChild(index_1.app.view);
        document.addEventListener("keydown", this.keysDown.bind(this));
        document.addEventListener("keyup", this.keysUp.bind(this));
        document.body.addEventListener("pointerdown", () => this.PLAYER.fire());
        document.body.addEventListener("contextmenu", (e) => {
            e.preventDefault();
        });
        App.InfoText.position.y = index_1.app.view.height - App.InfoText.height;
    }
    ;
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
        this.PARALLAX = new Parallax_1.Parallax("farground", "midground", "foreground");
        this.PLAYER = new PlayerShip_1.PlayerShip();
        app.ticker.add(() => this.gameLoop(app));
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
        if (this.keysPressed["81"] === true) { // DELETE THISS++++++++======================================
            console.log(Bullet_1.Bullet.bullets);
            setTimeout(() => this.keysPressed["81"] = false, 10);
        }
        ; // DELETE THISS++++++++======================================++++++++++++++++++++++++++++++++++++======
        if (this.distanceTraveled % 80 === 0)
            new Enemy_1.Enemy();
        if (this.distanceTraveled % 350 === 0)
            new Obstacle_1.Obstacle();
        if ((this.distanceTraveled % 500 === 0) && ((this.score / this.distanceTraveled) > 0.02)) {
            this.newBonusLife = new BonusLife_1.BonusLife(app);
            this.newBonusLife.isInRange = true;
        }
        ;
        if (this.newBonusLife) {
            if (this.newBonusLife.isInRange) {
                this.newBonusLife.x -= this.newBonusLife.movementSpeed;
                if (this.collision(this.PLAYER, this.newBonusLife)) {
                    this.PLAYER.livesLeft++;
                    this.newBonusLife.removeBonusLife();
                }
                ;
            }
            ;
        }
        ;
        Enemy_1.Enemy.enemies.forEach(enemy => {
            if (Math.random() * 1000 < 3) {
                enemy.fire();
            }
            ;
        });
        Obstacle_1.Obstacle.obstacles.forEach(obstacle => obstacle.x -= obstacle.movementSpeed);
        Enemy_1.Enemy.enemies.forEach((enemy) => {
            enemy.x -= enemy.movementSpeed;
            if (enemy.isStriked) {
                enemy.y += enemy.fallSpeed;
                enemy.fallSpeed += 0.3;
            }
            ;
            if (this.collision(enemy, this.PLAYER)) {
                this.PLAYER.livesLeft--;
                enemy.removeEnemy();
            }
            ;
        });
        Bullet_1.Bullet.bullets.forEach((bullet) => {
            if (bullet.isAlive === true) {
                bullet.x += bullet.movementSpeed;
                if (this.collision(bullet, this.PLAYER)) {
                    new Explosion_1.Explosion(bullet.x, bullet.y, true);
                    bullet.removeBullet();
                    this.PLAYER.livesLeft--;
                }
                ;
                Enemy_1.Enemy.enemies.forEach((enemy) => {
                    if (this.collision(enemy, bullet)) {
                        new Explosion_1.Explosion(bullet.x, bullet.y, true);
                        bullet.removeBullet();
                        if (enemy.isStriked) {
                            this.score += 2;
                            new Explosion_1.Explosion(bullet.x, bullet.y, true);
                            enemy.removeEnemy();
                        }
                        else {
                            enemy.isStriked = true;
                            this.score++;
                        }
                        ;
                    }
                    ;
                });
            }
        });
        Obstacle_1.Obstacle.obstacles.forEach((obstacle) => {
            if (this.collision(obstacle, this.PLAYER)) {
                this.PLAYER.livesLeft = 0;
            }
            ;
        });
        app.stage.addChild(App.InfoText);
        if (this.distanceTraveled % 200 === 0) {
            app.stop();
            Bullet_1.Bullet.bullets = Bullet_1.Bullet.bullets.filter(bullet => bullet.isAlive === true);
            app.start();
        }
        ;
    }
    ;
    reset() {
        index_1.app.stop();
        while (Enemy_1.Enemy.enemies.length > 0) {
            Enemy_1.Enemy.enemies[0].removeEnemy(false);
            console.log('ENEMIES CLEAR');
        }
        ;
        Bullet_1.Bullet.bullets = Bullet_1.Bullet.bullets.filter(bullet => bullet.isAlive === true);
        this.newBonusLife && this.newBonusLife.removeBonusLife();
        while (Obstacle_1.Obstacle.obstacles.length > 0) {
            Obstacle_1.Obstacle.obstacles[0].removeObstacle();
        }
        ;
        this.PLAYER.removePlayer();
        index_1.app.start();
        this.PLAYER = new PlayerShip_1.PlayerShip();
        this.distanceTraveled = 0;
        if (this.score > this.hiScore) {
            this.hiScore = this.score;
        }
        ;
        this.score = 0;
    }
    ;
    loadAssets() {
        index_1.app.loader.baseUrl = "../src/assets";
        index_1.app.loader
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
            index_1.app.loader.add(`live${i}`, `BonusLive/live${i}.png`);
        }
        ;
        index_1.app.loader.onProgress.add(this.showProgress);
        index_1.app.loader.onComplete.add(() => this.doneLoading(index_1.app));
        index_1.app.loader.onError.add(this.reportError);
        index_1.app.loader.load();
        index_1.app.stage.interactive = true;
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

},{"./Effects/Explosion":2,"./Models/Enemy/Enemy":3,"./Models/Obstacle/Obstacle":4,"./Models/Other/BonusLife":5,"./Models/Other/Bullet":6,"./Models/Player/PlayerShip":7,"./Models/Types/BulletType":8,"./Parallax/Parallax":9,"./index":10}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Explosion = void 0;
const index_1 = require("../index");
class Explosion {
    constructor(positionX = index_1.app.view.width / 2, positionY = index_1.app.view.height / 2, smallBlast = false) {
        this.textureContainer = [];
        for (let i = 1; i <= 9; ++i) {
            this.textureContainer.push(PIXI.Texture.from(index_1.app.loader.resources[`expl${i}`].url));
        }
        ;
        this.blast = new PIXI.extras.AnimatedSprite(this.textureContainer);
        this.blast.anchor.set(0.5);
        this.blast.animationSpeed = 0.5;
        this.blast.loop = false;
        this.blast.scale.x = smallBlast ? 0.1 : 0.3;
        this.blast.scale.y = smallBlast ? 0.1 : 0.3;
        this.blast.x = positionX;
        this.blast.y = positionY;
        index_1.app.stage.addChild(this.blast);
        this.blast.play();
        setTimeout(() => { index_1.app.stage.removeChild(this.blast); }, 400);
    }
    ;
}
exports.Explosion = Explosion;
;

},{"../index":10}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Enemy = void 0;
const Bullet_1 = require("../../Models/Other/Bullet");
const BulletType_1 = require("../Types/BulletType");
const Explosion_1 = require("../../Effects/Explosion");
const index_1 = require("../../index");
class Enemy {
    constructor() {
        this._movementSpeed = 1;
        this._fallSpeed = 0;
        this._isStriked = false;
        this.shipType = Enemy.enemyShipsTypes[Math.round(Math.random() * 2)];
        this.sprite = PIXI.Sprite.from(index_1.app.loader.resources[this.shipType].url);
        this.sprite.scale.x = -0.1;
        this.sprite.scale.y = 0.1;
        this.sprite.x = index_1.app.view.width + this.sprite.width;
        this.sprite.y = Math.random() * (index_1.app.view.height - 45) + 20;
        this.sprite.anchor.set(0.5);
        this.movementSpeed = this.setSpeed();
        Enemy.enemies.push(this);
        index_1.app.stage.addChild(this.sprite);
    }
    ;
    set x(value) {
        this.sprite.x = value;
        this.sprite.rotation = -Math.atan(this._fallSpeed / this._movementSpeed);
        if (value < -this.sprite.width) {
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
        if (this.sprite.y > index_1.app.view.height - this.sprite.height) {
            this.removeEnemy();
        }
        ;
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
    set isStriked(value) {
        this._isStriked = value;
    }
    ;
    get isStriked() {
        return this._isStriked;
    }
    ;
    get fallSpeed() {
        return this._fallSpeed;
    }
    ;
    set fallSpeed(value) {
        this._fallSpeed = value;
    }
    ;
    fire() {
        return (new Bullet_1.Bullet((this.x - this.sprite.width / 2 - ((this.movementSpeed > 2)
            ? 9
            : 8)), this.y + 5, BulletType_1.BulletOrigin.enemy));
    }
    ;
    setSpeed() {
        return Enemy.enemyShipsTypes.indexOf(this.shipType) + 1;
    }
    ;
    getBounds() {
        return this.sprite.getBounds();
    }
    ;
    removeEnemy(explosion = true) {
        (explosion) && (new Explosion_1.Explosion(this.sprite.x, this.sprite.y));
        index_1.app.stage.removeChild(this.sprite);
        Enemy.enemies.splice(Enemy.enemies.indexOf(this), 1);
    }
    ;
}
exports.Enemy = Enemy;
Enemy.enemies = [];
Enemy.enemyShipsTypes = ["enemyLeft", "enemyLeft2", "enemyLeft3"];
;

},{"../../Effects/Explosion":2,"../../Models/Other/Bullet":6,"../../index":10,"../Types/BulletType":8}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Obstacle = void 0;
const index_1 = require("../../index");
class Obstacle {
    constructor() {
        this._movementSpeed = 2;
        this.obstacleType = `${Obstacle.obstacleTypes[Math.round(Math.random() * (Obstacle.obstacleTypes.length - 1))]}`;
        this.sprite = PIXI.Sprite.from(index_1.app.loader.resources[`${this.obstacleType}`].url);
        this.sprite.scale.x = Math.random() * 1 + 0.2;
        this.sprite.scale.y = Math.random() * 1 + 0.2;
        this.sprite.x = index_1.app.view.width + this.sprite.width * this.sprite.scale.x / 2 + Math.random() * 100;
        this.sprite.y = index_1.app.view.height - 45;
        this.sprite.anchor.set(0.5);
        Obstacle.obstacles.push(this);
        index_1.app.stage.addChild(this.sprite);
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
        index_1.app.stage.removeChild(this.sprite);
        Obstacle.obstacles.splice(Obstacle.obstacles.indexOf(this), 1);
    }
    ;
}
exports.Obstacle = Obstacle;
Obstacle.obstacles = [];
Obstacle.obstacleTypes = ["rock1", "rock2", "rock3", "rock4", "rock5", "rock6", "rock7"];
;

},{"../../index":10}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BonusLife = void 0;
class BonusLife {
    constructor(app) {
        this.app = app;
        this.textureContainer = [];
        this.isInRange = false;
        this._movementSpeed = 4;
        for (let i = 1; i <= 30; ++i) {
            this.textureContainer.push(PIXI.Texture.from(app.loader.resources[`live${i}`].url));
        }
        ;
        this.bonusLife = new PIXI.extras.AnimatedSprite(this.textureContainer);
        this.bonusLife.anchor.set(0.5);
        this.bonusLife.animationSpeed = 0.4;
        this.bonusLife.loop = true;
        this.bonusLife.scale.x = 0.3;
        this.bonusLife.scale.y = 0.3;
        this.bonusLife.x = app.view.width;
        this.bonusLife.y = Math.random() * (app.view.height - 250) + this.bonusLife.height / 2;
        app.stage.addChild(this.bonusLife);
        this.bonusLife.play();
        // setTimeout(() => {app.stage.removeChild(this.bonusLive)}, 100);      
    }
    ;
    set x(value) {
        this.bonusLife.x = value;
        if (this.bonusLife.x < -this.bonusLife.width) {
            this.removeBonusLife();
        }
        ;
    }
    ;
    get x() {
        return this.bonusLife.x;
    }
    ;
    get movementSpeed() {
        return this._movementSpeed;
    }
    ;
    getBounds() {
        return this.bonusLife.getBounds();
    }
    ;
    removeBonusLife() {
        this.app.stage.removeChild(this.bonusLife);
        this.isInRange = false;
    }
    ;
}
exports.BonusLife = BonusLife;
;

},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bullet = void 0;
const BulletType_1 = require("../Types/BulletType");
const index_1 = require("../../index");
class Bullet {
    constructor(ownerX, ownerY, origin) {
        this.isAlive = true;
        this.sprite = PIXI.Sprite.from(index_1.app.loader.resources[(origin === BulletType_1.BulletOrigin.player) ? "bulletRight" : "bulletLeft"].url);
        this.sprite.x = ownerX;
        this.sprite.y = ownerY;
        this.sprite.scale.x = ((origin === BulletType_1.BulletOrigin.player) ? 0.2 : -0.2);
        this.sprite.scale.y = 0.2;
        this.sprite.anchor.set(0.5);
        this.origin = origin;
        this.movementSpeed = ((origin === BulletType_1.BulletOrigin.player) ? 20 : -10);
        Bullet.bullets.push(this);
        index_1.app.stage.addChild(this.sprite);
    }
    ;
    set x(value) {
        this.sprite.x = value;
        if ((value > 10 + index_1.app.view.width) || (value < -10)) {
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
        this.isAlive = false;
        index_1.app.stage.removeChild(this.sprite);
        // Bullet.bullets.splice(Bullet.bullets.indexOf(this), 1);
    }
    ;
}
exports.Bullet = Bullet;
Bullet.bullets = [];
;

},{"../../index":10,"../Types/BulletType":8}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerShip = void 0;
const Bullet_1 = require("../Other/Bullet");
const BulletType_1 = require("../Types/BulletType");
const Explosion_1 = require("../../Effects/Explosion");
const index_1 = require("../../index");
class PlayerShip {
    constructor() {
        this._movementSpeed = 5;
        this._livesLeft = 3;
        this.sprite = PIXI.Sprite.from(index_1.app.loader.resources.shipRight.url);
        this.sprite.scale.x = 0.1;
        this.sprite.scale.y = 0.1;
        this.sprite.x = this.sprite.width / 2;
        this.sprite.y = index_1.app.view.height / 2;
        this.sprite.anchor.set(0.5);
        index_1.app.stage.addChild(this.sprite);
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
    fire() {
        return new Bullet_1.Bullet(this.x + this.sprite.width / 2 + 1, this.y + 5, BulletType_1.BulletOrigin.player);
    }
    ;
    getBounds() {
        return this.sprite.getBounds();
    }
    ;
    removePlayer() {
        new Explosion_1.Explosion(this.sprite.x, this.sprite.y);
        index_1.app.stage.removeChild(this.sprite);
    }
    ;
}
exports.PlayerShip = PlayerShip;
;

},{"../../Effects/Explosion":2,"../../index":10,"../Other/Bullet":6,"../Types/BulletType":8}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BulletOrigin = void 0;
var BulletOrigin;
(function (BulletOrigin) {
    BulletOrigin[BulletOrigin["player"] = 1] = "player";
    BulletOrigin[BulletOrigin["enemy"] = 2] = "enemy";
})(BulletOrigin = exports.BulletOrigin || (exports.BulletOrigin = {}));
;

},{}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parallax = void 0;
const index_1 = require("../index");
class Parallax {
    constructor(textureBack, textureMiddle, textureFront) {
        this.positionX = 0;
        this.scrollSpeed = 2;
        this.backgroundFar = this.createBackground(index_1.app.loader.resources[`${textureBack}`].texture);
        this.backgroungMiddle = this.createBackground(index_1.app.loader.resources[`${textureMiddle}`].texture);
        this.backgroungFore = this.createBackground(index_1.app.loader.resources[`${textureFront}`].texture);
    }
    ;
    createBackground(texture) {
        let tiling = new PIXI.extras.TilingSprite(texture, index_1.app.view.width, index_1.app.view.height);
        tiling.position.set(0, 0);
        tiling.tileScale.x = 2.5;
        tiling.tileScale.y = 5.0;
        index_1.app.stage.addChild(tiling);
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

},{"../index":10}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const App_1 = require("./App");
exports.app = new PIXI.Application({
    width: window.innerWidth - 15,
    height: window.innerHeight - 25,
    backgroundColor: 0xAAFFFF,
});
const game = new App_1.App();

},{"./App":1}]},{},[10]);
