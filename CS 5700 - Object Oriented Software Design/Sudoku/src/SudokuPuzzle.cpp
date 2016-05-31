// Jonathan Petersen
// A01236750
// Sudoku Solver Assignment
// Sudoku Puzzle Implementation

#include "SudokuPuzzle.hpp"

#include <sstream>
#include <ctgmath>

SudokuPuzzle::SudokuPuzzle() : symbols(), puzzle(), dimensions(-1) {}

SudokuPuzzle::SudokuPuzzle(std::vector<char> symbolInput, Matrix puzzleInput)
    : symbols(symbolInput),
      puzzle(puzzleInput),
      dimensions(puzzleInput.size()) {}

std::string SudokuPuzzle::toString() const {
    std::ostringstream ss;

    for (auto&& row : getPuzzle()) {
        for (auto&& element : row) {
            ss << element << " ";
        }
        ss << std::endl;
    }

    return ss.str();
}

std::vector<char> SudokuPuzzle::getRow(unsigned int rowIndex) const {
    return puzzle[rowIndex];
}

std::vector<char> SudokuPuzzle::getColumn(unsigned int colIndex) const {
    std::vector<char> v;
    for (auto i = 0U; i < puzzle.size(); ++i) {
        v.push_back(puzzle[i][colIndex]);
    }
    return v;
}

std::vector<char> SudokuPuzzle::getZone(unsigned int rowIndex,
                                        unsigned int colIndex) const {
    auto zoneDim = sqrt(puzzle.size());
    auto zoneRowIndex = floor(rowIndex / zoneDim);
    auto zoneColIndex = floor(colIndex / zoneDim);
    std::vector<char> v;

    for (int row = 0; row < zoneDim; ++row) {
        for (int col = 0; col < zoneDim; ++col) {
            v.push_back(puzzle[zoneRowIndex * zoneDim +
                               row][zoneColIndex * zoneDim + col]);
        }
    }

    return v;
}

bool SudokuPuzzle::operator==(const SudokuPuzzle& rhs) {
    if (this->getPuzzle() == rhs.getPuzzle() &&
        this->getSymbols() == rhs.getSymbols()) {
        return true;
    }

    return false;
}
