import init, { World } from "snake_game";

init().then((_) => {
  console.log(World.new().width);
});
