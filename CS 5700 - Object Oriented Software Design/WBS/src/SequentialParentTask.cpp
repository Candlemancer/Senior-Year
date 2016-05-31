// Jonathan Petersen
// A01236750
// WBS Assignment
// Sequential Parent Task Implementation

#include "../api/catch.hpp"
#include <cmath>

#include "SequentialParentTask.hpp"

int SequentialParentTask::getOriginalHoursEstimate() {
    auto totalEstimate = 0;
    for (auto&& task : m_tasks) {
        totalEstimate += task->getOriginalHoursEstimate();
    }
    return totalEstimate;
}

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

TEST_CASE("Trivial Sequential Parent Task", "[Tasks]") {
    auto l = SequentialParentTask(0, "Label", "Description");
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
