// Jonathan Petersen
// A01236750
// Sudoku Solver Assignment
// Backtrack Solver Implementation

#include "BacktrackSolver.hpp"

#include <algorithm>
#include <iostream>

SudokuPuzzle BacktrackSolver::solve(SudokuPuzzle puzzle) {
    // Base Case
    auto original = puzzle;

    if (rSolve(puzzle)) {
        return puzzle;
    }

    return original;
}

bool BacktrackSolver::rSolve(SudokuPuzzle& puzzle) {
    auto i = 0U;
    auto j = 0U;

    if (!this->findBlanks(puzzle, i, j)) {
        return true;
    }

    for (auto&& symbol : puzzle.getSymbols()) {
        auto row = puzzle.getRow(i);
        auto col = puzzle.getColumn(j);
        auto zone = puzzle.getZone(i, j);
        auto matrix = puzzle.getPuzzle();

        if (std::find(row.begin(), row.end(), symbol) == row.end() &&
            std::find(col.begin(), col.end(), symbol) == col.end() &&
            std::find(zone.begin(), zone.end(), symbol) == zone.end()) {
            matrix[i][j] = symbol;
            puzzle.setPuzzle(matrix);

            if (rSolve(puzzle)) {
                return true;
            }

            matrix[i][j] = '-';
            puzzle.setPuzzle(matrix);
        }
    }

    return false;
}
