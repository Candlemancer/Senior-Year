// Jonathan Petersen
// A01236750
// WBS Assignment
// Outline Visitor Implementation

#include "../api/catch.hpp"

#include "OutlineVisitor.hpp"
#include "LeafTask.hpp"
#include "SequentialParentTask.hpp"
#include "ParallelParentTask.hpp"
#include <string>

OutlineVisitor::OutlineVisitor(std::string filename)
    : fout(filename, std::fstream::out | std::fstream::trunc) {}

OutlineVisitor::~OutlineVisitor() {
    fout.close();
}

void OutlineVisitor::visit(std::shared_ptr<LeafTask> leaf) {
    fout << getPrefix(leaf) << leaf->getID() << ". " << leaf->getLabel()
         << " : " << leaf->getDescription() << std::endl;
}

void OutlineVisitor::visit(std::shared_ptr<SequentialParentTask> parent) {
    fout << getPrefix(parent) << parent->getID() << ". Sequential Section "
         << parent->getLabel() << " : " << parent->getDescription()
         << std::endl;
}

void OutlineVisitor::visit(std::shared_ptr<ParallelParentTask> parent) {
    fout << getPrefix(parent) << parent->getID() << ". Parallel Section "
         << parent->getLabel() << " : " << parent->getDescription()
         << std::endl;
}

std::string OutlineVisitor::getPrefix(std::shared_ptr<Task> node) {
    std::string toReturn("");
    node = node->getParent();
    while (node.get() != nullptr) {
        toReturn.insert(0, std::to_string(node->getID()) + ".");
        node = node->getParent();
    }

    return toReturn;
}

TEST_CASE("Output to Outline", "[Output]") {
    auto v = std::shared_ptr<OutlineVisitor>(new OutlineVisitor("output.txt"));
    auto l =
        std::make_shared<LeafTask>(LeafTask(0, "Label", "Description", 12));
    auto s = std::shared_ptr<SequentialParentTask>(new SequentialParentTask(
        0, "SequentialLabel", "SequentialDescription"));
    s->addTask(l);
    auto p = std::shared_ptr<ParallelParentTask>(
        new ParallelParentTask(1, "ParallelLabel", "ParallelDescription"));
    auto l2 = std::shared_ptr<LeafTask>(
        new LeafTask(1, "Label2", "Description2", 55));
    p->addTask(l2);
    s->addTask(p);

    for (auto&& i : *s) {
        i->accept(v);
    }
}
