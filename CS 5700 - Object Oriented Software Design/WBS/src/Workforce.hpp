// Jonathan Petersen
// A01236750
// WBS Assignment
// Workforce Base Class Header

#ifndef WBS_WORKFORCE_HPP
#define WBS_WORKFORCE_HPP

#include <chrono>

class Workforce {
   public:
    Workforce() = default;
    Workforce(int hoursAvailable);
    virtual ~Workforce() = default;
    virtual std::chrono::hours getDailyAvailability() = 0;

   protected:
    std::chrono::hours m_dailyAvailability;
};

#endif
