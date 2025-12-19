

function drawMyBullet(num) {
    let shooting_bullet = document.createElement("div");
    shooting_bullet.id = `shooting_bullet${num}`;
    // shooting_bullet.id = `lode`;
    shooting_bullet.style.display = "block";
    shooting_bullet.style.position = "absolute";
    shooting_bullet.style.width = `20px`;
    shooting_bullet.style.height = `20px`;
    shooting_bullet.style.borderRadius = `50%`;
    shooting_bullet.style.backgroundColor = `red`;
    world.appendChild(shooting_bullet);

    return shooting_bullet;
    // lode_daudzums++;
}