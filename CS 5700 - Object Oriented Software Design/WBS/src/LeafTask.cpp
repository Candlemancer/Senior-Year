// Jonathan Petersen
// A01236750
// WBS Assignment
// Leaf Task Implementation

#include "LeafTask.hpp"

void LeafTask::setCurrentHoursEstimate(int hoursEstimate) {
    m_currentHoursEstimate = std::chrono::hours(hoursEstimate);
    m_percentComplete =
        1.0 - (m_remainingHours.count() / static_cast<double>(hoursEstimate));
    m_remainingDays = m_remainingHours.count() / 24;
}

void LeafTask::setPercentComplete(double percentComplete) {
    m_percentComplete = percentComplete;
    m_remainingHours = std::chrono::hours(
        static_cast<int>(m_currentHoursEstimate.count() * percentComplete));
    m_remainingDays = m_remainingHours.count() / 24;
}
