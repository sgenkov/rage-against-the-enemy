// import * as PIXI from 'pixi.js';
import { PlayerShip } from './Models/Player/PlayerShip';
import { Enemy } from './Models/Enemy/Enemy';

let score: number = 42;
let distanceTraveled: number = 42;
let globalLivesLeft: number = 0;
const livesInfo: any = document.querySelector("#lives");
const scoreInfo: any = document.querySelector("#score");
const distanceTraveledInfo: any = document.querySelector("#distanceTraveled");
const playground: any = document.querySelector("#playground");
const keysInfo: any = document.querySelector("#keys");
const keys: any = {};
const stage = new PIXI.Container();
let PLAYER: PlayerShip;

// console.log(PLAYER);
// function collision(a: Enemy, b: PlayerShip) {
//     const aBox = a.getBounds();
//     const bBox = b.getBounds();

//     if (aBox.x + aBox.width > bBox.x
//         && aBox.x < bBox.x + bBox.width
//         && aBox.y + aBox.height > bBox.y
//         && aBox.y < bBox.y + bBox.height) {
//         // console.log('aBox : ' + JSON.stringify(aBox));
//         // console.log('bBox : ' + JSON.stringify(bBox));
//         return true;
//     } else {
//         return false;
//     }
// };

const showProgress = (e: any) => {
    console.log(e.progress);
};

const doneLoading = () => {
    PLAYER = new PlayerShip();

    globalLivesLeft = PLAYER.livesLeft;
    // console.log(Enemy.enemies);
    const ENEMY = new Enemy();
    // console.log(Enemy.enemies);
    livesInfo.innerHTML = 'Lives: ' + JSON.stringify(globalLivesLeft);
    app.ticker.add(gameLoop);
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
        PLAYER.x += PLAYER.movementSpeed;
    };

    Enemy.enemies.forEach(enemy => enemy.x -= enemy.movementSpeed);
    // Enemy.enemies.forEach(enemy => {
    //     if (collision(enemy, PLAYER)) {
    //         PLAYER.livesLeft--;
    //         console.log('collision');
    //     };
    // });

}

const reportError = (e: any) => {
    console.log('ERROR : ' + e.message);
};

const keysDown = (e: any) => {
    keys[e.keyCode] = true;
    keysInfo.innerHTML = 'Keys :' + JSON.stringify(keys);
};

const keysUp = (e: any) => {
    keys[e.keyCode] = false;
    keysInfo.innerHTML = 'Keys :' + JSON.stringify(keys);
};

export const app = new PIXI.Application({
    width: 1050,
    height: 600,
    backgroundColor: 0xAAFFFF,
})

document.body.appendChild(app.view);
scoreInfo.innerHTML = 'Score: ' + JSON.stringify(score);

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

app.loader.onProgress.add(showProgress);
app.loader.onComplete.add(doneLoading);
app.loader.onError.add(reportError);

app.loader.load();
app.stage.interactive = true;
document.addEventListener("keydown", keysDown);
document.addEventListener("keyup", keysUp);
keysInfo.innerHTML = JSON.stringify(keys);
    // document.body.addEventListener("pointerdown", fireBullet);









// const app = PIXI.autoDetectRenderer(222, 222, { backgroundColor: 0xa1c2c4 })

// console.log(PIXI);


// const renderer = PIXI.autoDetectRenderer(222, 222, { backgroundColor: 0xa1c2c4 });
// document.body.appendChild(renderer.view);
// const stage = new PIXI.Container();
// stage.interactive = true;
// stage.hitArea = new PIXI.Rectangle(0, 0, 1000, 1000);
// renderer.render(stage);
