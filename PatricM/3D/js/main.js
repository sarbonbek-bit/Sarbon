var world = document.getElementById("world");

function player(x, y, z, vx, vy, vz){
    this.x = x;
    this.y = y;
    this.z = z;
    this.vx = vx;
    this.vy = vy;
    this.vz = vz;
}

var pawn = new player(0, 0, 0, 5, 5, 5);

let myRoom = [
    [0, 100, 0, 90, 0, 0, 2000, 2000, "brown", 1, "url('textures/floor_01.jpg')"],
    [0, -100, -1000, 0, 0, 0, 2000, 400, "brown", 1, "url('textures/sandy_wall.jpg')"],
];

drawMyWorld(myRoom, "wall")

// let drx = 0;

var pressForward = pressBack = 0;

document.addEventListener("keydown", (event) => {
    if(event.key == "w"){
        pressForward = pawn.vz;
    }
    if(event.key == "s"){
        pressBack = pawn.vz;
    }
    // if (event.key == "ArrowUp") {
    //     drx++;
    //     world.style.transform = `rotateX(${drx}deg)`
    // }
    // if (event.key == "ArrowDown") {
    //     drx--;
    //     world.style.transform = `rotateX(${drx}deg)`
    // }
})
document.addEventListener("keyup", (event) => {
if(event.key == "w"){
        pressForward = 0;
    }
    if(event.key == "s"){
        pressBack = 0;
    }
})

function update(){
    let dz = pressForward - pressBack;

    pawn.z += dz;

    world.style.transform = `translate3d(${pawn.x}px, ${pawn.y}px, ${pawn.z}px)`;
}

let game = setInterval(update, 10);

function drawMyWorld(squares, name) {
    for (let i = 0; i < squares.length; i++) {
        let mySquare1 = document.createElement("div");
        mySquare1.id = `${name}${i}`;
        mySquare1.style.position = "absolute";
        mySquare1.style.width = `${squares[i][6]}px`;
        mySquare1.style.height = `${squares[i][7]}px`;
        if (squares[i][10]) {
            mySquare1.style.backgroundImage = squares[i][10];
        } else {
            mySquare1.style.backgroundColor = squares[i][8];
        }
        mySquare1.style.transform = `translate3d(${600 + squares[i][0] - squares[i][6] / 2}px, ${400 + squares[i][1] - squares[i][7] / 2}px, ${squares[i][2]}px) rotateX(${squares[i][3]}deg) rotateY(${squares[i][4]}deg) rotateZ(${squares[i][5]}deg)`;
        mySquare1.style.opacity = squares[i][9];
        world.appendChild(mySquare1);
    }
}