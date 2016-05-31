// Jonathan Petersen
// A01236750
// Sudoku Solver Assignment
// Stochastic Solver Implementation

#include "StochasticSolver.hpp"
#include <algorithm>
#include <iostream>

SudokuPuzzle StochasticSolver::solve(SudokuPuzzle puzzle) {
    auto original = puzzle.getPuzzle();
    auto symbols = puzzle.getSymbols();
    auto matrix = puzzle.getPuzzle();
    auto finished = false;
    auto numIterations = 0;
    auto const MAX_ITER = 10000;

    while (finished != true && numIterations++ < MAX_ITER) {
        // Randomly assign values to empty spaces
        for (auto i = 0U; i < matrix.size(); ++i) {
            for (auto j = 0U; j < matrix[0].size(); ++j) {
                if (matrix[i][j] == '-') {
                    std::random_shuffle(symbols.begin(), symbols.end());
                    matrix[i][j] = *symbols.begin();
                }
            }
        }
        finished = true;

        // Check for Invalid Placements
        for (auto i = 0U; i < matrix.size(); ++i) {
            for (auto j = 0U; j < matrix[0].size(); ++j) {
                puzzle.setPuzzle(matrix);
                auto row = puzzle.getRow(i);
                auto col = puzzle.getColumn(j);
                auto zone = puzzle.getZone(i, j);

                if (matrix[i][j] != original[i][j] &&
                    (std::count(row.begin(), row.end(), matrix[i][j]) > 1 ||
                     std::count(col.begin(), col.end(), matrix[i][j]) > 1 ||
                     std::count(zone.begin(), zone.end(), matrix[i][j] > 1))) {
                    matrix[i][j] = '-';
                    finished = false;
                }
            }
        }

        if (numIterations > MAX_ITER) {
            return SudokuPuzzle(symbols, original);
        }
        if (numIterations % 1000 == 0) {
            matrix = original;
        }
    }

    return puzzle;
}
