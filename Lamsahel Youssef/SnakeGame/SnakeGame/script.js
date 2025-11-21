const canvas = document.getElementById("game"); //refering to the canvas element in html file
const ctx = canvas.getContext("2d"); //enables us to use some tools for drawing such like fillRect, drawImage etc. 

let myPlayground = new Image(); // create an empty Image object
myPlayground.src = "img/ground.png"; // we set the property src equal to the path to the file we want to diplay 
let myKiwi = new Image(); // create kiwi image
myKiwi.src = "img/kiwi.png"; // load kiwi image

let box = 32;
let food_coords = {
    x: (Math.trunc(17 * Math.random()) + 1) * box,
    y: (Math.trunc(15 * Math.random()) + 3) * box,
    type: "kiwi"
}

let snakeX = 0;
let snakeY = 0;
let dir = "";
let score = 0;
let flashFood = true; // For flashing food effect

let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
}
snake[1] = {
    x: 8 * box,
    y: 10 * box
}
snake[2] = {
    x: 7 * box,
    y: 10 * box
}

document.addEventListener("keypress", (event) => {
    if (event.key == "w" && dir != "down") {
        dir = "up";
    }
    if (event.key == "s" && dir != "up") {
        dir = "down";
    }
    if (event.key == "a" && dir != "right") {
        dir = "left";
    }
    if (event.key == "d" && dir != "left") {
        dir = "right";
    }
})


function drawGame() { // the function for drawing the game
    ctx.drawImage(myPlayground, 0, 0);
    
    // FEATURE 2: Flashing food - only draw if flashFood is true
    flashFood = !flashFood; // Toggle between true and false
    if (flashFood) {
        ctx.drawImage(myKiwi, food_coords.x, food_coords.y, box, box); // Draw kiwi image with correct size
    }
    
    ctx.fillStyle = "lime";
    ctx.font = "50px serif";
    ctx.fillText("Score: " + score, 1 * box, 1.7 * box);
    
    // FEATURE 1: Snake color changes based on length
    for (let i = 0; i < snake.length; i++) {
        if (snake.length < 5) {
            ctx.fillStyle = "red"; // Short snake = red
        } else if (snake.length < 10) {
            ctx.fillStyle = "orange"; // Medium snake = orange
        } else if (snake.length < 15) {
            ctx.fillStyle = "yellow"; // Long snake = yellow
        } else {
            ctx.fillStyle = "gold"; // Very long snake = gold
        }
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    snakeX = snake[0].x;
    snakeY = snake[0].y;

    if (dir == "right") snakeX += box;
    if (dir == "up") snakeY -= box;
    if (dir == "left") snakeX -= box;
    if (dir == "down") snakeY += box;

    //if the food is eaten
    if (snakeX == food_coords.x && snakeY == food_coords.y) {
        // FEATURE 3: Play beep sound when eating food
        playBeep();
        
        food_coords = {
            x: (Math.trunc(17 * Math.random()) + 1) * box,
            y: (Math.trunc(15 * Math.random()) + 3) * box,
            type: "kiwi"
        }
        score++;
    } else {
        snake.pop();
    }

    if (snakeX < 0 || snakeX > 18 * box) {
        clearInterval(myGame);
    }

    // if (snakeX < 0) {
    //     snakeX = 17*box;
    // }


    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);

}

// FEATURE 3: Simple beep sound function
function playBeep() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800; // Beep frequency
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}

let myGame = setInterval(drawGame, 80) // we create a refresh of the scene each 80 ms, making the game faster