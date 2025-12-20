

function insert_item(number){
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
    item_data.push(x_item)
    item_data.push(y_item)
    item_data.push(dx_position_item)
    item_data.push(dy_position_item)
    return [
        item , 
        item_data
    ]
}

function is_hidden(obj){
  // pirmaLode = aktuelle Kugel / Projektil
  // obj[i] = Objekt im Raum 
  let pirmaLode = myBulletData[
    myBulletData.length - 1
  ]
  for (let i = 0; i < obj.length; i++) {
    // console.log(pirmaLode)
    // let r = (lode_x - obj[i][0]) ** 2 + (lode_y - obj[i][1]) ** 2 + (lode_z - obj[i][2]) ** 2;
    let r = (pirmaLode.x - obj[i][0]) ** 2 + (pirmaLode.y - obj[i][1]) ** 2 + (pirmaLode.z - obj[i][2]) ** 2;
    console.log("r", (obj))
    console.log("r", (obj[i][6]) ** 2)
    console.log("r", (obj[i][7]) ** 2)
    console.log("r", r < (obj[i][6]) ** 2 + (obj[i][7]) ** 2)
    if (r < (obj[i][6]) ** 2 + (obj[i][7]) ** 2) {
      panemsanasSkana.play();
      // punkti++;
      // myH1.textContent = `Punkti: ${punkti} no ${obj.length}`;
      // if (punkti == obj.length) {
      //   var myH2 = document.createElement("h1");
      //   myH2.textContent = "Punkti sakrāti, var doties uz teleportu!"
      //   mansTeksts.appendChild(myH2);
      // }
      mansTeksts.appendChild(myH1);
      obj[i][0] = 100000;
      obj[i][1] = 100000;
      obj[i][2] = 100000;
      lode.remove();
      zimetLodi();
    }
  }
}
function remove_item(){
    let i = 0
    // myItemsData[i].style.display = "none";
    if (myItemsData[i].parentNode) {
        myItemsData[i].parentNode.removeChild(myItemsData[i]);
    }
    myItemsData.splice(i, 1);
    myItemsData.splice(i, 1);
    i--;
}