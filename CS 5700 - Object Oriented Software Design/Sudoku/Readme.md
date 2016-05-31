Jonathan Petersen
A01236750

											Sudoku Solver

    This project is written in C++ and can be compiled with g++/gcc 4.9 or newer. It should also
compile with any other C++11 compliant compiler, though I know Visual Studio sometimes struggles 
with nullptr. To compile, open a command prompt in the /src directory and run

	g++ -std=c++11 *.cpp

and then launch the resulting a.out executable. 

	Usage is pretty simple, just follow the on screen instructions. Several of the unit tests fail,
though in particular the Backtrack (Unsolvable) test fails because it finds a solution to the 
provided "unsolvable" problem. The stochastic solvers take a bit of time to run, if you need to 
speed things up you can alter the MAX_ITER constant in StochasticSolver.cpp.

	I used the Template pattern in the Solver class, both checkForSolutions and runWithTimer follow
the Template pattern. SudokuFile is an Adapter class, though I'm not sure if that counts since there
aren't any other adapters being used. In a similar vein, Solver is almost a Facade to 
BacktrackSolver, but it only hides one function . . . 

	The solvers can both (theoretically) solve all solvable sudoku puzzles of any size, but both of 
them take a long time to verify that a sudoku puzzle is unsolvable. (And the stochastic solver 
often takes a long time to solve any puzzle, though it caps out at MAX_ITER iterations.)
