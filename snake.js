window.onload = () => {
    startApp();
};

const gameState = {
    runningGameInterval: null,
    gameOverInterval: null,
    pauseGame: true,
    currentDirectionCode: "ArrowLeft",
    directionFlag: false,
    dx: 0,
    dy: 0,
    score: 0,
    snakeSpeed: 70,
    scoreTable: "",
};

const gameComponents = {
    canvas: null,
    context2d: null,
    wallSize: null,
    snake: [],
    food: { x: 0, y: 0, color: "white" },
};

const getRandomInt = (max) => Math.floor(Math.random() * max);

const drawRectRandomColor = (x, y, width, height) => {
    gameComponents.context2d.fillStyle = `rgb(${getRandomInt(
        255
    )}, ${getRandomInt(255)}, ${getRandomInt(255)})`;
    gameComponents.context2d.fillRect(x, y, width, height);
};

const clearCanvas = () => {
    gameComponents.context2d.fillStyle = "black";
    gameComponents.context2d.fillRect(
        0,
        0,
        gameComponents.canvas.width,
        gameComponents.canvas.height
    );
};

const makeSnake = (snakeLength) => {
    for (let i = 0; i < snakeLength; i++) {
        let x = gameComponents.canvas.width / 2 + i * gameComponents.wallSize;
        let y = gameComponents.canvas.height / 2;
        gameComponents.snake.push({ x, y });
    }
};

const drawSnake = () => {
    gameComponents.context2d.strokeStyle = "green";
    gameComponents.context2d.lineWidth = 5;
    gameComponents.context2d.lineJoin = "bevel";
    gameComponents.snake.forEach((el) => {
        gameComponents.context2d.strokeRect(
            el.x,
            el.y,
            gameComponents.wallSize,
            gameComponents.wallSize
        );
    });
};

const animateGameOver = () => {
    let isVisible = false;

    const toggleSnakeVisibility = () => {
        gameComponents.snake.forEach((el) => {
            gameComponents.context2d.strokeStyle = isVisible
                ? "green"
                : "black";
            gameComponents.context2d.lineWidth = 5;
            gameComponents.context2d.lineJoin = "bevel";
            gameComponents.context2d.strokeRect(
                el.x,
                el.y,
                gameComponents.wallSize,
                gameComponents.wallSize
            );
        });
        isVisible = !isVisible;
    };

    toggleSnakeVisibility(); // Start the initial toggle

    gameState.gameOverInterval = setInterval(toggleSnakeVisibility, 500); // Toggle visibility every 500ms
};

const gameOver = () => {
    clearInterval(gameState.gameOverInterval);
    clearInterval(gameState.runningGameInterval);
    const wordPosition = gameComponents.canvas.width / 2;

    gameComponents.context2d.font = `${wordPosition / 6}px GIll`;
    gameComponents.context2d.fillStyle = "white";
    gameComponents.context2d.fillText(
        "GAME OVER",
        wordPosition * 0.5,
        wordPosition
    );

    animateGameOver(); // Start the animation
};

const resetGame = () => {
    clearInterval(gameState.gameOverInterval);
    clearInterval(gameState.runningGameInterval);
    gameComponents.snake = [];
    gameState.score = 0;
    gameState.scoreTable.innerHTML = `Score: ${gameState.score}`;
    makeSnake(5);
    randomFood();
    gameState.pauseGame = true;
    gameState.runningGameInterval = setInterval(
        runningGame,
        gameState.snakeSpeed
    );
};

const moveSnake = (dx, dy) => {
    let headX = gameComponents.snake[0].x + dx;
    let headY = gameComponents.snake[0].y + dy;
    gameComponents.snake.unshift({ x: headX, y: headY });
    gameComponents.snake.pop();
};

