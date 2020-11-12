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
// const bulletsInfo: any = document.querySelector("#bullets");
const distanceTraveledInfo: any = document.querySelector("#distanceTraveled");
const playground: any = document.querySelector("#playground");
// const enemiesInfo = document.querySelector("#enemies");
const hiScoreInfo = document.querySelector("#hiScore");
const resumeButton: HTMLButtonElement | null = document.querySelector("#resume-button");
hiScoreInfo && (hiScoreInfo.innerHTML = 'HiScore :' + 0);
const keys: any = {};
let PLAYER: PlayerShip;

// PARALLAX ==================================================================================V
let bgBack: any;
let bgMiddle: any;
let bgFront: any;
let bgX = 0;
let bgSpeed = 1;
function createBg(texture: any) {

    let tiling: PIXI.extras.TilingSprite = new PIXI.extras.TilingSprite(texture, app.view.width, app.view.height);

    tiling.position.set(0, 0);
    tiling.tileScale.x = 2.5;
    tiling.tileScale.y = 3.8;
    app.stage.addChild(tiling);

    return tiling;
};

function updateBg() {
    bgX = (bgX + bgSpeed);
    bgX++;
    bgFront.tilePosition.x = -bgX;
    bgMiddle.tilePosition.x = -bgX / 2;
    bgBack.tilePosition.x = -bgX / 4;

}





// PARALLAX ==================================================================================^
function collision(a: any, b: any) { //function collision(a: Enemy, b: PlayerShip) { // ADD SOME INTERFACE FOR Enemy and Player calsses
    const aBox = a.getBounds();
    const bBox = b.getBounds();
    if ((a instanceof Enemy) && (b instanceof Bullet) && (b.origin === BulletOrigin.enemy)
        || (b instanceof Enemy) && (a instanceof Bullet) && (a.origin === BulletOrigin.enemy)) {
        return false;
    };
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
    // PARALLAX ==================================================================================V
    bgBack = createBg(app.loader.resources["farground"].texture);
    bgMiddle = createBg(app.loader.resources["midground"].texture);
    bgFront = createBg(app.loader.resources["foreground"].texture);


    // PARALLAX ==================================================================================^
    PLAYER = new PlayerShip();
    setInterval(() => new Enemy(), 1200);


    app.ticker.add(gameLoop);

};



const reset = () => {
    Enemy.enemies.forEach(enemy => enemy.removeEnemy());
    Bullet.bullets.forEach(bullet => bullet.removeBullet());
    PLAYER.livesLeft = 3;
    distanceTraveled = 0;
    if (score > hiScore) {
        hiScore = score;
    };
    score = 0;
    hiScoreInfo && (hiScoreInfo.innerHTML = 'HiScore: ' + JSON.stringify(hiScore));
};
function gameLoop() {
    // if ( Math.ceil(distanceTraveled / 10 ) > 100) {
    //     Enemy.movementSpeed ++;
    // }

    // PARALLAX ==================================================================================V
    updateBg();

    // PARALLAX ==================================================================================^

    if (PLAYER.livesLeft < 1) {
        reset();
    };


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
    Enemy.enemies.forEach(enemy => enemy.x -= Enemy.movementSpeed);

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
    // bulletsInfo.innerHTML = 'Bullets: ' + Bullet.bullets.map((bullet, index) => { // delete this row on production
    //     if (index > 6) {
    //         return '...';
    //     }
    //     return JSON.stringify({
    //         X: bullet.x,
    //         Y: Math.round(bullet.y)
    //     })
    // });

    // if (enemiesInfo) {
    //     enemiesInfo.innerHTML = 'Enemies: ' + Enemy.enemies.map((enemy, index) => {
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
