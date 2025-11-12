var world = document.getElementById("world");

let drx = 0;

document.addEventListener("keydown", (event) =>{
    if(event.key == "ArrowUp"){
        drx++;
        world.style.transform = `rotateX(${drx}deg)`
    }
    if(event.key == "ArrowDown"){
        drx--;
        world.style.transform = `rotateX(${drx}deg)`
    }
    if(event.key == "ArrowLeft"){
        drx--;
        world.style.transform = `rotateY(${drx}deg)`
    }
    if(event.key == "ArrowRight"){
        drx++;
        world.style.transform = `rotateY(${drx}deg)`
    }   
})

// function update(){

// }

// let game = setInterval(update, 10);