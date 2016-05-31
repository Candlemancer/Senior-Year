// Jonathan Petersen
// A01236750
// WBS Assignment
// Work Day Header

#ifndef WBS_WORK_DAY_HPP
#define WBS_WORK_DAY_HPP

#include <vector>
#include <memory>
#include "Task.hpp"

class WorkDay {
   public:
    WorkDay() = default;
    ~WorkDay() = default;
    const static int WORKDAY_LENGTH;

    inline int getHoursFilled() { return m_hoursFilled; }
    inline std::vector<std::shared_ptr<Task>> getTasks() { return m_tasks; }
    inline std::vector<std::shared_ptr<Workforce>> getWorkers() {
        return m_workers;
    }
    void addAssignment(int hours,
                       std::shared_ptr<Task> task,
                       std::shared_ptr<Workforce> worker);

   private:
    int m_hoursFilled;
    std::vector<std::shared_ptr<Task>> m_tasks;
    std::vector<std::shared_ptr<Workforce>> m_workers;
};

#endif
