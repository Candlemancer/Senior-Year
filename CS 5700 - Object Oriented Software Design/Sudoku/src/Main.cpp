// Jonathan Petersen
// A01236750
// Sudoku Solver Assignment
// Driver Code

#include <iostream>
#include <vector>
#include <stdexcept>

#include "SudokuFile.hpp"
#include "SudokuPuzzle.hpp"
#include "BacktrackSolver.hpp"
#include "StochasticSolver.hpp"

bool testToFileFromFile();
bool testSymbolGetter();
bool testBacktrackSolverSolvable();
bool testStochasticSolverSolvable();
bool testBacktrackSolverUnsolvable();
bool testStochasticSolverUnsolvable();
void prettyPrint(SudokuPuzzle);

int main() {
    std::string filename;
    int choice = -1;

    std::cout << "Welcome to Sudoku Solver!" << std::endl;
    std::cout << "Would you like to: " << std::endl;
    std::cout << "[1] Solve a Sudoku" << std::endl;
    std::cout << "[2] Run the unit tests" << std::endl;

    while (!(std::cin >> choice) || choice < 1 || choice > 2) {
        std::cin.clear();
        std::cin.ignore(10000, '\n');
        std::cerr << "Invalid choice, please try again." << std::endl;
    }

    if (choice == 1) {
        try {
            std::cout << "Enter the filename of a sudoku to solve: "
                      << std::endl;
            std::cin >> filename;

            auto sudoku = SudokuFile::fromFile(filename);

            std::cout << "Which solver would you like to use?" << std::endl;
            std::cout << "[1] Backtrack Solver" << std::endl;
            std::cout << "[2] Stochastic Solver" << std::endl;
            std::cout << "[3] Backtrack Solver with Timer" << std::endl;
            std::cout << "[4] Stochastic Solver with Timer" << std::endl;

            while (!(std::cin >> choice) || choice < 1 || choice > 4) {
                std::cin.clear();
                std::cin.ignore(10000, '\n');
                std::cerr << "Invalid choice, please try again." << std::endl;
            }

            Solver* p_solver = nullptr;
            SudokuPuzzle result;
            switch (choice) {
                case 1:
                    p_solver = new BacktrackSolver();
                    result = p_solver->checkForSolution(sudoku);
                    break;
                case 2:
                    p_solver = new StochasticSolver();
                    result = p_solver->checkForSolution(sudoku);
                    break;
                case 3:
                    p_solver = new BacktrackSolver();
                    result = p_solver->solveWithTimer(sudoku);
                    break;
                case 4:
                    p_solver = new StochasticSolver();
                    result = p_solver->solveWithTimer(sudoku);
                    break;
            }
            if (p_solver != nullptr) {
                delete p_solver;
            }

            if (result != sudoku) {
                std::cout << "Saving solution to \".\\output.txt\""
                          << std::endl;
                SudokuFile::toFile(result, "output.txt");
            }

        } catch (std::runtime_error e) {
            std::cerr << "Error Loading File! SudokuFile reports: " << e.what()
                      << std::endl;
        }
    } else {
        std::cout << "========================================" << std::endl;
        std::cout << " Running Unit Tests " << std::endl;
        std::cout << "========================================" << std::endl;

        std::cout << " Test 1 : File Import / Export ... \t\t\t";
        if (testToFileFromFile()) {
            std::cout << "PASS!" << std::endl;
        } else {
            std::cout << "FAIL!" << std::endl;
        }

        std::cout << " Test 2 : Symbol Getter ... \t\t\t\t";
        if (testSymbolGetter()) {
            std::cout << "PASS!" << std::endl;
        } else {
            std::cout << "FAIL!" << std::endl;
        }

        std::cout << " Test 3 : Backtrack Solver (Solvable) ... \t\t";
        if (testBacktrackSolverSolvable()) {
            std::cout << "PASS!" << std::endl;
        } else {
            std::cout << "FAIL!" << std::endl;
        }

        std::cout << " Test 4 : Stochastic Solver (Solvable) ... \t\t"
                  << std::flush;
        if (testStochasticSolverSolvable()) {
            std::cout << "PASS!" << std::endl;
        } else {
            std::cout << "FAIL!" << std::endl;
        }

        std::cout << " Test 5 : Backtrack Solver (Unsolvable) ... \t\t"
                  << std::flush;
        if (testBacktrackSolverUnsolvable()) {
            std::cout << "PASS!" << std::endl;
        } else {
            std::cout << "FAIL!" << std::endl;
        }

        std::cout << " Test 6 : Stochastic Solver (Unsolvable) ... \t\t"
                  << std::flush;
        if (testStochasticSolverUnsolvable()) {
            std::cout << "PASS!" << std::endl;
        } else {
            std::cout << "FAIL!" << std::endl;
        }

        std::cout << "========================================" << std::endl;
    }

    std::cout << "Thanks for using Sudoku Solver!" << std::endl;

    return 0;
}

