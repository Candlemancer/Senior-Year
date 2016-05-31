// Jonathan Petersen
// A01236750
// Sudoku Solver Assignment
// Sudoku File Implementation

#include "SudokuFile.hpp"

#include <algorithm>
#include <stdexcept>

SudokuPuzzle SudokuFile::fromFile(std::string filename) {
    auto matrix = std::vector<std::vector<char>>();
    auto symbols = std::vector<char>();
    auto dimension = -1;

    // Open the File
    std::ifstream file(filename.c_str());
    if (!file.is_open()) {
        throw std::runtime_error("Could not open file");
    }

    // Read the dimensionality
    file >> dimension;
    if (dimension == -1) {
        file.close();
        throw std::runtime_error("File did not have dimension value!");
    }
    if (dimension != 4 && dimension != 9 && dimension != 16 &&
        dimension != 25) {
        file.close();
        throw std::runtime_error("Invalid dimension value!");
    }

    // Read the symbols
    for (int i = 0; i < dimension; ++i) {
        char c;
        file >> c;
        symbols.push_back(c);
    }

    // Fill out the vector
    for (int i = 0; i < dimension; ++i) {
        std::vector<char> line;
        for (int j = 0; j < dimension; ++j) {
            char element;
            file >> element;
            if (element == '-' ||
                std::find(symbols.begin(), symbols.end(), element) !=
                    symbols.end()) {
                line.push_back(element);
            } else {
                file.close();
                throw std::runtime_error("Invalid Symbol!");
            }
        }
        matrix.push_back(line);
    }

    file.close();
    return SudokuPuzzle(symbols, matrix);
}

void SudokuFile::toFile(SudokuPuzzle puzzle, std::string filename) {
    std::ofstream fout(filename, std::fstream::out | std::fstream::trunc);
    auto matrix = puzzle.getPuzzle();

    fout << matrix.size() << std::endl;

    for (auto&& symbol : puzzle.getSymbols()) {
        fout << symbol << " ";
    }
    fout << std::endl;

    for (auto&& row : matrix) {
        for (auto&& element : row) {
            fout << element << " ";
        }
        fout << std::endl;
    }

    return;
}
