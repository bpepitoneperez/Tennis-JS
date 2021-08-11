let playPressed = false;
let quitPressed = false;
let playSounds = true;
let twoPlayer = false;

let racketHit = new Audio('racket-sound.mp3');
let wallHit = new Audio('wall-sound.mp3');
let goal = new Audio('score-sound.mp3');
racketHit.volume = 0.4;
wallHit.volume = 0.4;
goal.volume = 0.4;


window.onload = function() {
    canvas = document.getElementById("canvas");
    graphics=canvas.getContext("2d");
    createCanvas();
    document.addEventListener("keydown", keyDown);
    document.addEventListener("keyup", keyUp);
    setInterval(game, 1000/60);
}

const playButton = document.getElementById('play');
playButton.addEventListener('click', function() {
    playPressed = true;
    quitPressed = false;
});

const quitButton = document.getElementById('quit');
quitButton.addEventListener('click', function() {
    quitPressed = true;
    playPressed = false;
    reset();
})

const score1 = document.getElementById('score1');
const score2 = document.getElementById('score2');
const speed = 7;
const cpuSpeed = 5;
let paddleWidth = 40;
let paddleHeight = 160;
let paddle1Y=paddle2Y= (canvas.height / 2) - (paddleHeight / 2);
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballDimension = 10;
let paddle1Velocity=paddle2Velocity = 0;
let ballXVelocity = 5;
let ballYVelocity = Math.random() * (3 - (-3)) - 3;
let player1Count = 0;
let player2Count = 0;
let hitPosition = 0;
let angle = 0;
let angleChange = 0.1;

function createCanvas() {
    graphics.fillStyle = "black";
    graphics.fillRect(0, 0, canvas.width, canvas.height);
    graphics.fillStyle = "white";
    graphics.fillRect(0, paddle1Y, paddleWidth, paddleHeight);
    graphics.fillRect((canvas.width - paddleWidth), paddle2Y, paddleWidth, paddleHeight);
    graphics.fillRect(ballX  - ballDimension / 2, ballY, ballDimension, ballDimension);
    graphics.fillRect(canvas.width / 2, 0, 1, canvas.height);
}

function game() {
    if (!twoPlayer) {
        let midPaddle = paddle2Y + (paddleHeight / 2);
        if (ballY > midPaddle + 2) {
            paddle2Velocity = cpuSpeed;
        }
        else if (ballY < midPaddle - 2) {
            paddle2Velocity = -cpuSpeed;
        }
        else {
            paddle2Velocity = 0;
        }
    }
    if (playPressed) {
        ballX += ballXVelocity;
        ballY += ballYVelocity;
        paddle1Y += paddle1Velocity;
        paddle2Y += paddle2Velocity;
    }
    
    if (ballY < 0 || ballY > canvas.height - 10) {
        ballYVelocity = -ballYVelocity;
        if (playSounds) {
            wallHit.currentTime= 0;
            wallHit.play();
        }
    }
    if (ballX < 0 + paddleWidth && ballY > paddle1Y && ballY < paddle1Y + paddleHeight) {
        if (playSounds) {
            racketHit.currentTime= 0;
            racketHit.play();
        }
        ballXVelocity -= 1;
        ballXVelocity = -ballXVelocity;
        hitPosition = ballY - (paddle1Y + (paddleHeight / 2));
        angle = hitPosition * angleChange;
        ballYVelocity = angle;
    }
    if (ballX > canvas.width - 55 && ballY > paddle2Y && ballY < paddle2Y + paddleHeight) {
        if (playSounds) {
            racketHit.currentTime= 0;
            racketHit.play();
        }
        ballXVelocity += 1;
        ballXVelocity = -ballXVelocity;
        hitPosition = ballY - (paddle2Y + (paddleHeight / 2));
        angle = hitPosition * angleChange;
        ballYVelocity = angle;
    }
    if (ballX < 0 + paddleWidth && ballY == paddle1Y || ballY == paddle1Y + paddleHeight) {
        if (playSounds) {
            racketHit.currentTime= 0;
            racketHit.play();
        }
        ballYVelocity = -ballYVelocity;
    }
    if (ballX > canvas.width - 55 && ballY == paddle2Y || ballY == paddle2Y + paddleHeight) {
        if (playSounds) {
            racketHit.currentTime= 0;
            racketHit.play();
        }
        ballYVelocity = -ballYVelocity;
    }
    if (ballX < 0) {
        if (playSounds) {
            goal.currentTime= 0;
            goal.play();
        }
        player2Count++;
        ballXVelocity = 5;
        newRound();
    }
    if (ballX > canvas.width) {
        if (playSounds) {
            goal.play();
        }
        player1Count++;
        ballXVelocity = -5;
        newRound();
    }
    if (paddle1Y < 0) {
        paddle1Velocity = 0;
        paddle1Y = 0;
    }
    if (paddle1Y > canvas.height - paddleHeight) {
        paddle1Velocity = 0;
        paddle1Y = canvas.height - paddleHeight;
    }
    if (paddle2Y < 0) {
        paddle2Velocity = 0;
        paddle2Y = 0;
    }
    if (paddle2Y > canvas.height - paddleHeight) {
        paddle2Velocity = 0;
        paddle2Y = canvas.height - paddleHeight;
    }
    graphics.fillStyle = "black";
    graphics.fillRect(0, 0, canvas.width, canvas.height);
    graphics.fillStyle = "white";
    graphics.fillRect(0, paddle1Y, paddleWidth, paddleHeight);
    graphics.fillRect((canvas.width - paddleWidth), paddle2Y, paddleWidth, paddleHeight);
    graphics.fillStyle = "white";
    graphics.fillRect(ballX - ballDimension / 2, ballY, ballDimension, ballDimension);
    graphics.fillRect(canvas.width / 2, 0, 1, canvas.height);
}

function newRound() {
    score1.textContent = ("Player: " + player1Count);
    score2.textContent = ("CPU: " + player2Count);
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballYVelocity = Math.random() * (3 - (-3)) - 3;
    paddle1Y=paddle2Y= (canvas.height / 2) - (paddleHeight / 2);
}


function reset() {
    paddle1Y=paddle2Y= (canvas.height / 2) - (paddleHeight / 2);
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    player1Count = 0;
    player2Count = 0;
    score1.textContent = ("Player: " + player1Count);
    score2.textContent = ("CPU: " + player2Count);
}


function keyDown (e) {
    switch (e.keyCode) {
        case 87:
            paddle1Velocity = -speed;
            break;
        case 83:
            paddle1Velocity = speed;
            break;
        case 38:
            paddle1Velocity = -speed;
            break;
        case 40:
            paddle1Velocity = speed;
            break;
    }
}

function keyUp(e) {
    switch (e.keyCode) {
        case 87:
            paddle1Velocity = 0;
            break;
        case 83:
            paddle1Velocity = 0;
            break;
        case 38:
            paddle1Velocity = 0;
            break;
        case 40:
            paddle1Velocity = 0;
            break;
    }
}