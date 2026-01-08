var world = document.getElementById("world");

let squares = [
    [500, 200, 100, 0, 0, 0, 200, 200, "greenyellow", 0.5],
    [500, 200, -100, 0, 0, 0, 200, 200, "blue", 0.5],
    [500, 100, 0, 90, 0, 0, 200, 200, "red", 0.5],
    [500, 300, 0, 90, 0, 0, 200, 200, "blueviolet", 0.5],
    [400, 200, 0, 0, 90, 0, 200, 200, "black", 0.5],
    [600, 200, 0, 0, 90, 0, 200, 200, "orangered", 0.5]
];

let myHome = [
    [0, 300, 0, 90, 0, 0, 2000, 1500, "greenyellow", 1, "url('texture/ground.jpg')"],
    [0, 299, 0, 90, 0, 0, 700, 500, "greenyellow", 1, "url('texture/floor.jpg')"],
    [0, 200, -250, 0, 0, 0, 700, 750, "greenyellow", 1, "url('texture/wall.jpg')"],
    [0, 200, 250, 0, 0, 0, 700, 750, "greenyellow", 1, "url('texture/wall.jpg')"],
    [350, 200, 0, 0, 90, 0, 500, 750, "greenyellow", 1, "url('texture/wall.jpg')"],
    [-350, 200, 0, 0, 90, 0, 500, 750, "greenyellow", 1, "url('texture/wall.jpg')"],
    [0, -175, 0, 90, 0, 0, 700, 500, "greenyellow", 1, "url('texture/ceiling.jpg')"],
];

drawMyWorld(myHome,"HOME")

// drawMyWorld(squares, "SQ");

let drx = 0;
let zoom = 100;

document.addEventListener("keydown", (event) =>{
    if(event.key == "ArrowDown"){
        drx++;
        world.style.transform = `rotateX(${drx}deg)`
    }
    if(event.key == "ArrowUp"){
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
    if(event.key == "]"){
        zoom++;
        world.style.transform = `translateZ(${zoom}px)`;
    }
    if(event.key == "["){
    zoom--;
      world.style.transform = `translateZ(${zoom}px)`; 
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