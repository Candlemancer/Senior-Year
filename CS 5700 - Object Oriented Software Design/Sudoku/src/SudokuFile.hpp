// Jonathan Petersen
// A01236750
// Sudoku Solver Assignment
// Sudoku File Header

#ifndef SUDOKU_FILE_HPP
#define SUDOKU_FILE_HPP

#include <fstream>
#include <string>
#include <vector>

#include "SudokuPuzzle.hpp"

class SudokuFile {
   public:
    /** fromFile returns a SudokuPuzzle containing the first dimension x
     * dimension symbols in filename. It returns the file's get pointer to the
     * start of the array after use.
     */
    static SudokuPuzzle fromFile(std::string filename);

    /** toFile writes the provided SudokuPuzzle to the file "solved.txt". Any
     * previous contents of the file are overwritten.
     */
    static void toFile(SudokuPuzzle puzzle,
                       std::string filename = "solved.txt");
};

#endif
