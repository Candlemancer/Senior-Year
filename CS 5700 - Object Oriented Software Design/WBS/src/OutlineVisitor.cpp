// Jonathan Petersen
// A01236750
// WBS Assignment
// Outline Visitor Implementation

#include "OutlineVisitor.hpp"
#include "LeafTask.hpp"
#include "SequentialParentTask.hpp"
#include "ParallelParentTask.hpp"
#include <iostream>

void OutlineVisitor::visit(std::shared_ptr<LeafTask> leaf) {
    std::cout << leaf->getID() << ". " << leaf->getLabel() << " : "
              << leaf->getDescription() << std::endl;
}

void OutlineVisitor::visit(std::shared_ptr<SequentialParentTask> parent) {
    std::cout << "S:" << parent->getID() << std::endl;
}

void OutlineVisitor::visit(std::shared_ptr<ParallelParentTask> parent) {
    std::cout << "P:" << parent->getID() << std::endl;
}
