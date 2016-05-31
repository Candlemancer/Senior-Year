// Jonathan Petersen
// A01236750
// WBS Assignment
// Engineer Implementation

#include "../api/catch.hpp"

#include "Engineer.hpp"
#include <stdexcept>

const int Engineer::FULL_TIME_DAILY_HOURS = 8;
const int Engineer::MAX_HOURS_PER_DAY = 24;
const int Engineer::MIN_HOURS_PER_DAY = 0;

Engineer::Engineer(int id, std::string name, int hoursAvailable)
    : Workforce(hoursAvailable), m_id(id), m_name(name) {}

std::chrono::hours Engineer::getDailyAvailability() {
    return m_dailyAvailability;
}

void Engineer::setDailyAvailability(std::chrono::hours dailyHours) {
    if (dailyHours > std::chrono::hours(MAX_HOURS_PER_DAY)) {
        throw std::invalid_argument(m_name + " cannot be available more than " +
                                    std::to_string(MAX_HOURS_PER_DAY) +
                                    " hours a day!");
    }

    if (dailyHours < std::chrono::hours(MIN_HOURS_PER_DAY)) {
        throw std::invalid_argument(m_name + " cannot be available less than " +
                                    std::to_string(MIN_HOURS_PER_DAY) +
                                    " hours a day!");
    }

    m_dailyAvailability = dailyHours;
    return;
}

TEST_CASE("Basic Engineer Creation", "[Schedule]") {
    auto e = Engineer(0, "John Doe", 8);

    REQUIRE(e.getID() == 0);
    REQUIRE(e.getName() == "John Doe");
    REQUIRE(e.getDailyAvailability().count() == 8);
}
