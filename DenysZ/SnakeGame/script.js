const canvas = document.getElementById("game"); //refering to the canvas element in html file
const ctx = canvas.getContext("2d"); //enables us to use some tools for drawing such like fillRect, drawImage etc. 

let myPlayground = new Image(); // create an empty Image object
myPlayground.src = "img/ground.png"; // we set the property src equal to the path to the file we want to diplay 
let myCherry = new Image();
myCherry.src = "img/cherry.png";
let myLemon = new Image();
myLemon.src = "img/lemon.png";
let myWatermelom = new Image();
myWatermelom.src = "img/watermelon.png";

let box = 32;
let food_coords = {
    x: (Math.trunc(17*Math.random())+1)*box,
    y: (Math.trunc(15*Math.random())+3)*box, 
    type: "cherry"
}

let snakeX = 0;
let snakeY = 0;
let dir = 0;
let score = 0;


let snake = [];
snake[0] = {
    x: 9*box,
    y: 10*box
}

document.addEventListener("keypress", (event) =>{
    if(event.key == "w" && dir != "down"){
        dir = "up";
    }
     if(event.key == "a" && dir != "right"){
        dir = "left";
    }
     if(event.key == "s" && dir != "up"){
        dir = "down";
    }
     if(event.key == "d" && dir != "left"){
        dir = "right";
    }
})

function drawGame(){ // the function for drawing the game
    ctx.drawImage(myPlayground, 0, 0);
    if (food_coords.type === "cherry") ctx.drawImage(myCherry, food_coords.x, food_coords.y);
    else if (food_coords.type === "lemon") ctx.drawImage(myLemon, food_coords.x, food_coords.y);
    else if (food_coords.type === "watermelon") ctx.drawImage(myWatermelom, food_coords.x, food_coords.y);
    ctx.fillStyle = "white";
    ctx.font = "50px serif";
    ctx.fillText("Points: " + score, 1*box, 1.7*box);
    ctx.fillStyle = "#11f0c3";
    for(let i = 0; i < snake.length; i++){
        ctx.fillRect(snake[i].x,snake[i].y, box, box);
    }

    snakeX = snake[0].x;
    snakeY = snake[0].y;

    if(dir == "right") snakeX += box;
    if(dir == "left") snakeX -= box;
    if(dir == "up") snakeY -= box;
    if(dir == "down") snakeY += box;

    // if the food is eaten
    if(snakeX == food_coords.x && snakeY == food_coords.y){
        const foodTypes = ["cherry", "lemon", "watermelon"];
        const randomType = foodTypes[Math.floor(Math.random()* foodTypes.length)]
        food_coords = {
            x: (Math.trunc(17*Math.random())+1)*box,
            y: (Math.trunc(15*Math.random())+3)*box, 
            type: randomType
        }
        score++;
    } else {
        snake.pop();
    }

    if(snakeX < 1*box){
        snakeX = 17*box;
    }

    if(snakeY < 3*box){
        snakeY = 17*box;
    }    


    let newHead = {
    x: snakeX,
    y: snakeY
    }

    snake.unshift(newHead);
}

let myGame = setInterval(drawGame, 100); // we create a refresh of the scene each 100 ms, each 100 ms the funciton drawGame will be used