bool testToFileFromFile() {
    const SudokuPuzzle testData({'1', '2', '3', '4'}, {{'4', '2', '3', '1'},
                                                       {'1', '3', '4', '2'},
                                                       {'3', '1', '2', '4'},
                                                       {'2', '4', '1', '3'}});
    const std::string filename = "test.txt";

    SudokuFile::toFile(testData, filename);
    auto result = SudokuFile::fromFile(filename);

    if (result == testData) {
        return true;
    }

    return false;
}

bool testSymbolGetter() {
    const std::vector<char> testSymbols = {'1', '2', '3', '4'};
    const SudokuPuzzle testData(testSymbols, {{'4', '2', '3', '1'},
                                              {'1', '3', '4', '2'},
                                              {'3', '1', '2', '4'},
                                              {'2', '4', '1', '3'}});

    auto result = testData.getSymbols();

    if (result == testSymbols) {
        return true;
    }

    return false;
}

bool testBacktrackSolverSolvable() {
    const SudokuPuzzle testUnsolvedData(
        {'1', '2', '3', '4', '5', '6', '7', '8', '9'},
        {{'-', '-', '-', '-', '-', '2', '1', '4', '-'},
         {'-', '-', '1', '-', '9', '-', '5', '3', '-'},
         {'-', '-', '3', '7', '-', '-', '-', '9', '-'},
         {'-', '-', '-', '6', '-', '-', '-', '1', '-'},
         {'5', '-', '-', '-', '-', '-', '-', '-', '4'},
         {'-', '9', '-', '-', '-', '4', '-', '-', '-'},
         {'-', '5', '-', '-', '-', '3', '6', '-', '-'},
         {'-', '6', '9', '-', '2', '-', '3', '-', '-'},
         {'-', '2', '8', '5', '-', '-', '-', '-', '-'}});
    const SudokuPuzzle testSolvedData(
        {'1', '2', '3', '4', '5', '6', '7', '8', '9'},
        {{'9', '7', '5', '3', '8', '2', '1', '4', '6'},
         {'2', '8', '1', '4', '9', '6', '5', '3', '7'},
         {'6', '4', '3', '7', '5', '1', '2', '9', '8'},
         {'8', '3', '4', '6', '7', '5', '9', '1', '2'},
         {'5', '1', '2', '9', '3', '8', '7', '6', '4'},
         {'7', '9', '6', '2', '1', '4', '8', '5', '3'},
         {'1', '5', '7', '8', '4', '3', '6', '2', '9'},
         {'4', '6', '9', '1', '2', '7', '3', '8', '5'},
         {'3', '2', '8', '5', '6', '9', '4', '7', '1'}});

    auto solver = BacktrackSolver();
    auto result = solver.checkForSolution(testUnsolvedData);

    if (result == testSolvedData) {
        return true;
    }

    return false;
}

