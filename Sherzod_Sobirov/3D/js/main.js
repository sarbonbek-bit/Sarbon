const world = document.getElementById("world");

let x = 0;
let y = 0;

document.addEventListener("keypress", (e) => {
  if (e.keyCode == 119) {
    x++;
  }
  if (e.keyCode == 115) {
    x--;
  }
  if (e.keyCode == 100) {
    y++;
  }
  if (e.keyCode == 97) {
    y--;
  }
  world.style.transform = `rotateX(${x}deg) rotateY(${y}deg)`;
});
