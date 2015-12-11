// Jonathan Petersen
// A01236750
// WBS Assignment
// Leaf Task Header

#ifndef WBS_LEAF_TASK_HPP
#define WBS_LEAF_TASK_HPP

#include "Task.hpp"

class LeafTask : public virtual Task {
   public:
    LeafTask(int id,
             std::string label,
             std::string description,
             int hoursEstimate)
        : Task(id, label, description, hoursEstimate) {}
    virtual ~LeafTask() = default;

    virtual inline int getCurrentHoursEstimate() {
        return m_currentHoursEstimate.count();
    }
    virtual inline double getPercentComplete() { return m_percentComplete; }
    virtual inline int getHoursRemaining() { return m_remainingHours.count(); }
    virtual inline int getWorkDaysRemaining() { return m_remainingDays; }
    virtual inline void accept(std::shared_ptr<TaskVisitor> visitor) {
        auto me = shared_from_this();
        visitor->visit(std::dynamic_pointer_cast<LeafTask>(me));
    }

    void setCurrentHoursEstimate(int hoursEstimate);
    void setPercentComplete(double percentComplete);
};

#endif
