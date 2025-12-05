import init, { World } from "snake_game";

init().then((_) => {
  const WORLD_WIDTH = 8;
  const snakeIndex = Date.now() % (WORLD_WIDTH * WORLD_WIDTH);

  const world = World.new(WORLD_WIDTH, snakeIndex);
  const canvas = <HTMLCanvasElement>document.getElementById("snake-canvas");
  const ctx = canvas.getContext("2d");

  const worldSize = world.width();
  const CELL_SIZE = 20;

  canvas.width = worldSize * CELL_SIZE;
  canvas.height = worldSize * CELL_SIZE;

  const drawWorld = () => {
    ctx.beginPath();

    for (let x = 0; x < worldSize + 1; x++) {
      ctx.moveTo(CELL_SIZE * x, 0);
      ctx.lineTo(CELL_SIZE * x, worldSize * CELL_SIZE);
    }

    for (let y = 0; y < worldSize + 1; y++) {
      ctx.moveTo(0, CELL_SIZE * y);
      ctx.lineTo(worldSize * CELL_SIZE, CELL_SIZE * y);
    }

    ctx.stroke();
  };

  const drawSnake = () => {
    const snakeIdx = world.snake_index_head();
    const col = snakeIdx % worldSize;
    const row = Math.floor(snakeIdx / worldSize);

    ctx.beginPath();

    ctx.fillRect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE);

    ctx.stroke();
  };

  const paint = () => {
    drawWorld();
    drawSnake();
  };

  const update = () => {
    const fps = 5;
    setTimeout(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      world.update();
      paint();
      requestAnimationFrame(update);
    }, 1000 / 5);
  };

  paint();
  update();
});
