// Jonathan Petersen
// A01236750
// WBS Assignment
// Outline Visitor Header

#ifndef WBS_OUTLINE_VISITOR_HPP
#define WBS_OUTLINE_VISITOR_HPP

#include "TaskVisitor.hpp"

class OutlineVisitor : public TaskVisitor {
   public:
    OutlineVisitor() = default;
    virtual ~OutlineVisitor() = default;
    virtual void visit(std::shared_ptr<LeafTask> leaf);
    virtual void visit(std::shared_ptr<SequentialParentTask> parent);
    virtual void visit(std::shared_ptr<ParallelParentTask> parent);
};

#endif
