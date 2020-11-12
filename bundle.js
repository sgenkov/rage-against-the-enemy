(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Enemy = void 0;
const index_1 = require("../../index");
const Bullet_1 = require("../../Models/Other/Bullet");
const BulletType_1 = require("../Types/BulletType");
class Enemy {
    constructor() {
        this.sprite = PIXI.Sprite.from(index_1.app.loader.resources[`${Enemy.enemyShips[Math.round(Math.random() * 2)]}`].url);
        this.sprite.scale.x = -0.1;
        this.sprite.scale.y = 0.1;
        this.sprite.x = index_1.app.view.width - this.sprite.width / 2;
        this.sprite.y = Math.random() * index_1.app.view.height; //app.view.height / 2;
        this.sprite.anchor.set(0.5);
        Enemy.generatedEnemies++;
        Enemy.enemies.push(this);
        index_1.app.stage.addChild(this.sprite);
    }
    ;
    set x(value) {
        this.sprite.x = value;
        if (value < this.sprite.width / 2) {
            this.removeEnemy();
            // Enemy.enemies.splice(Enemy.enemies.findIndex(enemy => enemy.x === this.sprite.x), 1);
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
    // public set movementSpeed(value: number) {
    //     Enemy._movementSpeed += value;
    // };
    // public get movementSpeed(): number {
    //     return Enemy._movementSpeed;
    // };
    getBounds() {
        return this.sprite.getBounds();
    }
    ;
    removeEnemy() {
        index_1.app.stage.removeChild(this.sprite);
        // Enemy.enemies.splice(Enemy.enemies.findIndex(enemy => enemy.x === this.sprite.x), 1);
        Enemy.enemies = Enemy.enemies.filter(enemy => enemy.x !== this.sprite.x);
    }
    ;
    fire() {
        return new Bullet_1.Bullet((this.x - this.sprite.width / 2 - 8), this.y + 5, BulletType_1.BulletOrigin.enemy);
    }
    ;
}
exports.Enemy = Enemy;
Enemy.generatedEnemies = 0;
Enemy.enemyShips = ["enemyLeft", "enemyLeft2", "enemyLeft3"];
Enemy.enemies = [];
Enemy.movementSpeed = 1;
;

},{"../../Models/Other/Bullet":2,"../../index":5,"../Types/BulletType":4}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bullet = void 0;
const index_1 = require("../../index");
const BulletType_1 = require("../Types/BulletType");
class Bullet {
    constructor(ownerX, ownerY, origin) {
        const bullet = (origin === BulletType_1.BulletOrigin.player ? "bulletRight" : "bulletLeft");
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
        if ((value > index_1.app.view.width - this.sprite.width / 2) || (value < 0)) {
            this.removeBullet();
            // Bullet.bullets.filter(bullet => bullet.x === this.sprite.x);
            // Bullet.bullets.splice(Bullet.bullets.findIndex(bullet => bullet.x === this.sprite.x), 1);
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
    removeBullet() {
        index_1.app.stage.removeChild(this.sprite);
        Bullet.bullets.splice(Bullet.bullets.findIndex(bullet => bullet.x === this.sprite.x), 1);
    }
    ;
}
exports.Bullet = Bullet;
Bullet.bullets = [];
;

},{"../../index":5,"../Types/BulletType":4}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerShip = void 0;
const index_1 = require("../../index");
const Bullet_1 = require("../Other/Bullet");
const BulletType_1 = require("../Types/BulletType");
class PlayerShip {
    constructor() {
        this._livesLeft = 3;
        this._movementSpeed = 5;
        this.sprite = PIXI.Sprite.from(index_1.app.loader.resources.shipRight.url);
        // this.sprite = PIXI.Sprite.from('/src/images/shipRight.png'); 
        // this.printer(app.loader.resources);
        this.sprite.scale.x = 0.1;
        this.sprite.scale.y = 0.1;
        this.sprite.x = this.sprite.width / 2;
        this.sprite.y = index_1.app.view.height / 2;
        this.sprite.anchor.set(0.5);
        ++PlayerShip.shipsCreated;
        // this.livesLeft = 3;
        // console.log(this.sprite.texture);
        // this.sprite.y = GameApp.GroundPosition;
        // this.sprite.animationSpeed = 0.05;
        // this.sprite.play();
        index_1.app.stage.addChild(this.sprite);
        // GameApp.Stage.addChild(this.sprite);
    }
    set x(value) {
        this.sprite.x = value;
    }
    get x() {
        return this.sprite.x;
    }
    set y(value) {
        this.sprite.y = value;
    }
    get y() {
        return this.sprite.y;
    }
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
        return new Bullet_1.Bullet(this.x + this.sprite.width / 2 + 1, this.y + 5, BulletType_1.BulletOrigin.player);
    }
    ;
}
exports.PlayerShip = PlayerShip;
PlayerShip.shipsCreated = 0;
;

},{"../../index":5,"../Other/Bullet":2,"../Types/BulletType":4}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BulletOrigin = void 0;
var BulletOrigin;
(function (BulletOrigin) {
    BulletOrigin[BulletOrigin["player"] = 1] = "player";
    BulletOrigin[BulletOrigin["enemy"] = 2] = "enemy";
})(BulletOrigin = exports.BulletOrigin || (exports.BulletOrigin = {}));
;

},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
// import * as PIXI from 'pixi.js';
const PlayerShip_1 = require("./Models/Player/PlayerShip");
const Enemy_1 = require("./Models/Enemy/Enemy");
const Bullet_1 = require("./Models/Other/Bullet");
let score = 0;
let distanceTraveled = 0;
let hiScore = 0;
const livesInfo = document.querySelector("#lives");
const scoreInfo = document.querySelector("#score");
const bulletsInfo = document.querySelector("#bullets");
const distanceTraveledInfo = document.querySelector("#distanceTraveled");
const playground = document.querySelector("#playground");
const enemiesInfo = document.querySelector("#enemies");
const hiScoreInfo = document.querySelector("#hiScore");
hiScoreInfo && (hiScoreInfo.innerHTML = 'HiScore :' + 0);
const keys = {};
let PLAYER;
function collision(a, b) {
    const aBox = a.getBounds();
    const bBox = b.getBounds();
    //  console.log('abox :', typeof a);
    //  console.log('bbox :', typeof b);
    if (aBox.x + aBox.width > bBox.x
        && aBox.x < bBox.x + bBox.width
        && aBox.y + aBox.height > bBox.y
        && aBox.y < bBox.y + bBox.height) {
        // console.log('aBox : ' + JSON.stringify(typeof aBox));
        // console.log('bBox : ' + JSON.stringify(typeof bBox));
        return true;
    }
    else {
        return false;
    }
}
;
const showProgress = (e) => {
    console.log(e.progress);
};
const doneLoading = () => {
    PLAYER = new PlayerShip_1.PlayerShip();
    setInterval(() => new Enemy_1.Enemy(), 1200);
    exports.app.ticker.add(gameLoop);
};
const reset = () => {
    Enemy_1.Enemy.enemies.forEach(enemy => enemy.removeEnemy());
    Bullet_1.Bullet.bullets.forEach(bullet => bullet.removeBullet());
    PLAYER.livesLeft = 3;
    distanceTraveled = 0;
    if (score > hiScore) {
        hiScore = score;
    }
    ;
    score = 0;
    hiScoreInfo && (hiScoreInfo.innerHTML = 'HiScore: ' + JSON.stringify(hiScore));
};
function gameLoop() {
    // if ( Math.ceil(distanceTraveled / 10 ) > 100) {
    //     Enemy.movementSpeed ++;
    // }
    if (PLAYER.livesLeft < 1) {
        reset();
    }
    ;
    ++distanceTraveled;
    // let accel;
    if (keys["87"] && PLAYER.y > 30) { // W - UP
        PLAYER.y -= PLAYER.movementSpeed;
        // let accel = setInterval(() => {
        //     if (PLAYER.y > 50) {
        //         PLAYER.y -= 2
        //     }
        //     if (!keys["87"]) {
        //         clearInterval(accel);
        //     }
        // }, 50)
    }
    ;
    if (keys["83"] && PLAYER.y < exports.app.view.height - 30) { // S - DOWN
        PLAYER.y += PLAYER.movementSpeed;
    }
    ;
    if (keys["65"] && PLAYER.x > 50) { // A - LEFT
        PLAYER.x -= PLAYER.movementSpeed;
    }
    ;
    if (keys["68"] && PLAYER.x < exports.app.view.width - 50) { // D - RIGHT
        PLAYER.x += PLAYER.movementSpeed;
    }
    ;
    if (keys["32"]) { // D - RIGHT
        PLAYER.fire();
        setTimeout(() => keys["32"] = false, 10);
    }
    ;
    Enemy_1.Enemy.enemies.forEach(enemy => {
        const chance = Math.random() * 1000;
        if (chance < 5) {
            enemy.fire();
        }
        ;
    });
    Enemy_1.Enemy.enemies.forEach(enemy => enemy.x -= Enemy_1.Enemy.movementSpeed);
    Enemy_1.Enemy.enemies.forEach((enemy, index) => {
        if (collision(enemy, PLAYER)) {
            PLAYER.livesLeft--;
            // console.log('collision');
            // app.stage.removeChild(enemy); // THIS DOESN'T WORK!!!???
            enemy.removeEnemy();
        }
        ;
    });
    Bullet_1.Bullet.bullets.forEach((bullet) => bullet.x += bullet.movementSpeed);
    Bullet_1.Bullet.bullets.forEach((bullet, bulletIndex) => {
        if (collision(bullet, PLAYER)) {
            bullet.removeBullet();
            PLAYER.livesLeft--;
        }
        ;
        Enemy_1.Enemy.enemies.forEach((enemy, enemyIndex) => {
            if (collision(enemy, bullet)) {
                // Bullet.bullets.splice(bulletIndex, 1);
                bullet.removeBullet();
                // Enemy.enemies.splice(enemyIndex, 1);
                enemy.removeEnemy();
                score++;
            }
            ;
        });
    });
    livesInfo.innerHTML = 'Lives: ' + JSON.stringify(PLAYER.livesLeft);
    scoreInfo.innerHTML = 'Score: ' + JSON.stringify(score);
    distanceTraveledInfo.innerHTML = 'Distance traveled: ' + Math.ceil(distanceTraveled / 10);
    bulletsInfo.innerHTML = 'Bullets: ' + Bullet_1.Bullet.bullets.map((bullet, index) => {
        if (index > 6) {
            return '...';
        }
        return JSON.stringify({
            X: bullet.x,
            Y: Math.round(bullet.y)
        });
    });
    if (enemiesInfo) {
        enemiesInfo.innerHTML = 'Enemies: ' + Enemy_1.Enemy.enemies.map((enemy, index) => {
            if (index > 6) {
                return '...';
            }
            return JSON.stringify({
                X: enemy.x,
                Y: Math.round(enemy.y)
            });
        });
    }
}
;
const reportError = (e) => {
    console.log('ERROR : ' + e.message);
};
const keysDown = (e) => {
    keys[e.keyCode] = true;
    // keysInfo.innerHTML = 'Keys :' + JSON.stringify(keys);
};
const keysUp = (e) => {
    keys[e.keyCode] = false;
    // keysInfo.innerHTML = 'Keys :' + JSON.stringify(keys);
};
exports.app = new PIXI.Application({
    width: 1050,
    height: 600,
    backgroundColor: 0xAAFFFF,
});
document.body.appendChild(exports.app.view);
distanceTraveledInfo.innerHTML = 'Distance traveled: ' + JSON.stringify(distanceTraveled);
exports.app.loader.baseUrl = "../src/assets";
exports.app.loader
    .add("shipRight", "Ships/shipRight.png")
    .add("enemyLeft", "Ships/plane_3_red.png")
    .add("enemyLeft2", "Ships/plane_3_blue.png")
    .add("enemyLeft3", "Ships/plane_3_yellow.png")
    .add("bulletRight", "Bullets/bulletRight.png")
    .add("bulletLeft", "Bullets/enemyBulletLeft.png");
