// Jonathan Petersen
// A01236750
// Sudoku Solver Assignment
// Backtrack Solver Header

#ifndef BACKTRACK_SOLVER_HPP
#define BACKTRACK_SOLVER_HPP

#include "Solver.hpp"

class BacktrackSolver : public Solver {
   public:
    virtual SudokuPuzzle solve(SudokuPuzzle puzzle);

   private:
    bool rSolve(SudokuPuzzle&);
};

#endif
