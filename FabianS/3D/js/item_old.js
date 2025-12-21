
function insert_item(number) {
  let item_size = 100

  let y_position_floor = 350 + item_size / 2
  let y_position_second_floor = 100 + item_size / 2


  let x_item = 700
  let y_item = y_position_floor
  let z_item = -40
  let dx_position_item = pawn.rx
  let dy_position_item = pawn.ry


  var item = document.createElement("div");
  item.id = `item_number${number}`;
  // item.textContent = "Punkti sakrāti, var doties uz teleportu!";

  item.style.display = "block";
  item.style.position = "absolute";
  item.style.width = `${item_size}px`;
  item.style.height = `${item_size}px`;
  item.style.borderRadius = `10%`;
  item.style.backgroundColor = `#B5A642`;

  item.style.transform = `
        translate3d(
            ${x_item}px, 
            ${y_item}px, 
            ${z_item}px
        ) 
        rotateX(${dx_position_item}deg) 
        rotateY(${dy_position_item}deg)
    `

  world.appendChild(item);
  let item_data = []
  item_data.push({
    x: x_item,
    y: y_item,
    z: z_item,
    dx: dx_position_item,
    dy: dy_position_item,
    size: item_size
  })

  return [
    item,
    item_data[0]
  ]
}