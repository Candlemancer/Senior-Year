// Jonathan Petersen
// A01236750
// WBS Assignment
// Parallel Parent Task Implementation

#include "../api/catch.hpp"
#include <cmath>

#include "ParallelParentTask.hpp"

int ParallelParentTask::getOriginalHoursEstimate() {
    auto maxEstimate = 0;
    for (auto&& task : m_tasks) {
        auto candidateEstimate = task->getOriginalHoursEstimate();
        if (candidateEstimate > maxEstimate) {
            maxEstimate = candidateEstimate;
        }
    }
    return maxEstimate;
}

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

TEST_CASE("Trivial Parallel Parent Task", "[Tasks]") {
    auto l = ParallelParentTask(0, "Label", "Description");
    REQUIRE(l.getID() == 0);
    REQUIRE(l.getLabel() == "Label");
    REQUIRE(l.getDescription() == "Description");
    REQUIRE(l.getEngineers() == std::vector<std::shared_ptr<Workforce>>());
    REQUIRE(l.getOriginalHoursEstimate() == 0);
    REQUIRE(l.getCurrentHoursEstimate() == 0);
    REQUIRE(std::isnan(l.getPercentComplete()));
    REQUIRE(l.getHoursRemaining() == 0);
    REQUIRE(l.getWorkDaysRemaining() == 0);
}