const randomFood = () => {
    const randomNumber = (min, max) =>
        Math.floor(
            (Math.random() * (max - min) + min) / gameComponents.wallSize
        ) * gameComponents.wallSize;

    const colors = [
        "yellow",
        "blue",
        "green",
        "white",
        "red",
        "purple",
        "orange",
        "pink",
        "brown",
        "gray",
        "teal",
        "maroon",
        "navy",
        "lavender",
        "gold",
    ];
    gameComponents.food.color =
        colors[Math.floor(Math.random() * colors.length)];

    gameComponents.food.x = randomNumber(
        gameComponents.wallSize * 2,
        gameComponents.canvas.width - gameComponents.wallSize * 2
    );
    gameComponents.food.y = randomNumber(
        gameComponents.wallSize * 2,
        gameComponents.canvas.height - gameComponents.wallSize * 2
    );
};

const drawFood = () => {
    gameComponents.context2d.fillStyle = gameComponents.food.color;
    gameComponents.context2d.fillRect(
        gameComponents.food.x,
        gameComponents.food.y,
        gameComponents.wallSize,
        gameComponents.wallSize
    );
};

const checkWallsCollision = () => {
    gameComponents.snake.forEach((el) => {
        if (
            el.x >= gameComponents.canvas.width - gameComponents.wallSize / 2 ||
            el.x <= -gameComponents.wallSize / 2 ||
            el.y >=
                gameComponents.canvas.height - gameComponents.wallSize / 2 ||
            el.y <= -gameComponents.wallSize / 2
        )
            gameOver(); //resetGame()
    });
};

const checkSelfCollision = () => {
    for (let i = 1; i < gameComponents.snake.length; i++) {
        if (
            gameComponents.snake[0].x === gameComponents.snake[i].x &&
            gameComponents.snake[0].y === gameComponents.snake[i].y
        )
            gameOver();
    }
};

const checkFoodCollision = () => {
    const headX = gameComponents.snake[0].x;
    const headY = gameComponents.snake[0].y;

    const foodCollision =
        headX >= gameComponents.food.x - gameComponents.wallSize / 2 &&
        headX < gameComponents.food.x + gameComponents.wallSize / 2 &&
        headY >= gameComponents.food.y - gameComponents.wallSize / 2 &&
        headY < gameComponents.food.y + gameComponents.wallSize / 2;

    if (foodCollision) {
        gameComponents.snake.push({
            ...gameComponents.snake[gameComponents.snake.length - 1],
        });
        randomFood();
        gameState.score++;
        gameState.scoreTable.innerHTML = `Score: ${gameState.score}`;
    }
};

const runningGame = () => {
    clearCanvas();
    gameState.directionFlag = false;
    checkWallsCollision();
    checkSelfCollision();
    checkFoodCollision();
    if (!gameState.pauseGame) moveSnake(gameState.dx, gameState.dy);
    drawFood();
    drawSnake();
};

levelSwitch = (e) => {
    if (e.target && e.target.classList.contains("menu__button--level")) {
        const levelButtons = levelBtns.getElementsByClassName(
            "menu__button--level"
        );
        for (const button of levelButtons) {
            button.classList.remove("choosen");
        }

        e.target.classList.add("choosen");

        switch (e.target.id) {
            case "easy-btn":
                gameState.snakeSpeed = 120;
                break;
            case "medium-btn":
                gameState.snakeSpeed = 90;
                break;
            case "hard-btn":
                gameState.snakeSpeed = 70;
                break;
        }
    }
};

toggleMenu = () => {
    const menuWindow = document.getElementById("menu");
    const gameWindow = document.getElementById("game-window");
    menuWindow.classList.toggle("hidden");
    gameWindow.classList.toggle("hidden");
};

const switchDirection = (direction) => {
    gameState.currentDirectionCode = direction;
    switch (direction) {
        case "ArrowLeft":
            gameState.dy = 0;
            gameState.dx = -gameComponents.wallSize;
            break;
        case "ArrowUp":
            gameState.dy = -gameComponents.wallSize;
            gameState.dx = 0;
            break;
        case "ArrowRight":
            gameState.dy = 0;
            gameState.dx = gameComponents.wallSize;
            break;
        case "ArrowDown":
            gameState.dy = gameComponents.wallSize;
            gameState.dx = 0;
            break;
    }
};

