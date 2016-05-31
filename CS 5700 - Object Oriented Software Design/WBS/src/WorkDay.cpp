// Jonathan Petersen
// A01236750
// WBS Assignment
// WorkDay Implementation

#include "WorkDay.hpp"
#include <stdexcept>

const int WorkDay::WORKDAY_LENGTH = 8;

void WorkDay::addAssignment(int hours,
                            std::shared_ptr<Task> task,
                            std::shared_ptr<Workforce> worker) {
    if (hours > WORKDAY_LENGTH - m_hoursFilled) {
        throw std::runtime_error("Not enough hours in the day!");
    }

    m_hoursFilled += hours;
    task->addEngineer(worker);
}
