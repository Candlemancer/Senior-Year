// Jonathan Petersen
// A01236750
// WBS Assignment
// XML Output Visitor Header

#ifndef WBS_XML_OUTPUT_VISITOR_HPP
#define WBS_XML_OUTPUT_VISITOR_HPP

#include "TaskVisitor.hpp"
#include "Task.hpp"
#include <fstream>

class XMLOutputVisitor : public TaskVisitor {
   public:
    XMLOutputVisitor(std::string filename);
    virtual ~XMLOutputVisitor();
    virtual void visit(std::shared_ptr<LeafTask> leaf);
    virtual void visit(std::shared_ptr<SequentialParentTask> parent);
    virtual void visit(std::shared_ptr<ParallelParentTask> parent);

   private:
    const static int INDENT_WIDTH;
    std::string getIndent(std::shared_ptr<Task> node);
    std::string printTag(std::string label, std::string value);
    std::fstream fout;
};

#endif
