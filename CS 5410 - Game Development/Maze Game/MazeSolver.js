// Jonathan Petersen
// A01236750
// Maze Game Assignment
// Maze Solver

var MazeSolver = function(maze, current, goal) {

	var recursiveSolver = function(maze, current, goal) {
		var x = current.x;
		var y = current.y;

		var i = goal.x;
		var j = goal.y;

		// console.log("Solving from " + x + ", " + y);

		var orig = maze[x][y];
		maze[x][y] = SOLVER_TRAIL;

		if (x == i && y == j) {
			maze[x][y] = orig;
			return true;
		}

		if (maze[x - 1][y] != WALL_SQUARE &&
			maze[x - 1][y] != SOLVER_TRAIL ) { 
			if(recursiveSolver(maze, {x:current.x - 1, y:current.y}, goal)) {
				path.push({x:current.x - 1, y:current.y});
				maze[x][y] = orig;
				return true;
			} 
		}
		if (maze[x][y - 1] != WALL_SQUARE &&
			maze[x][y - 1] != SOLVER_TRAIL ) { 
			if(recursiveSolver(maze, {x:current.x, y:current.y - 1}, goal)) {
				path.push({x:current.x, y:current.y - 1});
				maze[x][y] = orig;
				return true;
			} 
		}
		if (maze[x + 1][y] != WALL_SQUARE &&
			maze[x + 1][y] != SOLVER_TRAIL ) { 
			if(recursiveSolver(maze, {x:current.x + 1, y:current.y}, goal)) {
				path.push({x:current.x + 1, y:current.y});
				maze[x][y] = orig;
				return true;
			} 
		}
		if (maze[x][y + 1] != WALL_SQUARE &&
			maze[x][y + 1] != SOLVER_TRAIL ) { 
			if(recursiveSolver(maze, {x:current.x, y:current.y + 1}, goal)) {
				path.push({x:current.x, y:current.y + 1});
				maze[x][y] = orig;
				return true;
			} 
		}

		maze[x][y] = orig;
		return false;
	}

	// console.log('Solving from ' + current.x + ', ' + current.y + ' to ' + goal.x + ', ' + goal.y);

	var path = [];
	recursiveSolver(maze, current, goal);
	return path;
}
