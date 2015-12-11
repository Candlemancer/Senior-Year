// Jonathan Petersen
// A01236750
// WBS Assignment
// Task Visitor Header File

#ifndef WBS_TASK_VISITOR_HPP
#define WBS_TASK_VISITOR_HPP

#include <memory>

class LeafTask;
class SequentialParentTask;
class ParallelParentTask;

class TaskVisitor {
   public:
    TaskVisitor() = default;
    virtual ~TaskVisitor() = default;
    virtual void visit(std::shared_ptr<LeafTask> leaf) = 0;
    virtual void visit(std::shared_ptr<SequentialParentTask> parent) = 0;
    virtual void visit(std::shared_ptr<ParallelParentTask> parent) = 0;
};

#endif
