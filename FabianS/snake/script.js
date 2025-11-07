

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// % Change between Klick or autmatic run %
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// let automatic_run= false
let automatic_run= true 


const canvas = document.getElementById("game"); //refering to the canvas element in html file
const ctx = canvas.getContext("2d"); //enables us to use some tools for drawing such like fillRect, drawImage etc. 

let myPlayground = new Image(); // create an empty Image object
let myCarrot = new Image();
let dir = ""
let counter = 0;
let box = 32;
let snake = []
let game_is_running = true
let press_key = false
let pop_snake = false 

snake[0] = {
    x: 9 * box,
    y:  10 * box
}
let newHead = {
    x: 0,
    y: 0
}
let food_coords = {
    //(Math.trunc(17*Math.random())+1)*box,
    x: x_val() * box,
    //(Math.trunc(15*Math.random())+3)*box, 
    y: y_val() * box,
    type: "carrot"
}
let can_move = false 
let points = 0

function y_val(){
    ber_y = (Math.trunc(15*Math.random())+3)
    return ber_y;
}
function x_val(){
    ber_x = (Math.trunc(17*Math.random())+1)
    return ber_x;
}


myPlayground.src = "img/ground.png"; // we set the property src equal to the path to the file we want to diplay 
myCarrot.src = "img/carrot.png";

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// Functions logical
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
function is_documented(new_x, new_y) {
    console.log("is_documented")
    let found = snake.find(element =>
        element.x === new_x && element.y === new_y
    );
    is_doc = found ? true : false
    if(is_doc){
        pop_snake = false
    }
    return is_doc;
}

function check_self_collision(newHead){
    console.log("check_self_collision")
    result = is_documented(newHead.x, newHead.y) 
    if(
        result 
        // && !can_move
    ){
        game_is_running = false
        // clearInterval(myGame)
    }
    console.log(result)
}
function check_if_snake_is_on_boarder(newHead){
    console.log("check_if_snake_is_on_boarder")
    if(
        newHead.x < 0 
        || newHead.x > 18 * box
        || newHead.y < 0 
        || newHead.y > 18 * box
    ){
        game_is_running = false
        pop_snake = false
    }
    check_self_collision(newHead)
}

function move_snake(){
    console.log("move snake")
    if(
        dir == "up"
    ){
        newHead={
            x: snake[0].x ,
            y: snake[0].y - box
        }
    }

    if(
        dir == "down"
    ){
        newHead={
            x: snake[0].x ,
            y: snake[0].y + box
        }
    }

    if(
        dir == "left"
    ){
            newHead={
            x: snake[0].x - box,
            y: snake[0].y 
        }
    }

    if(
        dir == "right"
    ){
        newHead={
            x: snake[0].x + box,
            y: snake[0].y 
        }
    }


    if (can_move){
        check_if_snake_is_on_boarder(newHead)
        snake.unshift(newHead)
        if(pop_snake){
            snake.pop()
            pop_snake = false
        }
    }
}

function check_if_its_eaten(){
    if(
        food_coords.x == snake[0].x 
        &&  
        food_coords.y == snake[0].y
    ){
        new_x = x_val() * box
        new_y = y_val() * box
        while(is_documented(new_x, new_y)){
            console.log("new Position")
            new_x = x_val() * box
            new_y = y_val() * box
        }
        points++
        val = is_documented(new_x, new_y)
        food_coords = {
            x: new_x ,
            y: new_y ,
            type: "carrot"
        }

    }
    else{
        if(press_key){
            // snake.pop()
            pop_snake = true
        }
    }
}

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%






function drawGame(){ // the function for drawing the game
    console.log(counter++)
    ctx.drawImage(myPlayground, 0, 0);
    ctx.drawImage(myCarrot, food_coords.x, food_coords.y);
    ctx.fillStyle = "white";
    ctx.font = "50px serif";
    ctx.fillText("Points:" + points, box, 1.5 * box)
    
    ctx.fillStyle = game_is_running ? "white" : "red";
    ctx.fillText(game_is_running ? "" : "Game Over", 11 * box, 1.5*box)
    console.log("Game is Runing:", game_is_running ? "" : "Game Over" && clearInterval(myGame))
    // game_is_running ? "" : clearInterval(myGame)
    ctx.fillStyle = "#305CDE";

    for(let c = 0; c < snake.length; c++){
        ctx.fillRect(snake[c].x, snake[c].y, box, box);
    }

    // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    // % IF you want continue walk %
    // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    if(automatic_run){
        check_if_its_eaten()
        move_snake()
    }

}

// we create a refresh of the scene each 100 ms, 
// each 100 ms the funciton drawGame will be used
let myGame = setInterval(drawGame, 100) 

document.addEventListener('keydown', function(event){
    press_key = true
    if (
        (
            event.key === 'ArrowUp' 
            ||
            event.key === "w"
        )
        && dir != "down"
    ){
        dir = "up"
        can_move = true
    } 
    
    else if (
        (
            event.key === 'ArrowDown' 
            ||
            event.key === "s"
        )
        && dir != "up"
    ){
        dir = "down"
        can_move = true
    } 
    
    else if (
        (
            event.key === 'ArrowLeft' 
            ||
            event.key === "a"
        )
        && dir != "right"
    ){
        dir = "left"
        can_move = true
    } 
  
    else if (
        (
            event.key === 'ArrowRight' 
            ||
            event.key === "d"       
        )
        && dir != "left"
    ){
        dir = "right"
        can_move = true
    }
    
    if(!automatic_run){
        move_snake()
        check_if_its_eaten()
    }
});
