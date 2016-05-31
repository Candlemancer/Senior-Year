// Jonathan Petersen
// A01236750
// Sudoku Solver Assignment
// Stochastic Solver Header

#ifndef STOCHASTIC_SOLVER_HPP
#define STOCHASTIC_SOLVER_HPP

#include "Solver.hpp"

class StochasticSolver : public Solver {
   public:
    virtual SudokuPuzzle solve(SudokuPuzzle puzzle);

   private:
    // void removeInvalidEntries(std::vector<std::vector<char>>& matrix);
};

#endif
