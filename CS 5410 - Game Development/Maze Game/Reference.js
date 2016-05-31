// Jonathan Petersen
// A01236750
// Maze Game Assignment
// Reference Values

var UNKNOWN_SQUARE = -1;
var PATH_SQUARE = 0;
var WALL_SQUARE = 1;
var PLAYER_SQUARE = 2;
var FINISH_SQUARE = 3;
var PLAYER_TRAIL = 4;
var FINISH_TRAIL = 5;
var SOLVER_TRAIL = 6;

var MAZE_WIDTH = 5;
var MAZE_HEIGHT = 5;

function changeMazeSize(option) {
	MAZE_WIDTH = parseInt(option.value);
	MAZE_HEIGHT = MAZE_WIDTH;
	option.blur();
}

