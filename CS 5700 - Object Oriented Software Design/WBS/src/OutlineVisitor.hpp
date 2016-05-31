// Jonathan Petersen
// A01236750
// WBS Assignment
// Outline Visitor Header

#ifndef WBS_OUTLINE_VISITOR_HPP
#define WBS_OUTLINE_VISITOR_HPP

#include "TaskVisitor.hpp"
#include "Task.hpp"
#include <fstream>

class OutlineVisitor : public TaskVisitor {
   public:
    OutlineVisitor(std::string filename);
    virtual ~OutlineVisitor();
    virtual void visit(std::shared_ptr<LeafTask> leaf);
    virtual void visit(std::shared_ptr<SequentialParentTask> parent);
    virtual void visit(std::shared_ptr<ParallelParentTask> parent);

   private:
    std::string getPrefix(std::shared_ptr<Task> node);
    std::fstream fout;
};

#endif
