// Jonathan Petersen
// A01236750
// Sudoku Solver Assignment
// Sudoku Puzzle Header

#ifndef SUDOKU_PUZZLE_HPP
#define SUDOKU_PUZZLE_HPP

#include <memory>
#include <string>
#include <vector>

using Matrix = std::vector<std::vector<char>>;

class SudokuPuzzle {
   public:
    // Constructors
    SudokuPuzzle();
    SudokuPuzzle(std::vector<char> symbolInput, Matrix puzzleInput);

    std::string toString() const;
    Matrix getPuzzle() const { return puzzle; }
    void setPuzzle(Matrix m) { puzzle = m; }
    std::vector<char> getRow(unsigned int rowIndex) const;
    std::vector<char> getColumn(unsigned int colIndex) const;
    std::vector<char> getZone(unsigned int zoneRowIndex,
                              unsigned int zoneColIndex) const;
    std::vector<char> const getSymbols() const { return symbols; }

    bool operator==(const SudokuPuzzle& rhs);
    bool operator!=(const SudokuPuzzle& rhs) { return !(*this == rhs); }

   private:
    std::vector<char> symbols;
    Matrix puzzle;
    int dimensions;
};

#endif
