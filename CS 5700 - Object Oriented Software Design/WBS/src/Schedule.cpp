// Jonathan Petersen
// A01236750
// WBS Assignment
// Schedule Class Implementation

#include "Schedule.hpp"
#include "LeafTask.hpp"

std::vector<WorkDay> Schedule::getSchedule() {
    std::vector<WorkDay> days;
    auto day = WorkDay();
    for (auto&& i : *m_wbs) {
        auto leaf = std::dynamic_pointer_cast<LeafTask>(i);
        if (leaf == std::shared_ptr<LeafTask>()) {
            continue;
        }
    }

    return days;
}
