// Jonathan Petersen
// A01236750
// WBS Assignment
// Engineer Team Implementation

#include "EngineerTeam.hpp"
#include "Engineer.hpp"
#include <algorithm>

std::chrono::hours EngineerTeam::getDailyAvailability() {
    auto total = std::chrono::hours();
    for (auto&& i : m_members) {
        total += i->getDailyAvailability();
    }
    return total;
}

void EngineerTeam::addTeamMember(std::shared_ptr<Workforce> member) {
    m_members.push_back(member);
}

void EngineerTeam::removeTeamMember(int id) {
    m_members.erase(std::remove_if(
        m_members.begin(), m_members.end(),
        [&id](const std::shared_ptr<Workforce>& worker) {
            if (std::dynamic_pointer_cast<Engineer>(worker)->getID() == id) {
                return true;
            }
            return false;
        }));
}
