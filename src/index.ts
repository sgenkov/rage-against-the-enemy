// import * as PIXI from 'pixi.js';
// import PIXI from 'pixi.js';
import { PlayerShip } from './Models/Player/PlayerShip';
import { Enemy } from './Models/Enemy/Enemy';
import { Bullet } from './Models/Other/Bullet';
import { Parallax } from './Parallax/Parallax';
import { BulletOrigin } from './Models/Types/BulletType';

let score: number = 0;
let distanceTraveled: number = 0;
let hiScore: number = 0;
const livesInfo: any = document.querySelector("#lives");
const scoreInfo: any = document.querySelector("#score");
const bulletsInfo: any = document.querySelector("#bullets");
const distanceTraveledInfo: any = document.querySelector("#distanceTraveled");
const enemiesInfo = document.querySelector("#enemies");
const hiScoreInfo = document.querySelector("#hiScore");
hiScoreInfo && (hiScoreInfo.innerHTML = 'HiScore :' + 0);
const keys: any = {};
let PLAYER: PlayerShip;
let PARALLAX: Parallax;

function collision(a: any, b: any) { //function collision(a: Enemy, b: PlayerShip) { // ADD SOME INTERFACE FOR Enemy and Player calsses
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

const showProgress = (e: any) => {
    console.log(e.progress);
};

const doneLoading = () => {
    PARALLAX = new Parallax("farground","midground","foreground");
    PLAYER = new PlayerShip();

    setInterval(() => new Enemy(), 1200);


    app.ticker.add(gameLoop);

};



const reset = () => {

    for (let i = 0; i < Enemy.enemies.length; ++i) {
        Enemy.enemies[i].removeEnemy();
        --i;
    };
    for (let i = 0; i < Bullet.bullets.length; ++i) {
        Bullet.bullets[i].removeBullet();
        --i;
    };
    PLAYER.livesLeft = 3;
    distanceTraveled = 0;
    if (score > hiScore) {
        hiScore = score;
    };
    score = 0;
    hiScoreInfo && (hiScoreInfo.innerHTML = 'HiScore: ' + JSON.stringify(hiScore));
};
function gameLoop() {
    PARALLAX.updateBg();
    if (PLAYER.livesLeft < 1) {
        reset();
    };


    ++distanceTraveled;
    if (keys["87"] && PLAYER.y > 30) { // W - UP

        PLAYER.y -= PLAYER.movementSpeed;

    };
    if (keys["83"] && PLAYER.y < app.view.height - 30) { // S - DOWN
        PLAYER.y += PLAYER.movementSpeed;
    };
    if (keys["65"] && PLAYER.x > 50) { // A - LEFT
        PLAYER.x -= PLAYER.movementSpeed;
    };
    if (keys["68"] && PLAYER.x < app.view.width - 50) { // D - RIGHT
        PLAYER.x += PLAYER.movementSpeed;
    };
    if (keys["32"]) { // D - RIGHT
        PLAYER.fire();
        setTimeout(() => keys["32"] = false, 10);
    };
    Enemy.enemies.forEach(enemy => {
        const chance: number = Math.random() * 1000;
        if (chance < 5) {
            enemy.fire();
        };
    });
    Enemy.enemies.forEach(enemy => enemy.x -= enemy.movementSpeed);

    Enemy.enemies.forEach((enemy) => {
        if (collision(enemy, PLAYER)) {
            PLAYER.livesLeft--;
            enemy.removeEnemy();
        };
    });
    Bullet.bullets.forEach((bullet) => bullet.x += bullet.movementSpeed);
    Bullet.bullets.forEach((bullet, bulletIndex) => {
        if (collision(bullet, PLAYER)) {
            bullet.removeBullet();
            PLAYER.livesLeft--;
        };
        Enemy.enemies.forEach((enemy, enemyIndex) => {
            if (collision(enemy, bullet)) {
                bullet.removeBullet();
                enemy.removeEnemy();
                score++;
            };
        })
    });


    livesInfo.innerHTML = 'Lives: ' + JSON.stringify(PLAYER.livesLeft);
    scoreInfo.innerHTML = 'Score: ' + JSON.stringify(score);
    distanceTraveledInfo.innerHTML = 'Distance traveled: ' + Math.ceil(distanceTraveled / 10);
    bulletsInfo.innerHTML = 'Bullets: ' + Bullet.bullets.map((bullet, index) => {
        if (index > 6) {
            return '...';
        }
        return JSON.stringify({
            X: bullet.x,
            Y: Math.round(bullet.y)
        })
    });

    if (enemiesInfo) {
        enemiesInfo.innerHTML = 'Enemies: ' + Enemy.enemies.map((enemy, index) => {
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

const reportError = (e: any) => {
    console.log('ERROR : ' + e.message);
};

const keysDown = (e: any) => {
    keys[e.keyCode] = true;
};

const keysUp = (e: any) => {
    keys[e.keyCode] = false;
};

export const app = new PIXI.Application({
    width: 1050,
    height: 600,
    backgroundColor: 0xAAFFFF,
})

document.body.appendChild(app.view);


distanceTraveledInfo.innerHTML = 'Distance traveled: ' + JSON.stringify(distanceTraveled);

app.loader.baseUrl = "../src/assets";
app.loader
    .add("shipRight", "Ships/shipRight.png")
    .add("enemyLeft", "Ships/plane_3_red.png")
    .add("enemyLeft2", "Ships/plane_3_blue.png")
    .add("enemyLeft3", "Ships/plane_3_yellow.png")
    .add("bulletRight", "Bullets/bulletRight.png")
    .add("bulletLeft", "Bullets/enemyBulletLeft.png")
    .add("foreground", "Mountains/foreground_mountains.png")
    .add("midground", "Mountains/midground_mountains.png")
    .add("farground", "Mountains/farground_mountains.png")

app.loader.onProgress.add(showProgress);
app.loader.onComplete.add(doneLoading);
app.loader.onError.add(reportError);

app.loader.load();
app.stage.interactive = true;
document.addEventListener("keydown", keysDown);
document.addEventListener("keyup", keysUp);
document.body.addEventListener("pointerdown", () => PLAYER.fire());