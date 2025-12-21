
function spawnItem({ x, y, z, size = 100, rx = 0, ry = 0, rz = 0 }) {
  // DOM
  const item = document.createElement("div");
  item.id = `item_number${myItemsCounter++}`;
  item.style.display = "block";
  item.style.position = "absolute";
  item.style.width = `${size}px`;
  item.style.height = `${size}px`;
  item.style.borderRadius = "10%";
  item.style.backgroundColor = "#B5A642";

  // Anzeige (DOM braucht bei dir +600/+400 Offset)
  item.style.transform = `
    translate3d(${600 + x - size / 2}px, ${400 + y - size / 2}px, ${z}px)
    rotateX(${rx}deg)
    rotateY(${ry}deg)
    rotateZ(${rz}deg)
  `;

  world.appendChild(item);

  // DATA: world coords (ohne 600/400), size steckt bei dir in vx
  const data = new player(x, y, z, rx, ry, size, size, size);

  my_items.push(item);
  myItemsData.push(data);

  return { item, data };
}


function remove_item() {
  let i = 0
  // myItemsData[i].style.display = "none";
  if (myItemsData[i].parentNode) {
    myItemsData[i].parentNode.removeChild(myItemsData[i]);
  }
  myItemsData.splice(i, 1);
  myItemsData.splice(i, 1);
  i--;
}
function updateItemTransform(i) {
  const it = myItemsData[i];
  const el = my_items[i];
  const size = it.vx; // bei dir Größe

  el.style.transform = `
    translate3d(${600 + it.x - size/2}px, ${400 + it.y - size/2}px, ${it.z}px)
    rotateX(${it.rx}deg)
    rotateY(${it.ry}deg)
  `;
}

function showHit(text) {
  const el = document.getElementById("hitmsg");
  el.textContent = text;
  el.style.display = "block";
  clearTimeout(showHit._t);
  showHit._t = setTimeout(() => el.style.display = "none", 2000);
}

function is_hidden_test(itemsData) {
  const b = myBulletData.at(-1);
  if (!b) return;

  for (let i = 0; i < itemsData.length; i++) {
    const it = itemsData[i];

    const dx = b.x - it.x;
    const dy = b.y - it.y;
    const dz = b.z - it.z;

    const tunnel = Math.abs(b.vx) / 2;          // optional
    const r = it.radius + 25 + tunnel;          // itemRadius + bulletRadius + puffer

    if (dx * dx + dy * dy + dz * dz < r * r) {
      console.log("ITEM GETROFFEN", i);
      return;
    }
  }
}
function checkHits() {
  if (!myBulletData.length) return;
  if (!myItemsData.length) return;

  if (myBulletData.length && myItemsData.length) {
    const b = myBulletData.at(-1);
    const it = myItemsData[0];
    console.log("bullet y:", b.y, "item y:", it.y, "dy:", Math.abs(b.y - it.y));
  }

  for (let bi = 0; bi < myBulletData.length; bi++) {
    const b = myBulletData[bi];

    for (let ii = 0; ii < myItemsData.length; ii++) {
      const it = myItemsData[ii];

      const dx = b.x - it.x;
      const dz = b.z - it.z;
      const dy = b.y - it.y;

      const bulletRadius = 25;                 // 50px/2
      const itemRadius = (it.vx ?? 100) / 2;   // item_size steckt in vx
      const tunnel = Math.max(Math.abs(b.vx), Math.abs(b.vz)) / 2;

      const r = itemRadius + bulletRadius + tunnel;

      if (dx * dx + dz * dz < r * r) {
        // if (dx * dx + dy * dy + dz * dz < r * r) {
          console.log("HIT!", { bullet: bi, item: ii });
          showHit("Item getroffen!");
          // Item entfernen (DOM + Data)
          if (my_items[ii]?.parentNode) my_items[ii].parentNode.removeChild(my_items[ii]);
          my_items.splice(ii, 1);
          myItemsData.splice(ii, 1);

          update_points(++counter_points)
          thing.play()
          return;
        }
      }
    }
  }
