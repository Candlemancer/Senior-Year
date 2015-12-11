// Jonathan Petersen
// A01236750
// WBS Assignment
// Engineer Class Header

#ifndef WBS_ENGINEER_HPP
#define WBS_ENGINEER_HPP

#include "Workforce.hpp"
#include <string>

class Engineer : public Workforce {
   public:
    Engineer(int id,
             std::string name,
             int hoursAvailable = FULL_TIME_DAILY_HOURS);
    virtual ~Engineer() = default;
    virtual std::chrono::hours getDailyAvailability();
    void setDailyAvailability(std::chrono::hours dailyHours);
    inline std::string getName() { return m_name; }
    inline int getID() { return m_id; }

   protected:
    int m_id;
    std::string m_name;

   private:
    const static int FULL_TIME_DAILY_HOURS;
    const static int MAX_HOURS_PER_DAY;
    const static int MIN_HOURS_PER_DAY;
};

#endif
