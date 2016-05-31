// Jonathan Petersen
// A01236750
// Maze Game Assignment
// Primary Game Loop

var highScores = [];

var MazeGame = function() {
	var timeDisplay = document.getElementById('playerTime');
	var scoreDisplay = document.getElementById('playerScore');
	var canvas = document.getElementById('gameCanvas');
	var context = canvas.getContext('2d');
	context.imageSmoothingEnabled = false;

	var maze = [];
	var startPos = {x:1, y:1};
	var playerPos = {};
	var goalPos = {};
	var goalPath = [];
	var score = 0;
	var startTime = undefined;

	var displayBreadcrumbs = true;
	var displayPath = false;
	var displayHint = false;
	var displayScore = true;

	function gatherInput(keyEvent) {

		// console.log('Getting Input!');

		switch(keyEvent.keyCode) {
			case 74: // J
			case 65: // A
			case 37: // Left Arrow
				if (maze[playerPos.x - 1][playerPos.y] != WALL_SQUARE) {
					playerPos.x--;
				}
				// Screen Wrapping
				// if (playerPos.x < 0 &&) {
					// playerPos.x = maze[0].length - 1;
				// }
				keyEvent.preventDefault();
				break;
			case 73: // I
			case 87: // W
			case 38: // Up Arrow	
				if (maze[playerPos.x][playerPos.y - 1] != WALL_SQUARE) {
					playerPos.y--;
				}
				// if (playerPos.y < 0) {
				// 	playerPos.y = maze.length - 1;
				// }
				keyEvent.preventDefault();
				break;
			case 76: // L
			case 68: // D
			case 39: // Right Arrow	
				if (maze[playerPos.x + 1][playerPos.y] != WALL_SQUARE) {
					playerPos.x++;
				}
				// if (playerPos.x > maze[0].length - 1) {
				// 	playerPos.x = 0;
				// }
				keyEvent.preventDefault();
				break;
			case 75: // K
			case 83: // S
			case 40: // Down Arrow	
				if (maze[playerPos.x][playerPos.y + 1] != WALL_SQUARE) {
					playerPos.y++;
				}
				if (playerPos.y > maze.length - 1) {
					playerPos.y	 = 0;
				}
				keyEvent.preventDefault();
				break;
			case 66: // B
				displayBreadcrumbs = !displayBreadcrumbs;
				keyEvent.preventDefault();
				break;	
			case 80: // P
				displayPath = !displayPath;
				keyEvent.preventDefault();
				break;
			case 72: // H
				displayHint = !displayHint;
				keyEvent.preventDefault();
				break;
			case 89: // Y
				displayScore = !displayScore;
				keyEvent.preventDefault();
				break;
		}
	}

	function resetMaze() {
		maze = MazeFactory();

		playerPos = {x:startPos.x, y:startPos.y};
		goalPos = {x: maze[0].length - 2, y: maze.length - 2};
		startTime = undefined;
		playerTime.innerHTML = '00:00:000';
		score = 5000;

		return;
	}

	function update(currentTime) {
		// Timer
		if (startTime === undefined &&
		   (playerPos.x != startPos.x ||
			playerPos.y != startPos.y)) {
			startTime = performance.now();
		}
		if (startTime !== undefined) {
			var elapsedTime = currentTime - startTime;

			// var milliseconds = Math.floor(elapsedTime);
			var seconds = Math.floor(elapsedTime / 1000 % 60);
			if (seconds < 10 && seconds >= 0) {
				seconds = '0' + seconds;
			}
			else {
				seconds += '';
			}

			var minutes = Math.floor(elapsedTime / 1000 / 60) + '';
			if (minutes < 10 && minutes >= 0) {
				minutes = '0' + minutes;
			}
			else {
				minutes += '';
			}

			var milliseconds = Math.floor(elapsedTime % 1000).toFixed(0) + '';

			timeDisplay.innerHTML = minutes + ':' + seconds + ':' + milliseconds;
			score -= 1;
		}

		// Change of Maze Size
		if (maze.length != MAZE_HEIGHT * 2 + 1) {
			resetMaze();
		}

		// Breadcrumbs
		maze[playerPos.x][playerPos.y] = PLAYER_TRAIL;		

		// Cheats
		if (displayPath || displayHint) {
			goalPath = MazeSolver(maze, goalPos, playerPos);
		}

		// Win Condidtion
		if (playerPos.x == goalPos.x && playerPos.y == goalPos.y) {

			// Completion Scoring
			goalPath = MazeSolver(maze, goalPos, startPos);

			for (var i = 0; i < maze[0].length; ++i) {
				for (var j = 0; j < maze.length; ++j) {
					if (maze[i][j] == PLAYER_TRAIL) {
						score -= 200;
					}
					for (var k = 0; k < goalPath.length; ++k) {
						if (i == goalPath[k].x &&
							j == goalPath[k].y) {
							score += 200
						}
					}					
				}
			}
			highScores.push(score);
			document.getElementById('playerHighScores').innerHTML += (score + '<br>');
			resetMaze();
		}
	}

	function render() {
		var unitWidth = (canvas.width / (maze[0].length));
		var unitHeight = (canvas.height / (maze.length));

		context.clearRect(0, 0, canvas.width, canvas.height);

		for (var i = 0; i < maze[0].length; ++i) {
			for (var j = 0; j < maze.length; ++j) {
				context.fillStyle = 'white';
				if (maze[i][j] == WALL_SQUARE) {
					context.fillStyle = 'black';
				}
				// if (maze[i][j] == -1) {
				// 	context.fillStyle = 'red';
				// }
				if (maze[i][j] == PLAYER_TRAIL && displayBreadcrumbs) {
					context.fillStyle = '#00B4FF';
				}

				if (displayPath) {
					for (var k = 0; k < goalPath.length; ++k) {
						if (i == goalPath[k].x &&
							j == goalPath[k].y) {
								context.fillStyle = '#C3FF68';		
						}
					}					
				}
				else if (displayHint && goalPath.length > 1) {
					if (i == goalPath[1].x && j == goalPath[1].y) {
						context.fillStyle = '#C3FF68';
					}
				}


				if (maze[i][j] == SOLVER_TRAIL) {
					context.fillStyle = 'red';
				}

				context.fillRect(i * unitWidth, 
								 j * unitHeight, 
								 unitWidth + 0.5, 
								 unitHeight + 0.5);
			}
		}

		scoreDisplay.innerHTML = score;

		if (displayScore) {
			document.getElementById('scorePanel').style.visibility = "visible";
		}
		else {
			document.getElementById('scorePanel').style.visibility = "hidden";
		}


		context.fillStyle = 'green';
		context.fillRect(goalPos.x * unitWidth, goalPos.y * unitHeight, unitWidth, unitHeight);
		context.fillStyle = 'blue';
		context.fillRect(playerPos.x * unitWidth, playerPos.y * unitHeight, unitWidth, unitHeight);
	}

	function gameLoop(currentTime) {

		update(currentTime);
		render();

		requestAnimationFrame(gameLoop);
	}

	resetMaze();
	// console.log('Adding Listener');
	document.addEventListener('keydown', gatherInput);
	requestAnimationFrame(gameLoop);
};
