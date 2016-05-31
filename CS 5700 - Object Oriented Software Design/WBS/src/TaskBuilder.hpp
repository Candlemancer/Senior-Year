// Jonathan Petersen
// A01236750
// WBS Assignment
// Task Builder Header

#ifndef WBS_TASK_BUILDER_HPP
#define WBS_TASK_BUILDER_HPP

#include <string>
#include <chrono>
#include <vector>
#include <memory>
#include <cmath>

class Workforce;
class Task;

enum class TaskType { LEAF, SEQUENTIAL, PARALLEL };

class TaskBuilder {
   public:
    TaskBuilder();
    ~TaskBuilder() = default;

    TaskBuilder& setType(TaskType currentType);
    TaskBuilder& setLabel(std::string currentLabel);
    TaskBuilder& setDescription(std::string currentDescription);
    TaskBuilder& setHours(int currentHoursEstimate);

    std::shared_ptr<Task> build();

   private:
    int m_currentTaskID;

    // Task Details
    TaskType m_currentType;
    std::string m_currentLabel;
    std::string m_currentDescription;
    int m_currentOriginalHoursEstimate;

    const TaskType m_defaultType = TaskType::LEAF;
    const std::string m_defaultLabel = "Label";
    const std::string m_defaultDescription = "Description";
    const int m_defaultOriginalHoursEstimate = 0;
};

#endif
