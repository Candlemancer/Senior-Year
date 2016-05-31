// Jonathan Petersen
// A01236750
// Sudoku Solver Assignment
// Solver Base Class

#ifndef SOLVER_HPP
#define SOLVER_HPP

#include "SudokuPuzzle.hpp"

class Solver {
   public:
    virtual ~Solver() = default;
    SudokuPuzzle checkForSolution(SudokuPuzzle puzzle);
    SudokuPuzzle solveWithTimer(SudokuPuzzle puzzle);
    virtual SudokuPuzzle solve(SudokuPuzzle puzzle) = 0;

   protected:
    bool findBlanks(SudokuPuzzle puzzle, unsigned int& row, unsigned int& col);
};

#endif
