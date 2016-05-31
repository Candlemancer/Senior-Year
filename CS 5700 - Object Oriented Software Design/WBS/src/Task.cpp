// Jonathan Petersen
// A01236750
// WBS Assignment
// Task Base Class Implementation

#include "Task.hpp"
#include <cmath>

Task::Task(int id,
           std::string label,
           std::string description,
           int hoursEstimate,
           std::shared_ptr<Task> parent)
    : m_id(id),
      m_label(label),
      m_description(description),
      m_engineers(),
      m_originalHoursEstimate(hoursEstimate),
      m_currentHoursEstimate(hoursEstimate),
      m_percentComplete(0),
      m_remainingHours(hoursEstimate),
      m_remainingDays(std::ceil(hoursEstimate / 8.0)),
      m_parent(parent) {}

void Task::addEngineer(std::shared_ptr<Workforce> engr) {
    m_engineers.push_back(engr);
}

bool Task::operator==(Task* that) {
    return (
        this->getID() == that->getID() &&
        this->getLabel() == that->getLabel() &&
        this->getDescription() == that->getDescription() &&
        this->getEngineers() == that->getEngineers() &&
        this->getOriginalHoursEstimate() == that->getOriginalHoursEstimate() &&
        this->getCurrentHoursEstimate() == that->getCurrentHoursEstimate() &&
        this->getHoursRemaining() == that->getHoursRemaining() &&
        this->getWorkDaysRemaining() == that->getWorkDaysRemaining());
}

bool Task::operator!=(Task* that) {
    return !(*this == that);
}
