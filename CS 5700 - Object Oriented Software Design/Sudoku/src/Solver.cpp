// Jonathan Petersen
// A01236750
// Sudoku Solver Assignment
// Solver Implementation

#include "Solver.hpp"

#include <chrono>
#include <iostream>

SudokuPuzzle Solver::checkForSolution(SudokuPuzzle puzzle) {
    auto result = this->solve(puzzle);

    if (puzzle == result) {
        std::cout << "Puzzle could not be solved!" << std::endl;
    }

    return result;
}

SudokuPuzzle Solver::solveWithTimer(SudokuPuzzle puzzle) {
    auto start = std::chrono::system_clock::now();
    auto result = this->checkForSolution(puzzle);
    auto stop = std::chrono::system_clock::now();

    std::cout << "Solved the Sudoku in "
              << std::chrono::duration_cast<std::chrono::milliseconds>(stop -
                                                                       start)
                     .count()
              << " milliseconds!" << std::endl;

    return result;
}

bool Solver::findBlanks(SudokuPuzzle puzzle,
                        unsigned int& row,
                        unsigned int& col) {
    auto matrix = puzzle.getPuzzle();

    for (row = 0U; row < matrix.size(); ++row) {
        for (col = 0U; col < matrix[0].size(); ++col) {
            if (matrix[row][col] == '-') {
                return true;
            }
        }
    }

    return false;
}
