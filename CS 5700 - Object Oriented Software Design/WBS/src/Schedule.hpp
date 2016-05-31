// Jonathan Petersen
// A01236750
// WBS Assignment
// Schedule Class Header

#ifndef WBS_SCHEDULE_HPP
#define WBS_SCHEDULE_HPP

#include <memory>
#include "ParentTask.hpp"
#include "Workforce.hpp"
#include "WorkDay.hpp"

class Schedule {
   public:
    Schedule() = default;
    ~Schedule() = default;

    inline std::shared_ptr<ParentTask> getWBS() { return m_wbs; }
    inline std::shared_ptr<Workforce> getEngineers() { return m_engineers; }
    inline void setWBS(std::shared_ptr<ParentTask> wbs) { m_wbs = wbs; }
    inline void setEngineers(std::shared_ptr<Workforce> e) { m_engineers = e; }

    std::vector<WorkDay> getSchedule();

   private:
    std::shared_ptr<ParentTask> m_wbs;
    std::shared_ptr<Workforce> m_engineers;
};

#endif
