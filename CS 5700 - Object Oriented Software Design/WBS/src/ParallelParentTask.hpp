// Jonathan Petersen
// A01236750
// WBS Assignment
// Parallel Parent Task Header

#ifndef WBS_PARALLEL_PARENT_TASK_HPP
#define WBS_PARALLEL_PARENT_TASK_HPP

#include "ParentTask.hpp"

class ParallelParentTask : public ParentTask {
   public:
    inline ParallelParentTask(int id,
                              std::string label,
                              std::string description,
                              int hoursEstimate)
        : ParentTask(id, label, description, hoursEstimate) {}
    virtual ~ParallelParentTask() = default;
    virtual int getCurrentHoursEstimate();
    virtual int getHoursRemaining();
    virtual int getWorkDaysRemaining();
    virtual inline void accept(std::shared_ptr<TaskVisitor> visitor) {
        auto me = shared_from_this();
        visitor->visit(std::dynamic_pointer_cast<ParallelParentTask>(me));
    }
};

#endif
