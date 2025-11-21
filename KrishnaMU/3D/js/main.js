var world = document.getElementById("world");

let squares = [
    [500, 300, 100, 0, 0, 0, 200, 200, "blueviolet", 0.5],
    [500, 300, -100, 0, 0, 0, 200, 200, "yellowgreen", 0.5],
    [500, 400, 0, 90, 0, 0, 200, 200, "black", 0.5],
    [500, 200, 0, 90, 0, 0, 200, 200, "red", 0.5],
    [600, 300, 0, 0, 90, 0, 200, 200, "blue", 0.5],
    [400, 300, 0, 0, 90, 0, 200, 200, "green", 0.5]
];

let myRoom = [
    [0, 100, 0, 90, 0, 0, 2000, 2000, "brown", 1, "url('textures/ganges_river_pebbles_diff_1k.jpg')"],
    [0, 100, -1000, 0, 0, 0, 2000, 400, "brown", 1, "url('textures/rough_linen_diff_1k.jpg')"],
];

drawMyWorld(myRoom, "wall")
// drawMyWorld(squares, "MMM");

let drx = 0;

document.addEventListener("keydown", (event) => {
    if (event.key == "ArrowUp") {
        drx++;
        world.style.transform = `rotateX(${drx}deg)`
    }
    if (event.key == "ArrowDown") {
        drx--;
        world.style.transform = `rotateX(${drx}deg)`
    }
})

// function update(){

// }

// let game = setInterval(update, 10);

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