// Jonathan Petersen
// A01236750
// WBS Assignment
// Sequential Parent Task Header

#ifndef WBS_SEQUENTIAL_PARENT_TASK_HPP
#define WBS_SEQUENTIAL_PARENT_TASK_HPP

#include "ParentTask.hpp"

class SequentialParentTask : public ParentTask {
   public:
    inline

        SequentialParentTask(int id, std::string label, std::string description)
        : ParentTask(id, label, description) {}

    virtual ~SequentialParentTask() = default;
    virtual int getOriginalHoursEstimate();
    virtual int getCurrentHoursEstimate();
    virtual int getHoursRemaining();
    virtual int getWorkDaysRemaining();
    virtual inline void accept(std::shared_ptr<TaskVisitor> visitor) {
        auto me = shared_from_this();
        visitor->visit(std::dynamic_pointer_cast<SequentialParentTask>(me));
    }
};

#endif