const touchDown = (e) => {
    let direction;
    const offsetX = e.offsetX;
    const offsetY = e.offsetY;
    const horizontalDirection =
        gameState.currentDirectionCode === "ArrowUp" ||
        gameState.currentDirectionCode === "ArrowDown";
    const verticalDirection =
        gameState.currentDirectionCode === "ArrowLeft" ||
        gameState.currentDirectionCode === "ArrowRight";
    if (offsetX > gameComponents.snake[0].x && horizontalDirection) {
        direction = "ArrowRight";
    }
    if (offsetY > gameComponents.snake[0].y && verticalDirection) {
        direction = "ArrowDown";
    }
    if (offsetX < gameComponents.snake[0].x && horizontalDirection) {
        direction = "ArrowLeft";
    }
    if (offsetY < gameComponents.snake[0].y && verticalDirection) {
        direction = "ArrowUp";
    }
    handleDirectionChange(direction);
};

const handleDirectionChange = (direction) => {
    const validKeys = ["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown"];
    if (!validKeys.includes(direction)) return;

    const oppositeDirections = {
        ArrowLeft: "ArrowRight",
        ArrowUp: "ArrowDown",
        ArrowRight: "ArrowLeft",
        ArrowDown: "ArrowUp",
    };

    if (gameState.pauseGame && direction === "ArrowRight") return;
    if (gameState.directionFlag) return;
    if (gameState.currentDirectionCode === oppositeDirections[direction])
        return;

    if (gameState.pauseGame) gameState.pauseGame = false;
    gameState.directionFlag = true;
    switchDirection(direction);
};

const setArrowsControl = () => {
    const arrows = document.querySelector(".control-buttons");
    const arrowsBtn = document.querySelector("#arrows-btn");
    arrows.classList.toggle("hidden");
    arrowsBtn.classList.toggle("choosen");
    if (!arrows.classList.contains("hidden")) {
        gameComponents.canvas.width = Math.floor(
            Math.floor(
                Math.min(window.innerWidth * 0.8, window.innerHeight * 0.5)
            )
        );
    } else {
        gameComponents.canvas.width = Math.floor(
            innerHeight > innerWidth ? innerWidth * 0.8 : innerHeight * 0.8
        );
    }
    gameComponents.canvas.height = gameComponents.canvas.width;
    gameComponents.wallSize = gameComponents.canvas.width / 40;

    resetGame();
};

const resizeCanvas = () => {
    const canvasWidth = Math.min(
        window.innerWidth * 0.8,
        window.innerHeight * 0.8
    );
    gameComponents.canvas.width = canvasWidth;
    gameComponents.canvas.height = canvasWidth;
    gameComponents.wallSize = canvasWidth / 40;
    resetGame();
};

const startApp = () => {
    document.getElementById("reset-btn").addEventListener("click", resetGame);
    document.getElementById("menu-btn").addEventListener("click", toggleMenu);
    document.getElementById("play-btn").addEventListener("click", toggleMenu);
    document
        .querySelector("#arrows-btn")
        .addEventListener("click", setArrowsControl);
    document.getElementById("level").addEventListener("click", levelSwitch);
    document.addEventListener("keydown", (e) => {
        handleDirectionChange(e.key);
    });
    const virtualKeys = Array.from(
        document.querySelectorAll(".control-buttons button")
    );
    virtualKeys.forEach((element) => {
        element.addEventListener("click", (e) => {
            handleDirectionChange(e.target.id);
        });
    });
    gameState.scoreTable = document.getElementById("score");
    gameComponents.canvas = document.getElementById("canvas");
    if (!gameComponents.canvas) {
        window.alert("Canvas element not found.");
        return;
    }
    gameComponents.context2d = gameComponents.canvas.getContext("2d");
    gameComponents.canvas.addEventListener("click", (e) => {
        touchDown(e);
    });
    resizeCanvas();
};

window.addEventListener("resize", resizeCanvas);
