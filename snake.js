    window.onload = function(){
        startApp();
        }

            
            
            let canvas
            let context2d;
            let runningGameInterval;
            let gameOverInterval;
            let snake = [];
            let wallSize = 10;
            let dx = 0;
            let dy = 0;
            let pauseGame = true;
            let currentDirection = "left";
            let food = {x:0, y:0, color: "white"};
            let score = 0;
            let directionFlag = false;
            let resetBtn;
            let menuBtn;
            let scoreTable;
            let touchDirection = 39 ;
            let virtualControl;
            
            let screenTouch;


            let menuWindow;
            let canvasWindow;
            let level = [];
            let snakeSpeed = 70;
            let playBtn;




            function getRandomInt(max) {
                return Math.floor(Math.random() * max);
            }
            function drawRectRandomColor(x, y, width, height){
                context2d.fillStyle = `rgb(${getRandomInt(255)}, ${getRandomInt(255)}, ${getRandomInt(255)})`;
                context2d.fillRect(x, y, width, height)
            }

            function clearCanvas() {
                context2d.fillStyle = "black";
                context2d.fillRect (0,0, canvas.width, canvas.height)
            }

            function makeSnake(snakeLength) {
                for(let i=0; i < snakeLength; i++) {
                    let x = canvas.width/2 + i * wallSize;
                    let y = canvas.height/2;
                    snake.push( {x:x, y:y} )
                }
            }

            function drawSnake () {
                snake.forEach (function(el){
                    context2d.strokeStyle = "red";
                    context2d.lineWidth = 5;
                    context2d.lineJoin = 'bevel';
                    context2d.strokeRect(el.x, el.y, wallSize, wallSize);
                })
            }

            function gameOver(){
                clearInterval(gameOverInterval);
                clearInterval(runningGameInterval);
                context2d.font = "50px GIll";
                context2d.fillStyle = "white";
                context2d.fillText("GAME OVER", 50, 200);
                gameOverInterval = setInterval(function(){
                    drawSnake();
                    setTimeout((function(){
                        snake.forEach (function(el){
                        context2d.strokeStyle = "black";
                        context2d.lineWidth = 5;
                        context2d.lineJoin = 'bevel';
                        context2d.strokeRect(el.x, el.y, wallSize, wallSize);
                })
                    }
                    ), 500)
                }, 1000)
            }

            function resetGame() {
                clearInterval(gameOverInterval);
                clearInterval(runningGameInterval);
                snake = [];
                score = 0;
                makeSnake(5);
                randomFood();
                pauseGame = true;
                runningGameInterval = setInterval(runningGame, snakeSpeed);
            }

                function moveSnake(dx, dy) {
                let headX = snake[0].x + dx;
                let headY = snake[0].y + dy;
                snake.unshift( {x: headX, y:headY} );
                snake.pop();
            }


            function touchDown(e) {
                console.log(e);
                if (e.offsetX > snake[0].x && (currentDirection === "up" || currentDirection === "down")) {touchDirection = 39};
                if (e.offsetY > snake[0].y && (currentDirection === "left" || currentDirection === "right")) {touchDirection = 40};
                if (e.offsetX < snake[0].x && (currentDirection === "up" || currentDirection === "down")) {touchDirection = 37};
                if (e.offsetY < snake[0].y && (currentDirection === "left" || currentDirection === "right")) {touchDirection = 38};


                if (touchDirection === 39 && pauseGame) return;
                
                if (directionFlag == true) return;
                
                if (touchDirection === 37 && currentDirection === "right" && (!pauseGame)) return;
                if (touchDirection === 38 && currentDirection === "down" && (!pauseGame)) return;
                if (touchDirection === 39 && currentDirection === "left" && (!pauseGame)) return;
                if (touchDirection === 40 && currentDirection === "up" && (!pauseGame)) return;
                if (pauseGame) pauseGame = false;

                directionFlag = true;
                
                switch(touchDirection) {
                    case 37:
                    case 65:
                        dy = 0;
                        dx = -10;
                        currentDirection = "left";
                        break;
                    case 38:
                    case 87:
                        dy = -10;
                        dx = 0;
                        currentDirection = "up";
                        break;
                    case 39:
                    case 68:
                        dy = 0;
                        dx = 10;
                        currentDirection = "right";
                        break;
                    case 40:
                    case 83:
                        dy = 10;
                        dx = 0;
                        currentDirection = "down";
                        break;
                }

            }


            function keyDown(e){
                if (e.keyCode === 39 && pauseGame) return;
                
                if (directionFlag == true) return;
                
                if (e.keyCode === 37 && currentDirection === "right" && (!pauseGame)) return;
                if (e.keyCode === 38 && currentDirection === "down" && (!pauseGame)) return;
                if (e.keyCode === 39 && currentDirection === "left" && (!pauseGame)) return;
                if (e.keyCode === 40 && currentDirection === "up" && (!pauseGame)) return;
                if (pauseGame) pauseGame = false;

                directionFlag = true;
                
                switch(e.keyCode) {
                    case 37:
                    case 65:
                        dy = 0;
                        dx = -10;
                        currentDirection = "left";
                        break;
                    case 38:
                    case 87:
                        dy = -10;
                        dx = 0;
                        currentDirection = "up";
                        break;
                    case 39:
                    case 68:
                        dy = 0;
                        dx = 10;
                        currentDirection = "right";
                        break;
                    case 40:
                    case 83:
                        dy = 10;
                        dx = 0;
                        currentDirection = "down";
                        break;
                }
                          
        
            }

            function virtualKeyDown(e){
                console.log(e.target.id)
                if (e.keyCode === 39 && pauseGame) return;
                
                if (directionFlag == true) return;
                
                if (e.target.id === "left-btn" && currentDirection === "right" && (!pauseGame)) return;
                if (e.target.id === "up-btn"  && currentDirection === "down" && (!pauseGame)) return;
                if (e.target.id === "right-btn"  && currentDirection === "left" && (!pauseGame)) return;
                if (e.target.id === "down-btn"  && currentDirection === "up" && (!pauseGame)) return;
                if (pauseGame) pauseGame = false;

                directionFlag = true;
                
                switch(e.target.id) {
                    case "left-btn":
                        dy = 0;
                        dx = -10;
                        currentDirection = "left";
                        break;
                    case "up-btn":
                        dy = -10;
                        dx = 0;
                        currentDirection = "up";
                        break;
                    case "right-btn":
                        dy = 0;
                        dx = 10;
                        currentDirection = "right";
                        break;
                    case "down-btn":
                        dy = 10;
                        dx = 0;
                        currentDirection = "down";
                        break;
                }
                          
        
            }

            function randomFood() {
                function randV(min, max) {
                    return Math.floor( (Math.random() * (max - min) + min)/ wallSize) * wallSize;
                }

                let colors = ["yellow", "blue", "green", "white"];
                food.color = colors[Math.floor(Math.random()*colors.length)];

                food.x = randV(20, canvas.width - 20)
                food.y = randV(20, canvas.height - 20)
            }


            function drawFood(){
                context2d.fillStyle = food.color;
                context2d.fillRect(food.x, food.y, wallSize, wallSize);
            }


            function checkWallsCollision() {
                snake.forEach(function(el){
                    if(el.x >= canvas.width-wallSize || el.x <= 0 ||el.y >= canvas.height-wallSize || el.y <= 0) gameOver(); //resetGame()
                });
            }

            function checkSelfCollision() {
                for (i = 1; i< snake.length; i++){
                    if(snake[0].x == snake[i].x && snake[0].y == snake[i].y) gameOver();
                };
            }

            function checkFoodCollision() {
                if(food.x == snake[0].x && food.y == snake[0].y) {
                    snake.push (Object.assign({}, snake[snake.length-1]) ) ;
                    randomFood();
                    score++;
                }
            }

            function drawPoints(){
                scoreTable.innerHTML = `Score: ${score}`;
            };

            function runningGame(){
                clearCanvas();
                directionFlag = false;
                checkWallsCollision()
                checkSelfCollision()
                checkFoodCollision()
                if(!pauseGame) moveSnake(dx, dy);
                drawPoints();
                drawFood();
                drawSnake();
            };



            lvl = (e) => {
                switch (e.target.id){
                        case "easy-btn":
                        snakeSpeed = 100;
                        level.forEach(element => {
                            element.classList.remove("choosen")});
                        level[0].classList.add("choosen");
                        break;
        
                    case "medium-btn":
                        snakeSpeed = 70;
                        level.forEach(element => {
                            element.classList.remove("choosen")});
                        level[1].classList.add("choosen");
                        break;
        
                    case "hard-btn":
                        snakeSpeed = 50;
                        level.forEach(element => {
                            element.classList.remove("choosen")});
                        level[2].classList.add("choosen");
                        break;
        
                    case "crazy-btn":
                        snakeSpeed = 25;
                        level.forEach(element => {
                            element.classList.remove("choosen")});
                        level[3].classList.add("choosen");
                        break;
        
                };
        
            }

            playGame = () => {
                resetGame();
                if (canvasWindow.classList.contains("hidden")){
                    menuWindow.classList.add("hidden");
                    canvasWindow.classList.remove("hidden");
                } else {
                    menuWindow.classList.remove("hidden");
                    canvasWindow.classList.add("hidden");
                };
            }


                        
            function startApp() {

                resetBtn = document.getElementById("reset-btn").addEventListener("click", resetGame);
                menuBtn = document.getElementById("menu-btn").addEventListener("click", playGame);
                scoreTable = document.getElementById("score");

                menuWindow = document.getElementById("menu");
                canvasWindow = document.getElementById("canvas-window");
                score = document.getElementById("score");
                playBtn = document.getElementById("play-btn").addEventListener("click", playGame);
                level = Array.from(document.getElementById("level").children);
                level.forEach(element => {
                element.addEventListener("click", lvl);
                });

                virtualControl = Array.from(document.querySelectorAll(".control-buttons button"));
                virtualControl.forEach(element => {
                    element.addEventListener("click", virtualKeyDown);
                    });

                

                canvas = document.getElementById("canvas");
                context2d = canvas.getContext("2d");
                document.addEventListener("keydown", keyDown)
                canvas.addEventListener("click", touchDown);
                resetGame();
            }