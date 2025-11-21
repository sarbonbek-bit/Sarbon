var world = document.getElementById("world");

let squares = [
    [500, 200, 100, 0, 0, 0, 200, 200, "yellow", 0.5],
    [500, 200, -100, 0, 0, 0, 200, 200, "rgb(0, 255, 179)", 0.5],
    [500, 100, 0, 90, 0, 0, 200, 200, "rgb(255, 0, 144)", 0.5],
    [500, 300, 0, 90, 0, 0, 200, 200, "rgb(195, 0, 255)", 0.5],
    [600, 200, 0, 0, 90, 0, 200, 200, "rgb(254, 229, 0)", 0.5],
    [400, 200, 0, 0, 90, 0, 200, 200, "orange", 0.5]
];

let myroom = [
    [0, 100, 0, 90, 0, 0, 2000, 2000, "brown", 1, "url('textures/pool.jpg')"],
    [0, -300, 0, 90, 0, 0, 2000, 2000, "lightgrey", 1, "url('textures/potalok.jpg')"],
    [1000, 100, 0, 0, 90, 0, 2000, 1000, "lightgreen", 1, "url('textures/wall.jpg')"],
    [ -1000, 100, 0, 0, 90, 0, 2000, 1000, "lightcoral", 1, "url('textures/wall.jpg')"],
    [0, 100, 1000, 0, 0, 0, 2000, 1000, "lightyellow", 1, "url('textures/wall.jpg')"],
    [0, 100, -1000, 0, 0, 0, 2000, 1000, "lightblue", 1, "url('textures/wall.jpg')"],
];

// drawMyWorld(squares, "MMM");
drawMyWorld(myroom, "wall")


let drx = 0;
let zoom = 0;

document.addEventListener("keydown", (event) =>{
    if(event.key == "ArrowUp"){
        drx++;
        world.style.transform = `rotateX(${drx}deg)`
    }
    if(event.key == "ArrowDown"){
        drx--;
        world.style.transform = `rotateX(${drx}deg)`
    }
    if(event.key == "ArrowRight"){
        drx++;
        world.style.transform = `rotateY(${drx}deg)`
    }

    if(event.key == "ArrowLeft"){
        drx--;
        world.style.transform = `rotateY(${drx}deg)`
    }
    
})



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