bool testStochasticSolverSolvable() {
    const SudokuPuzzle testUnsolvedData(
        {'1', '2', '3', '4', '5', '6', '7', '8', '9'},
        {{'-', '-', '-', '-', '-', '2', '1', '4', '-'},
         {'-', '-', '1', '-', '9', '-', '5', '3', '-'},
         {'-', '-', '3', '7', '-', '-', '-', '9', '-'},
         {'-', '-', '-', '6', '-', '-', '-', '1', '-'},
         {'5', '-', '-', '-', '-', '-', '-', '-', '4'},
         {'-', '9', '-', '-', '-', '4', '-', '-', '-'},
         {'-', '5', '-', '-', '-', '3', '6', '-', '-'},
         {'-', '6', '9', '-', '2', '-', '3', '-', '-'},
         {'-', '2', '8', '5', '-', '-', '-', '-', '-'}});
    const SudokuPuzzle testSolvedData(
        {'1', '2', '3', '4', '5', '6', '7', '8', '9'},
        {{'9', '7', '5', '3', '8', '2', '1', '4', '6'},
         {'2', '8', '1', '4', '9', '6', '5', '3', '7'},
         {'6', '4', '3', '7', '5', '1', '2', '9', '8'},
         {'8', '3', '4', '6', '7', '5', '9', '1', '2'},
         {'5', '1', '2', '9', '3', '8', '7', '6', '4'},
         {'7', '9', '6', '2', '1', '4', '8', '5', '3'},
         {'1', '5', '7', '8', '4', '3', '6', '2', '9'},
         {'4', '6', '9', '1', '2', '7', '3', '8', '5'},
         {'3', '2', '8', '5', '6', '9', '4', '7', '1'}});

    auto solver = StochasticSolver();
    auto result = solver.checkForSolution(testUnsolvedData);

    if (result == testSolvedData) {
        return true;
    }

    return false;
}

bool testBacktrackSolverUnsolvable() {
    const SudokuPuzzle testUnsolveableData(
        {'1', '2', '3', '4', '5', '6', '7', '8', '9'},
        {{'-', '-', '-', '-', '-', '-', '-', '-', '-'},
         {'-', '-', '-', '-', '-', '-', '-', '-', '-'},
         {'-', '-', '-', '-', '-', '-', '-', '-', '-'},
         {'-', '-', '-', '-', '-', '-', '-', '-', '-'},
         {'-', '-', '-', '-', '-', '-', '-', '-', '-'},
         {'-', '-', '-', '-', '-', '-', '-', '-', '-'},
         {'-', '-', '-', '-', '-', '-', '-', '-', '-'},
         {'-', '-', '-', '-', '-', '-', '-', '-', '-'},
         {'-', '-', '-', '-', '-', '-', '-', '-', '-'}});

    auto solver = BacktrackSolver();
    auto result = solver.checkForSolution(testUnsolveableData);

    if (result == testUnsolveableData) {
        return true;
    }

    return false;
}

bool testStochasticSolverUnsolvable() {
    const SudokuPuzzle testUnsolveableData(
        {'1', '2', '3', '4', '5', '6', '7', '8', '9'},
        {{'-', '-', '-', '-', '-', '-', '-', '-', '-'},
         {'-', '-', '-', '-', '-', '-', '-', '-', '-'},
         {'-', '-', '-', '-', '-', '-', '-', '-', '-'},
         {'-', '-', '-', '-', '-', '-', '-', '-', '-'},
         {'-', '-', '-', '-', '-', '-', '-', '-', '-'},
         {'-', '-', '-', '-', '-', '-', '-', '-', '-'},
         {'-', '-', '-', '-', '-', '-', '-', '-', '-'},
         {'-', '-', '-', '-', '-', '-', '-', '-', '-'},
         {'-', '-', '-', '-', '-', '-', '-', '-', '-'}});

    auto solver = StochasticSolver();
    auto result = solver.checkForSolution(testUnsolveableData);

    if (result == testUnsolveableData) {
        return true;
    }

    return false;
}

void prettyPrint(SudokuPuzzle puzzle) {
    auto matrix = puzzle.getPuzzle();
    for (auto&& row : matrix) {
        std::cout << "| ";
        for (auto&& element : row) {
            std::cout << element << " ";
        }
        std::cout << "|" << std::endl;
    }
    std::cout << std::endl;
    return;
}
