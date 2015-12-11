// Jonathan Petersen
// A01236750
// WBS Assignment
// EngineerTeam Header

#ifndef WBS_ENGINEER_TEAM_HPP
#define WBS_ENGINEER_TEAM_HPP

#include "Workforce.hpp"

#include <vector>
#include <memory>

class EngineerTeam : public Workforce {
    using Workers = std::vector<std::shared_ptr<Workforce>>;

   public:
    EngineerTeam() = default;
    virtual ~EngineerTeam() = default;
    virtual std::chrono::hours getDailyAvailability();
    inline Workers getMembers() { return m_members; }
    inline void setMembers(Workers engineers) { m_members = engineers; }
    void addTeamMember(std::shared_ptr<Workforce> member);
    void removeTeamMember(int id);

   private:
    Workers m_members;
};

#endif
