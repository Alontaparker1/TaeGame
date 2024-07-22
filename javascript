<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Shooting Game</title>
<style>
    body {
        font-family: Arial, sans-serif;
        text-align: center;
    }
    canvas {
        border: 1px solid black;
        display: block;
        margin: 0 auto;
    }
</style>
</head>
<body>
<h2>Shooting Game</h2>
<canvas id="gameCanvas" width="800" height="600"></canvas>

<script>
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    // Cannon variables
    const cannonWidth = 50;
    const cannonHeight = 30;
    let cannonX = canvas.width / 2 - cannonWidth / 2;
    const cannonY = canvas.height - cannonHeight;

    // Projectiles variables
    const projectileWidth = 5;
    const projectileHeight = 15;
    let projectiles = [];

    // Targets variables
    const targetRadius = 20;
    let targets = [];

    // Game loop
    function gameLoop() {
        clearCanvas();
        drawCannon();
        moveProjectiles();
        drawProjectiles();
        createTargets();
        moveTargets();
        drawTargets();
        collisionDetection();
        requestAnimationFrame(gameLoop);
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function drawCannon() {
        ctx.fillStyle = 'gray';
        ctx.fillRect(cannonX, cannonY, cannonWidth, cannonHeight);
    }

    function moveProjectiles() {
        projectiles.forEach(projectile => {
            projectile.y -= 5; // Adjust speed here
        });
        // Remove projectiles that are out of canvas
        projectiles = projectiles.filter(projectile => projectile.y > 0);
    }

    function drawProjectiles() {
        ctx.fillStyle = 'black';
        projectiles.forEach(projectile => {
            ctx.fillRect(projectile.x, projectile.y, projectileWidth, projectileHeight);
        });
    }

    function createTargets() {
        if (Math.random() < 0.02) { // Adjust frequency of targets here
            const targetX = Math.random() * (canvas.width - 2 * targetRadius) + targetRadius;
            targets.push({ x: targetX, y: -targetRadius });
        }
    }

    function moveTargets() {
        targets.forEach(target => {
            target.y += 1; // Adjust speed of targets here
        });
        // Remove targets that are out of canvas
        targets = targets.filter(target => target.y < canvas.height);
    }

    function drawTargets() {
        ctx.fillStyle = 'red';
        targets.forEach(target => {
            ctx.beginPath();
            ctx.arc(target.x, target.y, targetRadius, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    function collisionDetection() {
        projectiles.forEach(projectile => {
            targets.forEach(target => {
                const dx = projectile.x - target.x;
                const dy = projectile.y - target.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < targetRadius + projectileHeight) {
                    // Collision detected, remove both projectile and target
                    projectiles = projectiles.filter(p => p !== projectile);
                    targets = targets.filter(t => t !== target);
                }
            });
        });
    }

    // Event listeners for cannon movement and shooting
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowLeft' && cannonX > 0) {
            cannonX -= 10; // Adjust movement speed here
        } else if (event.key === 'ArrowRight' && cannonX < canvas.width - cannonWidth) {
            cannonX += 10; // Adjust movement speed here
        } else if (event.key === ' ') { // Space bar to shoot
            projectiles.push({ x: cannonX + cannonWidth / 2 - projectileWidth / 2, y: cannonY });
        }
    });

    // Start the game loop
    gameLoop();
</script>
</body>
</html>
