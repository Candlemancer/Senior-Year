// Jonathan Petersen
// A01236750
// WBS Assignment
// Parallel Parent Task Implementation

#include "ParallelParentTask.hpp"

int ParallelParentTask::getCurrentHoursEstimate() {
    auto maxEstimate = 0;
    for (auto&& task : m_tasks) {
        auto candidateEstimate = task->getCurrentHoursEstimate();
        if (candidateEstimate > maxEstimate) {
            maxEstimate = candidateEstimate;
        }
    }
    return maxEstimate;
}

int ParallelParentTask::getHoursRemaining() {
    auto maxHours = 0;
    for (auto&& task : m_tasks) {
        auto candidateEstimate = task->getHoursRemaining();
        if (candidateEstimate > maxHours) {
            maxHours = candidateEstimate;
        }
    }
    return maxHours;
}

int ParallelParentTask::getWorkDaysRemaining() {
    auto maxDays = 0;
    for (auto&& task : m_tasks) {
        auto candidateEstimate = task->getWorkDaysRemaining();
        if (candidateEstimate > maxDays) {
            maxDays = candidateEstimate;
        }
    }
    return maxDays;
}
