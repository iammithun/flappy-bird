const canvas = document.getElementById('flappyBirdCanvas');
const context = canvas.getContext('2d');

// Game Variables
let bird = { x: 50, y: 150, width: 20, height: 20, gravity: 1.5, lift: -15, velocity: 0 };
let pipes = [];
let pipeWidth = 40;
let pipeGap = 100;
let gameOver = false;

// Event Listener for Jump
document.addEventListener('keydown', () => {
    bird.velocity = bird.lift;
});

// Create Pipes
function createPipe() {
    let height = Math.floor(Math.random() * (canvas.height - pipeGap - 20)) + 10;
    pipes.push({
        x: canvas.width,
        top: height,
        bottom: height + pipeGap,
        width: pipeWidth
    });
}

// Update Game Elements
function update() {
    if (gameOver) return;

    // Bird gravity
    bird.velocity += bird.gravity;
    bird.y += bird.velocity;

    // Check if bird hits the ground or flies out
    if (bird.y + bird.height >= canvas.height || bird.y <= 0) {
        gameOver = true;
        alert('Game Over!');
        document.location.reload();
    }

    // Pipes movement
    for (let i = 0; i < pipes.length; i++) {
        pipes[i].x -= 2;

        // Check for collision
        if (
            bird.x < pipes[i].x + pipeWidth &&
            bird.x + bird.width > pipes[i].x &&
            (bird.y < pipes[i].top || bird.y + bird.height > pipes[i].bottom)
        ) {
            gameOver = true;
            alert('Game Over!');
            document.location.reload();
        }

        // Remove pipes out of frame and add new ones
        if (pipes[i].x + pipeWidth < 0) {
            pipes.splice(i, 1);
            i--;
        }
    }

    // Add new pipe every 100 frames
    if (pipes.length === 0 || pipes[pipes.length - 1].x < canvas.width - 200) {
        createPipe();
    }
}

// Draw Game Elements
function draw() {
    if (gameOver) return;

    // Clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw bird
    context.fillStyle = 'yellow';
    context.fillRect(bird.x, bird.y, bird.width, bird.height);

    // Draw pipes
    for (let i = 0; i < pipes.length; i++) {
        context.fillStyle = 'green';
        context.fillRect(pipes[i].x, 0, pipeWidth, pipes[i].top);
        context.fillRect(pipes[i].x, pipes[i].bottom, pipeWidth, canvas.height - pipes[i].bottom);
    }
}

// Game Loop
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
