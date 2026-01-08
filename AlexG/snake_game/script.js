const canvas = document.getElementById("game"); 
const ctx = canvas.getContext("2d");  
const foodImages = [
  "img/cherry.png",
  "img/grape.png",
  "img/apple.png",
  "img/banana.png",
  "img/lemon.png",
  "img/watermelon.png",
  "img/strawberry.png"
];

let myPlayground = new Image(); 
myPlayground.src = "img/ground.png";

let box = 32;
const bodyPadding = 6;

let myFood = new Image();
function newFood() {
    myFood.src = foodImages[Math.floor(Math.random() * foodImages.length)];
    return {
        x: (Math.trunc(17 * Math.random()) + 1) * box,
        y: (Math.trunc(15 * Math.random()) + 3) * box,
        type: "food"
    };
}

let food_coords = newFood();

let snakeHead = new Image();
snakeHead.src = "img/snake_head.png";

let snakeX = 0;
let snakeY = 0;
let dir = "";
let score = 0;

let bestScore = localStorage.getItem("bestScore") || 0;

let snake = [];
snake[0] = {
    x: 9*box,
    y: 10*box
}

document.addEventListener("keypress", (event) => {
    const key = (event.key || "").toLowerCase();
    if ((key == "w" || key == "arrowup") && dir != "down") dir = "up";
    if ((key == "s" || key == "arrowdown") && dir != "up") dir = "down";
    if ((key == "a" || key == "arrowleft") && dir != "right") dir = "left";
    if ((key == "d" || key == "arrowright") && dir != "left") dir = "right";
})

function drawRotatedImage(image, x, y, direction) {
    ctx.save();
    ctx.translate(x + box/2, y + box/2);
    let angle = 0;
    if (direction === "up") angle = Math.PI;
    else if (direction === "down") angle = 0;
    else if (direction === "left") angle = Math.PI / 2;
    else if (direction === "right") angle = -Math.PI / 2
    ctx.rotate(angle);
    ctx.drawImage(image, -box/2, -box/2, box, box);
    ctx.restore();
}

function eatTail(head, arr) {
    for(let i = 1; i < arr.length; i++) {
        if(head.x == arr[i].x && head.y == arr[i].y) {
            clearInterval(myGame);
            alert("💀 Game Over! Your score: " + score);
            return true;
        }
    }
    return false;
}

function drawGame(){ 
    ctx.drawImage(myPlayground, 0, 0);
    ctx.drawImage(myFood, food_coords.x, food_coords.y);
    ctx.fillStyle = "white";
    ctx.font = "50px serif";
    ctx.fillText("Points: " + score, 1*box, 1.7*box);
    ctx.fillText("Best: " + bestScore, 11*box, 1.5*box);
    for(let i = 0; i < snake.length; i++) {
        if (i === 0) {
            drawRotatedImage(snakeHead, snake[i].x, snake[i].y, dir);
        } 
        else {
            ctx.fillStyle = "#a0c432";
            ctx.fillRect(
                snake[i].x + bodyPadding,
                snake[i].y + bodyPadding,
                box - 2 * bodyPadding,
                box - 2 * bodyPadding
            );

            ctx.strokeRect(
                snake[i].x + bodyPadding,
                snake[i].y + bodyPadding,
                box - 2 * bodyPadding,
                box - 2 * bodyPadding
            );
        }
        
    }

    snakeX = snake[0].x;
    snakeY = snake[0].y;

    if(dir == "right") snakeX += box;
    if(dir == "up") snakeY -= box;
    if(dir == "left") snakeX -= box;
    if(dir == "down") snakeY += box;

    if (snakeX == food_coords.x && snakeY == food_coords.y) {
    score++;
    food_coords = newFood(); 
    }

    else {
        snake.pop();
    }

    if(score > bestScore) {
            bestScore = score;
            localStorage.setItem("bestScore", bestScore);
    }

    if(snakeX < 0 || snakeX > 18*box || snakeY < 0 || snakeY > 18*box){
        clearInterval(myGame);
        alert("💀 Game Over! Your score: " + score);
    }   

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    eatTail(newHead, snake);
    snake.unshift(newHead);
}

let myGame = setInterval(drawGame, 100) 