// import * as PIXI from 'pixi.js';
import { PlayerShip } from './Models/Player/PlayerShip';
import { Enemy } from './Models/Enemy/Enemy';
import { Bullet } from './Models/Other/Bullet';

let score: number = 0;
let distanceTraveled: number = 0;
// let globalLivesLeft: number = 0;
const livesInfo: any = document.querySelector("#lives");
const scoreInfo: any = document.querySelector("#score");
const bulletsInfo: any = document.querySelector("#bullets");
const distanceTraveledInfo: any = document.querySelector("#distanceTraveled");
const playground: any = document.querySelector("#playground");
// const keysInfo: any = document.querySelector("#keys");
const enemiesInfo = document.querySelector("#enemies");
const keys: any = {};
const stage = new PIXI.Container();
let PLAYER: PlayerShip;

function collision(a: any, b: any) { //function collision(a: Enemy, b: PlayerShip) { // AD SOME INTERFACES FOR Enemy and Player calsses
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
    } else {
        return false;
    }
};

const showProgress = (e: any) => {
    console.log(e.progress);
};

const doneLoading = () => {
    PLAYER = new PlayerShip();

    // globalLivesLeft = PLAYER.livesLeft;
    // console.log(Enemy.enemies);
    // const ENEMY = new Enemy();
    setInterval(() => new Enemy(), 700);
    // console.log(Enemy.enemies);
    // livesInfo.innerHTML = 'Lives: ' + JSON.stringify(globalLivesLeft);
    app.ticker.add(gameLoop);
};

const reset = () => {
    Enemy.enemies.forEach(enemy => enemy.removeEnemy());
    Bullet.bullets.forEach(bullet => bullet.removeBullet());
    PLAYER.livesLeft = 3;
}
function gameLoop() {
    if (PLAYER.livesLeft < 1) {
        reset();
     };
 
    ++distanceTraveled;
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

    };
    if (keys["83"] && PLAYER.y < app.view.height - 50) { // S - DOWN
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

    Enemy.enemies.forEach((enemy, index) => {
        if (collision(enemy, PLAYER)) {
            PLAYER.livesLeft--;
            // console.log('collision');
            // app.stage.removeChild(enemy); // THIS DOESN'T WORK!!!???
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
                // Bullet.bullets.splice(bulletIndex, 1);
                bullet.removeBullet();
                // Enemy.enemies.splice(enemyIndex, 1);
                enemy.removeEnemy();
                score++;
            };
        })
    });
    

    livesInfo.innerHTML = 'Lives: ' + JSON.stringify(PLAYER.livesLeft);
    scoreInfo.innerHTML = 'Score: ' + JSON.stringify(score);
    distanceTraveledInfo.innerHTML = 'Distance traveled: ' + Math.ceil(distanceTraveled / 10);
    bulletsInfo.innerHTML = 'Bullets: ' + Bullet.bullets.map((bullet, index) => { // delete this row on production
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
    // keysInfo.innerHTML = 'Keys :' + JSON.stringify(keys);
};

const keysUp = (e: any) => {
    keys[e.keyCode] = false;
    // keysInfo.innerHTML = 'Keys :' + JSON.stringify(keys);
};

export const app = new PIXI.Application({
    width: 1050,
    height: 600,
    backgroundColor: 0xAAFFFF,
})

document.body.appendChild(app.view);


distanceTraveledInfo.innerHTML = 'Distance traveled: ' + JSON.stringify(distanceTraveled);

app.loader.baseUrl = "../src/images";
app.loader
    .add("shipRight", "shipRight.png")
    .add("shipLeft", "shipLeft.png")
    .add("shipUp", "shipUp.png")
    .add("shipDown", "shipDown.png")
    .add("bulletRight", "bulletRight.png")
    .add("player", "player.png")
    .add("enemyLeft", "enemyLeft.png")
    .add("bulletLeft", "enemyBulletLeft.png")

app.loader.onProgress.add(showProgress);
app.loader.onComplete.add(doneLoading);
app.loader.onError.add(reportError);

app.loader.load();
app.stage.interactive = true;
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
