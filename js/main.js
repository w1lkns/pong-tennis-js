const myGameArea = {
    canvas: document.createElement('canvas'),
    start: function (){
        this.canvas.width = 720;
        this.canvas.height = 400;
        this.context = this.canvas.getContext('2d');
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    }
}

const startGame = () =>{
    console.log('Game is starting! ')
    //diplay none for start game screen
    //display "" for game-area
}

const stopGame = () => {
    console.log('Game is stopped!')
     //display none for game area
     //display "" for game over screen
}