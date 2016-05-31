// Jonathan Petersen
// A01236750
// WBS Assignment
// Task Base Class Header

#ifndef WBS_TASK_HPP
#define WBS_TASK_HPP

#include <string>
#include <vector>
#include <memory>
#include <chrono>

#include "Engineer.hpp"
#include "EngineerTeam.hpp"
#include "TaskVisitor.hpp"

class TreeIterator;

class Task : public virtual std::enable_shared_from_this<Task> {
    using Workers = std::vector<std::shared_ptr<Workforce>>;

   public:
    Task(int id,
         std::string label,
         std::string description,
         int hoursEstimate,
         std::shared_ptr<Task> parent = nullptr);
    virtual ~Task() = default;
    virtual void accept(std::shared_ptr<TaskVisitor> visitor) = 0;

    // Accessors
    inline int getID() { return m_id; }
    inline std::string getLabel() { return m_label; }
    inline std::string getDescription() { return m_description; }
    inline Workers getEngineers() { return m_engineers; }
    inline std::shared_ptr<Task> getParent() { return m_parent; }
    virtual inline int getOriginalHoursEstimate() {
        return m_originalHoursEstimate.count();
    }
    virtual int getCurrentHoursEstimate() = 0;
    virtual double getPercentComplete() = 0;
    virtual int getHoursRemaining() = 0;
    virtual int getWorkDaysRemaining() = 0;

    // Mutators
    inline void setLabel(std::string label) { m_label = label; }
    inline void setDescription(std::string desc) { m_description = desc; }
    inline void setEngineers(Workers engineers) { m_engineers = engineers; }
    inline void setParent(std::shared_ptr<Task> parent) { m_parent = parent; }

    void addEngineer(std::shared_ptr<Workforce> engr);
    bool operator==(Task* that);
    bool operator!=(Task* that);

   protected:
    const int m_id;
    std::string m_label;
    std::string m_description;
    Workers m_engineers;
    const std::chrono::hours m_originalHoursEstimate;
    std::chrono::hours m_currentHoursEstimate;
    double m_percentComplete;
    std::chrono::hours m_remainingHours;
    int m_remainingDays;
    std::shared_ptr<Task> m_parent;
};

#endif
