

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// https://polyhaven.com/
// https://www.fr.de/panorama/geschichte-vom-louvre-passwort-bis-zu-den-atom-codes-die-schlimmsten-security-fails-der-94028611.html
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const DEG = Math.PI / 180;
let dzb
let dxb
let container = document.getElementById("container")
var world = document.getElementById("world");
let points_anzeige = document.getElementById("points")
let height_anzeige = document.getElementById("height")
let x_anzeige = document.getElementById("x")
let y_anzeige = document.getElementById("y")
let dx_anzeige = document.getElementById("dx")
let dz_anzeige = document.getElementById("dz")
update_points(0)




let drx = 0;
let dry = 0
let drz = 0;
let dx = 0;
let dy = 0;
let dz = 0

let mouseSensitivity = 0.3
let gravity = 0.2
let gravity_bullet = 0.0
let player_speed = 5
let bulletSpeed = 13;
let move = 0.01;

// geeignet um ausserhalb der Kontur zu sein und Features zu testen 
let jump
jump = true
// jump = false 


let mySquares = []
let mouseX = 0
let mouseY = 0;



let onGround = false;

let pressForward = 0
let pawn
// window.pawn = pawn 

let pressBack = 0
let pressRight = 0
let pressLeft = 0;
let pressUp = 0

let lock = false

let my_items = []
let myItemsData = []
let myItemsCounter = 0

let my_shooting_bullets = []
let myBulletData = []
let myBulletsShooting = 0
// 3x3 2d Rotation

// Konstruktor
function player(
    x,
    y,
    z,
    rx,
    ry,
    vx,
    vy,
    vz
) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.rx = rx;
    this.ry = ry;
    this.vx = vx;
    this.vy = vy;
    this.vz = vz;
    this.onGround = false
}


function update() {
    points_anzeige.textContent = (
        "Points: "
    )
    // show_position()
    updateBullets()
    dz = +(pressRight - pressLeft) * Math.sin(pawn.ry * DEG) - (pressForward - pressBack) * Math.cos(pawn.ry * DEG)
    dx = +(pressRight - pressLeft) * Math.cos(pawn.ry * DEG) + (pressForward - pressBack) * Math.sin(pawn.ry * DEG)
    dy += gravity;


    if (onGround) {
        dy = 0;
        if (pressUp) {
            dy = -pressUp;
            onGround = false;
        }
    }
    let drx = mouseY * mouseSensitivity;
    let dry = mouseX * mouseSensitivity;

    collision(
        window.myRoom,
        pawn
    )

    mouseX = 0
    mouseY = 0;

    pawn.z += dz;
    pawn.x += dx;
    pawn.y += dy



    if (lock) {
        pawn.rx += drx;

        if (pawn.rx > 57) {
            pawn.rx = 57;
        } else if (pawn.rx < -57) {
            pawn.rx = -57;
        }
        pawn.ry += dry;
    }

    document.onclick = function () {



        if (lock) {
            let newBullet = drawMyBullet(myBulletsShooting++)
            my_shooting_bullets.push(newBullet)

            myBulletData.push(
                new player(
                    pawn.x,
                    pawn.y,
                    pawn.z,
                    pawn.rx,
                    pawn.ry,
                    bulletSpeed,
                    bulletSpeed,
                    bulletSpeed
                )
            )
        }

    }
    world.style.transform = `
        translateZ(600px) 
        rotateX(${-pawn.rx}deg) 
        rotateY(${pawn.ry}deg) 
        translate3d(
            ${-pawn.x}px, 
            ${-pawn.y}px
            ,${-pawn.z}px
        )
    `;
    if (myBulletData.length > 1) {
        is_hidden(myItemsData)
    }
    
}



let game = setInterval(
    update,
    10
);

pawn = new player(
    0,
    0,
    0,
    0,
    -90,// Rotation um y
    player_speed,
    player_speed,
    player_speed
);


document.addEventListener("pointerlockchange", (event) => {
    lock = !lock;
})
container.onclick = function () {
    if (!lock) {
        container.requestPointerLock();
    }
}







// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// movement
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

document.addEventListener("keydown", (event) => {
    if (event.key == "w") {
        pressForward = pawn.vz;
    }
    if (event.key == "s") {
        pressBack = pawn.vz;
    }
    if (event.key == "d") {
        pressRight = pawn.vx;
    }
    if (event.key == "a") {
        pressLeft = pawn.vx;
    }
    if (event.key == " ") {
        pressUp = pawn.vy;
    }

})

document.addEventListener("keyup", (event) => {
    if (event.key == "w") {
        pressForward = 0;
    }
    if (event.key == "s") {
        pressBack = 0;
    }
    if (event.key == "d") {
        pressRight = 0;
    }
    if (event.key == "a") {
        pressLeft = 0;
    }
    if (event.key == " ") {
        pressUp = 0;
    }
})

document.addEventListener("mousemove", (event) => {
    mouseX = event.movementX;
    mouseY = event.movementY;
})


function update_points(num) {
    points_anzeige.textContent = `Points: ${num}`
}


function add_items() {
    let [header, header_data] = insert_item(myItemsCounter++)
    console.log(header)
    my_items.push(header)
    let item_data_for_insert = new player(header_data[0], header_data[1], header_data[2], header_data[3], header_data[4], 0, 0, 0)
    console.log("add item", item_data_for_insert)
    myItemsData.push(
        //     // new player(pawn.x, pawn.y, pawn.z, pawn.rx, pawn.ry, bulletSpeed, bulletSpeed, bulletSpeed)
        item_data_for_insert
    )

}





var panemsanasSkana = new Audio;
panemsanasSkana.src = "./audio/thing.mp3";

var soluSkana = new Audio;
soluSkana.src = "./audio/walking.mp3";

var kludasSkana = new Audio;
kludasSkana.src = "./audio/mistake.mp3"

var teleportaSkana = new Audio;
teleportaSkana.src = "./audio/win.mp3"

add_items()