// game constants & variable
let inputDirection = {x:0, y:0};  // snake direction stand at 0 position like stable position or rest postion
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');      // add sound in dashboard or game body
let speed = 5;
let lastPaintTime = 0;
let snakeArray = [{x : 13, y : 15}]
food = {x : 6, y : 7};
let score = 0;

// game logic function
function main(currentTime){
    window.requestAnimationFrame(main);
    // console.log(currentTime);
    if((currentTime - lastPaintTime)/1000 < 1/speed){ // condition apply for the refresh the screen and divided bt 1000 for mile second
        return;
    }
    lastPaintTime = currentTime;   // store the lastPaintTime vaule to currentTime value
    gameEngine();
}

function isCollide(snake) {
    // If you bump into yourself 
    for (let i = 1; i < snakeArray.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
        
    return false;
}

function gameEngine(){
    // part 1 : Updating the snake array & Food
    if(isCollide(snakeArray)){ // if it will thorw the wall or border
        gameOverSound.play();
        musicSound.pause();
        inputDirection = {x:0, y:0};    // input direction come to initial position
        alert("Game Over : Press any key to play again!");
        snakeArray = [{x : 13, y : 15}];
        musicSound.play();
        score = 0;
    }

    // If you have eaten the food, increment the score and regenerate the food
    if(snakeArray[0].y === food.y && snakeArray[0].x === food.x){
        foodSound.play();
        score += 1;
        if(score>highscoreval){
            highscoreval=score;
            localStorage.setItem("highscore", JSON.stringify(highscoreval));
            highscoreBox.innerHTML= "Hi-Score : " + highscoreval;
        }
        scoreBox.innerHTML="Score :" + score;
        snakeArray.unshift({x : snakeArray[0].x + inputDirection.x , y : snakeArray[0].y + inputDirection.y});
        let a = 2; // according to grid row & colunm number
        let b = 16; // according to grid row & colunm number
        food = {x : Math.round(a+ (b-a)* Math.random()), y : Math.round(a+ (b-a)* Math.random())};
    }

    // Moving the snake
    for (let i = snakeArray.length-2; i >= 0; i--){ // loop is started from the 2nd last element
        // const element = array[i];
        snakeArray[i+1] ={...snakeArray[i]};
    }

    snakeArray[0].x += inputDirection.x;
    snakeArray[0].y += inputDirection.y;



    // part 2 : Render/Display the snake array & Food
    // Display the snake
    board.innerHTML = "";   // use for the remove all element inside the board area
    snakeArray.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;  // style the grid by row wise
        snakeElement.style.gridColumnStart = e.x; // style the grid by coloum wise 
        
        if(index === 0){
            snakeElement.classList.add('head')
        }
        else{
            snakeElement.classList.add('snake');     // display the snake
        }
        board.appendChild(snakeElement); // snake element put inside the board
    });

     // Display the food
        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;  // style the grid by row wise
        foodElement.style.gridColumnStart = food.x; // style the grid by coloum wise 
        foodElement.classList.add('food')     // display the food
        board.appendChild(foodElement); // food element put inside the board

}
 

// main logic function
// hi score value store
let highscore = localStorage.getItem('hisocre');
if(highscore === null){
    highscoreval=0;
    localStorage.setItem("highscore", JSON.stringify(highscoreval))
}
else{
    highscoreval = JSON.parse(highscore);
    highscoreBox.innerHTML= "Hi-Score : " + highscore;
}

// for animation or control function
window.requestAnimationFrame(main);  //use for animation function
window.addEventListener('keydown', e =>{
    inputDirection = {x: 0, y: 1} // Start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDirection.x = 0;
            inputDirection.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDirection.x = 0;
            inputDirection.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDirection.x = -1;
            inputDirection.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDirection.x = 1;
            inputDirection.y = 0;
            break;
        default:
            break;
    }

});