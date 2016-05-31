// Jonathan Petersen
// A01236750
// WBS Assignment
// XML OUTPUT Visitor Implementation

#include "../api/catch.hpp"

#include "XMLOutputVisitor.hpp"
#include "LeafTask.hpp"
#include "SequentialParentTask.hpp"
#include "ParallelParentTask.hpp"
#include <string>

const static int INDENT_WIDTH = 2;

XMLOutputVisitor::XMLOutputVisitor(std::string filename)
    : fout(filename, std::fstream::out | std::fstream::trunc) {}

XMLOutputVisitor::~XMLOutputVisitor() {
    fout.close();
}

void XMLOutputVisitor::visit(std::shared_ptr<LeafTask> leaf) {
    fout << getIndent(leaf) << "<leaf>" << std::endl
         << getIndent(leaf) << "  "
         << printTag("ID", std::to_string(leaf->getID())) << std::endl
         << getIndent(leaf) << "  " << printTag("label", leaf->getLabel())
         << std::endl
         << getIndent(leaf) << "  "
         << printTag("description", leaf->getDescription()) << std::endl
         << getIndent(leaf) << "  "
         << printTag("originalHoursEstimate",
                     std::to_string(leaf->getOriginalHoursEstimate()))
         << std::endl
         << getIndent(leaf) << "  "
         << printTag("currentHoursEstimate",
                     std::to_string(leaf->getCurrentHoursEstimate()))
         << std::endl
         << getIndent(leaf) << "  "
         << printTag("percentComplete",
                     std::to_string(leaf->getPercentComplete()))
         << std::endl
         << getIndent(leaf) << "  "
         << printTag("hoursRemaining",
                     std::to_string(leaf->getHoursRemaining()))
         << std::endl
         << getIndent(leaf) << "  "
         << printTag("workDaysRemaining",
                     std::to_string(leaf->getWorkDaysRemaining()))
         << std::endl
         << getIndent(leaf) << "</leaf>" << std::endl;
}

void XMLOutputVisitor::visit(std::shared_ptr<SequentialParentTask> parent) {
    fout << getIndent(parent) << "<sequentialParent>" << std::endl
         << getIndent(parent) << "  "
         << printTag("ID", std::to_string(parent->getID())) << std::endl
         << getIndent(parent) << "  " << printTag("label", parent->getLabel())
         << std::endl
         << getIndent(parent) << "  "
         << printTag("description", parent->getDescription()) << std::endl
         << getIndent(parent) << "  "
         << printTag("originalHoursEstimate",
                     std::to_string(parent->getOriginalHoursEstimate()))
         << std::endl
         << getIndent(parent) << "  "
         << printTag("currentHoursEstimate",
                     std::to_string(parent->getCurrentHoursEstimate()))
         << std::endl
         << getIndent(parent) << "  "
         << printTag("percentComplete",
                     std::to_string(parent->getPercentComplete()))
         << std::endl
         << getIndent(parent) << "  "
         << printTag("hoursRemaining",
                     std::to_string(parent->getHoursRemaining()))
         << std::endl
         << getIndent(parent) << "  "
         << printTag("workDaysRemaining",
                     std::to_string(parent->getWorkDaysRemaining()))
         << std::endl
         << getIndent(parent) << "</sequentialParent>" << std::endl;
}

void XMLOutputVisitor::visit(std::shared_ptr<ParallelParentTask> parent) {
    fout << getIndent(parent) << "<parallelParent>" << std::endl
         << getIndent(parent) << "  "
         << printTag("ID", std::to_string(parent->getID())) << std::endl
         << getIndent(parent) << "  " << printTag("label", parent->getLabel())
         << std::endl
         << getIndent(parent) << "  "
         << printTag("description", parent->getDescription()) << std::endl
         << getIndent(parent) << "  "
         << printTag("originalHoursEstimate",
                     std::to_string(parent->getOriginalHoursEstimate()))
         << std::endl
         << getIndent(parent) << "  "
         << printTag("currentHoursEstimate",
                     std::to_string(parent->getCurrentHoursEstimate()))
         << std::endl
         << getIndent(parent) << "  "
         << printTag("percentComplete",
                     std::to_string(parent->getPercentComplete()))
         << std::endl
         << getIndent(parent) << "  "
         << printTag("hoursRemaining",
                     std::to_string(parent->getHoursRemaining()))
         << std::endl
         << getIndent(parent) << "  "
         << printTag("workDaysRemaining",
                     std::to_string(parent->getWorkDaysRemaining()))
         << std::endl
         << getIndent(parent) << "</parallelParent>" << std::endl;
}

std::string XMLOutputVisitor::getIndent(std::shared_ptr<Task> node) {
    std::string toReturn("");
    while (node->getParent().get() != nullptr) {
        toReturn.append("  ");
        node = node->getParent();
    }

    return toReturn;
}

std::string XMLOutputVisitor::printTag(std::string label, std::string value) {
    std::string toReturn("<");
    toReturn.append(label);
    toReturn.append(">");
    toReturn.append(value);
    toReturn.append("</");
    toReturn.append(label);
    toReturn.append(">");
    return toReturn;
}

TEST_CASE("Basic WBS to XML", "[Output]") {
    auto v =
        std::shared_ptr<XMLOutputVisitor>(new XMLOutputVisitor("output.xml"));
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

TEST_CASE("Leaf Task to XML", "[Output]") {
    auto l =
        std::shared_ptr<LeafTask>(new LeafTask(1, "Label", "Description", 8));
    auto v =
        std::shared_ptr<XMLOutputVisitor>(new XMLOutputVisitor("leaf.xml"));
    l->accept(v);
}