// .add("shipRight", "plane_3_green.png")
// .add("shipLeft", "shipLeft.png")
// .add("shipUp", "shipUp.png")
// .add("shipDown", "shipDown.png")
// .add("bulletRight", "bulletRight.png")
// .add("player", "player.png")
// .add("enemyLeft", "enemyLeft.png")
// .add("bulletLeft", "enemyBulletLeft.png")
exports.app.loader.onProgress.add(showProgress);
exports.app.loader.onComplete.add(doneLoading);
exports.app.loader.onError.add(reportError);
exports.app.loader.load();
exports.app.stage.interactive = true;
document.addEventListener("keydown", keysDown);
document.addEventListener("keyup", keysUp);
// keysInfo.innerHTML = JSON.stringify(keys);
document.body.addEventListener("pointerdown", () => PLAYER.fire());
// const app = PIXI.autoDetectRenderer(222, 222, { backgroundColor: 0xa1c2c4 })
// console.log(PIXI);
// const renderer = PIXI.autoDetectRenderer(222, 222, { backgroundColor: 0xa1c2c4 });
// document.body.appendChild(renderer.view);
// const stage = new PIXI.Container();
// stage.interactive = true;
// stage.hitArea = new PIXI.Rectangle(0, 0, 1000, 1000);
// renderer.render(stage);

},{"./Models/Enemy/Enemy":1,"./Models/Other/Bullet":2,"./Models/Player/PlayerShip":3}]},{},[5]);
