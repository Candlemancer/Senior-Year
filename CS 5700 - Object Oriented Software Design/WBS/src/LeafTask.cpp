// Jonathan Petersen
// A01236750
// WBS Assignment
// Leaf Task Implementation

#include "../api/catch.hpp"
#include <cmath>

#include "LeafTask.hpp"

void LeafTask::setCurrentHoursEstimate(int hoursEstimate) {
    m_remainingHours +=
        std::chrono::hours(hoursEstimate) - m_currentHoursEstimate;
    m_currentHoursEstimate = std::chrono::hours(hoursEstimate);
    m_percentComplete =
        1.0 - (m_remainingHours.count() / static_cast<double>(hoursEstimate));
    m_remainingDays = std::ceil(m_remainingHours.count() / 8.0);
}

void LeafTask::setPercentComplete(double percentComplete) {
    m_percentComplete = percentComplete;
    m_remainingHours = m_currentHoursEstimate -
                       std::chrono::hours(static_cast<int>(
                           m_currentHoursEstimate.count() * percentComplete));
    m_remainingDays = std::ceil(m_remainingHours.count() / 8.0);
}

TEST_CASE("Trivial Leaf Task", "[Tasks]") {
    auto l = LeafTask(0, "Label", "Description", 1);
    REQUIRE(l.getID() == 0);
    REQUIRE(l.getLabel() == "Label");
    REQUIRE(l.getDescription() == "Description");
    REQUIRE(l.getEngineers() == std::vector<std::shared_ptr<Workforce>>());
    REQUIRE(l.getOriginalHoursEstimate() == 1);
    REQUIRE(l.getCurrentHoursEstimate() == 1);
    REQUIRE(l.getPercentComplete() == 0);
    REQUIRE(l.getHoursRemaining() == 1);
    REQUIRE(l.getWorkDaysRemaining() == 1);
}

TEST_CASE("Moderate Leaf Task", "[Tasks]") {
    auto l = LeafTask(0, "Label", "Description", 100);
    std::vector<std::shared_ptr<Workforce>> engr = {
        std::make_shared<Engineer>(0, "John Doe", 8)};
    l.setEngineers(engr);
    l.setPercentComplete(0.50);

    REQUIRE(l.getID() == 0);
    REQUIRE(l.getLabel() == "Label");
    REQUIRE(l.getDescription() == "Description");
    REQUIRE(l.getEngineers() == engr);
    REQUIRE(l.getOriginalHoursEstimate() == 100);
    REQUIRE(l.getCurrentHoursEstimate() == 100);
    REQUIRE(l.getPercentComplete() == 0.5);
    REQUIRE(l.getHoursRemaining() == 50);
    REQUIRE(l.getWorkDaysRemaining() == 7);

    l.setCurrentHoursEstimate(200);

    REQUIRE(l.getID() == 0);
    REQUIRE(l.getLabel() == "Label");
    REQUIRE(l.getDescription() == "Description");
    REQUIRE(l.getEngineers() == engr);
    REQUIRE(l.getOriginalHoursEstimate() == 100);
    REQUIRE(l.getCurrentHoursEstimate() == 200);
    REQUIRE(l.getPercentComplete() == 0.25);
    REQUIRE(l.getHoursRemaining() == 150);
    REQUIRE(l.getWorkDaysRemaining() == 19);
}

TEST_CASE("Days Edge Case", "[Tasks]") {
    auto l = LeafTask(0, "Label", "Description", 15);
    REQUIRE(l.getWorkDaysRemaining() == 2);

    auto m = LeafTask(0, "Label", "Description", 16);
    REQUIRE(m.getWorkDaysRemaining() == 2);

    auto n = LeafTask(0, "Label", "Description", 17);
    REQUIRE(n.getWorkDaysRemaining() == 3);
}

TEST_CASE("Setting Progress", "[Tasks]") {
    auto l1 = LeafTask(0, "Label", "Description", 200);
    auto l2 = LeafTask(1, "Label", "Description", 100);

    l1.setPercentComplete(0.125);
    l2.setPercentComplete(0.25);
    REQUIRE(l1.getHoursRemaining() == 200 - 25);
    REQUIRE(l2.getHoursRemaining() == 100 - 25);
}
