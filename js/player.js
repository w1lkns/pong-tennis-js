let player1,player2;

// Player1 movement 
let up = false;
let down = false;

function move(){
    if(up) {
        if (player1.y > 10){
        player1.y -= player1.speed;
        } else {
            return;
        }
	}
	if(down) {
        if ((player1.y + player1.height) < canvas.height - 10){
		player1.y += player1.speed;	
        } else {
            return;
        }
	}

    //limit move

    document.onkeydown = function(e) {
        if(e.key == 'ArrowUp') up = true;
        if(e.key == 'ArrowDown') down = true;
    }
    
    document.onkeyup = function(e) {
        if(e.key == 'ArrowUp') up = false;
        if(e.key == 'ArrowDown') down = false;
    }

}


// player Move - computer
function movePlayer(player){
    let centerY = player.y + player.height / 2;
    if (centerY < ball.y - player.offset){
        player.y += 10;
    } 
    else if (centerY > ball.y + player.offset){
        player.y -= 10;
    } 
}