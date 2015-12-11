// Jonathan Petersen
// A01236750
// WBS Assignment
// Driver Code

#include <iostream>
#include <algorithm>
#include "Engineer.hpp"
#include "EngineerTeam.hpp"
#include "SequentialParentTask.hpp"
#include "ParallelParentTask.hpp"
#include "LeafTask.hpp"
#include "OutlineVisitor.hpp"

bool testCreateEngineer();
bool testCreateTeam();

int main() {
    // auto result = testCreateEngineer();
    // std::cout << "Test 1: " << result << std::endl;
    std::shared_ptr<TaskVisitor> visitor =
        std::make_shared<OutlineVisitor>(OutlineVisitor());

    for (auto&& i : *root) {
        i->accept(visitor);
    }

    return 0;
}

bool testCreateEngineer() {
    auto testWorker = Engineer(0, "Test", 1);
    if (testWorker.getID() != 0) {
        return false;
    }
    if (testWorker.getName() != "Test") {
        return false;
    }
    if (testWorker.getDailyAvailability().count() != 1) {
        return false;
    }
    return true;
}

bool testCreateTeam() {
    auto team = EngineerTeam();
    auto expected = std::vector<std::shared_ptr<Workforce>>{
        std::make_shared<Engineer>(Engineer(0001, "Test1", 4)),
        std::make_shared<Engineer>(Engineer(0002, "Test2", 7)),
        std::make_shared<Engineer>(Engineer(0003, "Test3", 5)),
        std::make_shared<Engineer>(Engineer(0005, "Test5", 6)),
        std::make_shared<Engineer>(Engineer(0010, "Manager", 8))};

    std::shared_ptr<Workforce> manager =
        std::make_shared<Engineer>(Engineer(0010, "Manager", 8));
    team.setMembers({std::make_shared<Engineer>(Engineer(0001, "Test1", 4)),
                     std::make_shared<Engineer>(Engineer(0002, "Test2", 7)),
                     std::make_shared<Engineer>(Engineer(0003, "Test3", 5)),
                     std::make_shared<Engineer>(Engineer(0004, "Test4", 9)),
                     std::make_shared<Engineer>(Engineer(0005, "Test5", 6))});
    team.addTeamMember(manager);
    team.removeTeamMember(0004);

    auto result = team.getMembers();
    for (auto&& i : expected) {
        auto engr = std::dynamic_pointer_cast<Engineer>(i);

        return false;
    }

    return true;
}
