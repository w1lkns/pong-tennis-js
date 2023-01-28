let ball;

// drawing ball

function drawCircle(x,y,size,color){
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(x,y,size,0,Math.PI * 2)
    ctx.fill();
}

// Ball movement
function moveBall(){
    ball.x = ball.x + ball.xv;
    ball.y = ball.y + ball.yv;
    // Player 1 let the ball pass
    if (ball.x <= 0){
        ball.x = (canvas.width/2);
        ball.y = (canvas.height/2);
        ball.xv = -ball.xv;
        soundBallPoint.play();
        player2.score++;
    }
    // bounce top bottom
    if (ball.y >= canvas.height || ball.y <= 0){
        soundBallWall.play();
        ball.yv = -ball.yv;
    }
    // Player 2 let the ball pass
    if (ball.x >= canvas.width){
        ball.x = (canvas.width/2);
        ball.y = (canvas.height/2);
        ball.xv = -ball.xv;
        soundBallPoint.play();
        player1.score++;
    }
}

// makes the bounce from the player a bit harder to predict
function deltaY(player){
    return ball.y - (player.y + player.height / 2)
}
