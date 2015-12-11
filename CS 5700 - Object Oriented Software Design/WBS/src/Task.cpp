// Jonathan Petersen
// A01236750
// WBS Assignment
// Task Base Class Implementation

#include "Task.hpp"

Task::Task(int id,
           std::string label,
           std::string description,
           int hoursEstimate,
           std::shared_ptr<Task> parent)
    : m_id(id),
      m_label(label),
      m_description(description),
      // m_engineers(),
      m_originalHoursEstimate(hoursEstimate),
      m_currentHoursEstimate(hoursEstimate),
      m_percentComplete(0),
      m_remainingHours(hoursEstimate),
      m_remainingDays(hoursEstimate / 24),
      m_parent(parent) {}

// TreeIterator Task::begin() {
//     std::shared_ptr<Task> p_task = shared_from_this();
//     return
// }

// TreeIterator Task::end() {
//     return TreeIterator(nullptr);
// }
