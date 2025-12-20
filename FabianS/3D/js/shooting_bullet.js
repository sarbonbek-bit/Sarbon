

function drawMyBullet(num) {
    let shooting_bullet = document.createElement("div");
    shooting_bullet.id = `shooting_bullet${num}`;
    // shooting_bullet.id = `lode`;
    shooting_bullet.style.display = "block";
    shooting_bullet.style.position = "absolute";
    shooting_bullet.style.width = `50px`;
    shooting_bullet.style.height = `50px`;
    shooting_bullet.style.borderRadius = `50%`;
    shooting_bullet.style.backgroundColor = `#B5A642 `;

    shooting_bullet.style.transform = `
        translate3d(${600 + pawn.x - 25}px, 
        ${400 + pawn.y - 25}px, 
        ${pawn.z}px) 
        rotateX(${pawn.rx}deg) 
        rotateY(${-pawn.ry}deg)
    `

    world.appendChild(shooting_bullet);

    return shooting_bullet;
    // lode_daudzums++;
}



function updateBullets() {

    for (let i = 0; i < my_shooting_bullets.length; i++) {
        
        
        dzb = +(myBulletData[i].vx) * Math.sin((myBulletData[i].ry - 45) * DEG) - (myBulletData[i].vz) * Math.cos((myBulletData[i].ry - 45) * DEG);
        dxb = +(myBulletData[i].vx) * Math.cos((myBulletData[i].ry - 45) * DEG) + (myBulletData[i].vz) * Math.sin((myBulletData[i].ry - 45) * DEG);
        
        
        myBulletData[i].x += dxb;
        myBulletData[i].z += dzb;
        
        myBulletData[i].y += gravity_bullet;
        
        // collision(
        //     myBulletData[i], 
        //     myItemsData
        // )
        
        my_shooting_bullets[i].style.transform = 
        `
            translate3d(
                ${600 + myBulletData[i].x - 25}px, 
                ${400 + myBulletData[i].y - 25}px, 
                ${myBulletData[i].z}px
            ) 
            rotateX(${myBulletData[i].rx}deg) 
            rotateY(${-myBulletData[i].ry}deg)
        `;
        
        // Muss auf Fehler überprüft werden. warum es nicht funktioniert so wie gedacht
        let distance = 3000
        if (
            Math.abs(
                my_shooting_bullets[i].x
            ) 
            > distance 
            ||
                Math.abs(
                    myBulletData[i].y
                ) 
            > distance 
            || 
                Math.abs(
                    myBulletData[i].z
                ) 
                > distance
        ) {
            // my_shooting_bullets[i].style.display = "none";
            if (my_shooting_bullets[i].parentNode) {
                my_shooting_bullets[i].parentNode.removeChild(my_shooting_bullets[i]);
            }
            my_shooting_bullets.splice(i, 1);
            myBulletData.splice(i, 1);
            i--;
        }
    }
}