// Jonathan Petersen
// A01236750
// Maze Game Assignment
// Maze Factory

var MazeFactory = function() {
	var maze = [];

	for (var i = 0; i < MAZE_HEIGHT * 2 + 1; ++i) {
		var tempRow = [];
		for (var j = 0; j < MAZE_WIDTH * 2 + 1; ++j) {
			if (i % 2 == 0 || j % 2 == 0) {
				tempRow.push(WALL_SQUARE);
			} else {
				tempRow.push(UNKNOWN_SQUARE);
			}
		}
		maze.push(tempRow);
	}

	var wallQueue = [];

	function addWallsToQueue(x, y) {

		if (x > 1 && maze[x - 1][y] == WALL_SQUARE) {
			wallQueue.push({
				x: x - 1,
				y: y
			});
		}

		if (y > 1 && maze[x][y - 1] == WALL_SQUARE) {
			wallQueue.push({
				x: x,
				y: y - 1
			});
		}

		if (x < maze[0].length - 2 && maze[x + 1][y] == WALL_SQUARE) {
			wallQueue.push({
				x: x + 1,
				y: y
			});
		}

		if (y < maze.length - 2 && maze[x][y + 1] == WALL_SQUARE) {
			wallQueue.push({
				x: x,
				y: y + 1
			})
		}

		return;
	}

	// Prim's Algorithm
	maze[1][1] = PATH_SQUARE;
	addWallsToQueue(1, 1);

	while (!(wallQueue.length == 0)) {
		var randIndex = Math.floor(Math.random() * wallQueue.length);
		var u = wallQueue.splice(randIndex, 1).pop();

		// console.log("Checking wall at (" + u.x + ", " + u.y + ")");

		if (u.x > 1 && maze[u.x - 1][u.y] == UNKNOWN_SQUARE) {
			maze[u.x][u.y] = PATH_SQUARE;
			maze[u.x - 1][u.y] = PATH_SQUARE;
			addWallsToQueue(u.x - 1, u.y);
		}
		if (u.y > 1 && maze[u.x][u.y - 1] == UNKNOWN_SQUARE) {
			maze[u.x][u.y] = PATH_SQUARE;
			maze[u.x][u.y - 1] = PATH_SQUARE;
			addWallsToQueue(u.x, u.y - 1);
		}
		if (u.x < maze[0].length - 2 && maze[u.x + 1][u.y] == UNKNOWN_SQUARE) {
			maze[u.x][u.y] = PATH_SQUARE;
			maze[u.x + 1][u.y] = PATH_SQUARE;
			addWallsToQueue(u.x + 1, u.y);
		}
		if (u.y < maze.length - 2 && maze[u.x][u.y + 1] == UNKNOWN_SQUARE) {
			maze[u.x][u.y] = PATH_SQUARE;
			maze[u.x][u.y + 1] = PATH_SQUARE;
			addWallsToQueue(u.x, u.y + 1);
		}
	}

	return maze;
};
