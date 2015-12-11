// Jonathan Petersen
// A01236750
// WBS Assignment
// Sequential Parent Task Implementation

#include "SequentialParentTask.hpp"

int SequentialParentTask::getCurrentHoursEstimate() {
    auto totalEstimate = 0;
    for (auto&& task : m_tasks) {
        totalEstimate += task->getCurrentHoursEstimate();
    }
    return totalEstimate;
}

int SequentialParentTask::getHoursRemaining() {
    auto totalHours = 0;
    for (auto&& task : m_tasks) {
        totalHours += task->getHoursRemaining();
    }
    return totalHours;
}

int SequentialParentTask::getWorkDaysRemaining() {
    auto totalDays = 0;
    for (auto&& task : m_tasks) {
        totalDays += task->getWorkDaysRemaining();
    }
    return totalDays;
}
