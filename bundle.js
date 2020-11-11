(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Enemy = void 0;
const index_1 = require("../../index");
class Enemy {
    constructor() {
        this._movementSpeed = 2;
        this.sprite = PIXI.Sprite.from(index_1.app.loader.resources.enemyLeft.url);
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
    get movementSpeed() {
        return this._movementSpeed;
    }
    ;
    getBounds() {
        return this.sprite.getBounds();
    }
    ;
    removeEnemy() {
        index_1.app.stage.removeChild(this.sprite);
        Enemy.enemies.splice(Enemy.enemies.findIndex(enemy => enemy.x === this.sprite.x), 1);
    }
    ;
}
exports.Enemy = Enemy;
Enemy.generatedEnemies = 0;
Enemy.enemies = [];
;

},{"../../index":4}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bullet = void 0;
const index_1 = require("../../index");
class Bullet {
    constructor(ownerX, ownerY) {
        this._movementSpeed = 20;
        this.sprite = PIXI.Sprite.from(index_1.app.loader.resources.bulletRight.url);
        this.sprite.x = ownerX;
        this.sprite.y = ownerY;
        this.sprite.anchor.set(0.5);
        Bullet.bullets.push(this);
        index_1.app.stage.addChild(this.sprite);
    }
    ;
    set x(value) {
        this.sprite.x = value;
        if (value > index_1.app.view.width - this.sprite.width / 2) {
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

},{"../../index":4}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerShip = void 0;
const index_1 = require("../../index");
const Bullet_1 = require("../Other/Bullet");
class PlayerShip {
    constructor() {
        this._livesLeft = 3;
        this._movementSpeed = 5;
        this.sprite = PIXI.Sprite.from(index_1.app.loader.resources.shipRight.url);
        // this.sprite = PIXI.Sprite.from('/src/images/shipRight.png'); 
        // this.printer(app.loader.resources);
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
        return new Bullet_1.Bullet(this.x, this.y);
    }
    ;
}
exports.PlayerShip = PlayerShip;
PlayerShip.shipsCreated = 0;
;

},{"../../index":4,"../Other/Bullet":2}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
// import * as PIXI from 'pixi.js';
const PlayerShip_1 = require("./Models/Player/PlayerShip");
const Enemy_1 = require("./Models/Enemy/Enemy");
const Bullet_1 = require("./Models/Other/Bullet");
let score = 0;
let distanceTraveled = 0;
let globalLivesLeft = 0;
const livesInfo = document.querySelector("#lives");
const scoreInfo = document.querySelector("#score");
const bulletsInfo = document.querySelector("#bullets");
const distanceTraveledInfo = document.querySelector("#distanceTraveled");
const playground = document.querySelector("#playground");
// const keysInfo: any = document.querySelector("#keys");
const enemiesInfo = document.querySelector("#enemies");
const keys = {};
const stage = new PIXI.Container();
let PLAYER;
function collision(a, b) {
    const aBox = a.getBounds();
    const bBox = b.getBounds();
    // console.log('abox :', aBox);
    if (aBox.x + aBox.width > bBox.x
        && aBox.x < bBox.x + bBox.width
        && aBox.y + aBox.height > bBox.y
        && aBox.y < bBox.y + bBox.height) {
        // console.log('aBox : ' + JSON.stringify(aBox));
        // console.log('bBox : ' + JSON.stringify(bBox));
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
    globalLivesLeft = PLAYER.livesLeft;
    // console.log(Enemy.enemies);
    // const ENEMY = new Enemy();
    setInterval(() => new Enemy_1.Enemy(), 700);
    // console.log(Enemy.enemies);
    // livesInfo.innerHTML = 'Lives: ' + JSON.stringify(globalLivesLeft);
    exports.app.ticker.add(gameLoop);
};
function gameLoop() {
    // console.log(Enemy.enemies);
    // let accel;
    if (keys["87"] && PLAYER.y > 50) { // W - UP
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
    if (keys["83"] && PLAYER.y < exports.app.view.height - 50) { // S - DOWN
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
    Enemy_1.Enemy.enemies.forEach(enemy => enemy.x -= enemy.movementSpeed);
    Enemy_1.Enemy.enemies.forEach((enemy, index) => {
        if (collision(enemy, PLAYER)) {
            globalLivesLeft--;
            console.log('collision');
            // app.stage.removeChild(enemy); // THIS DOESN'T WORK!!!???
            enemy.removeEnemy();
        }
        ;
    });
    Bullet_1.Bullet.bullets.forEach((bullet) => bullet.x += bullet.movementSpeed);
    Bullet_1.Bullet.bullets.forEach((bullet, bulletIndex) => {
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
    livesInfo.innerHTML = 'Lives: ' + JSON.stringify(globalLivesLeft);
    scoreInfo.innerHTML = 'Score: ' + JSON.stringify(score);
    bulletsInfo.innerHTML = 'Bullets: ' + Bullet_1.Bullet.bullets.map(bullet => {
        return JSON.stringify({
            X: bullet.x,
            Y: bullet.y
        });
    });
    if (enemiesInfo) {
        enemiesInfo.innerHTML = 'Enemies: ' + Enemy_1.Enemy.enemies.map(enemy => {
            return JSON.stringify({
                X: enemy.x,
                Y: enemy.y
            });
        });
    }
}
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
exports.app.loader.baseUrl = "../src/images";
exports.app.loader
    .add("shipRight", "shipRight.png")
    .add("shipLeft", "shipLeft.png")
    .add("shipUp", "shipUp.png")
    .add("shipDown", "shipDown.png")
    .add("bulletRight", "bulletRight.png")
    .add("player", "player.png")
    .add("enemyLeft", "enemyLeft.png");
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

},{"./Models/Enemy/Enemy":1,"./Models/Other/Bullet":2,"./Models/Player/PlayerShip":3}]},{},[4]);
