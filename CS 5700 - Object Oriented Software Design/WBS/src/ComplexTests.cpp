// Jonathan Petersen
// A01236750
// WBS Assignment
// Complex Unit Tests

#include "../api/catch.hpp"
#include <cmath>
#include <memory>
#include <iostream>

#include "TaskBuilder.hpp"
#include "LeafTask.hpp"
#include "SequentialParentTask.hpp"
#include "ParallelParentTask.hpp"
#include "XMLOutputVisitor.hpp"
#include "OutlineVisitor.hpp"

TEST_CASE("1.4 Parent Task Computes from Subtasks", "[Complex]") {
    auto builder = TaskBuilder();

    auto h1 = 100;
    auto h2 = 150;
    auto h3 = 200;
    auto p1 = 0.25;
    auto p2 = 0.50;
    auto p3 = 0.75;

    auto leaf1 = std::dynamic_pointer_cast<LeafTask>(
        builder.setType(TaskType::LEAF).setHours(h1).build());
    auto leaf2 = std::dynamic_pointer_cast<LeafTask>(
        builder.setType(TaskType::LEAF).setHours(h2).build());
    auto leaf3 = std::dynamic_pointer_cast<LeafTask>(
        builder.setType(TaskType::LEAF).setHours(h3).build());

    leaf1->setPercentComplete(p1);
    leaf2->setPercentComplete(p2);
    leaf3->setPercentComplete(p3);

    auto s = std::dynamic_pointer_cast<SequentialParentTask>(
        builder.setType(TaskType::SEQUENTIAL).build());
    s->addTask(leaf1);
    s->addTask(leaf2);
    s->addTask(leaf3);

    REQUIRE(s->getCurrentHoursEstimate() == h1 + h2 + h3);
    REQUIRE(s->getPercentComplete() == (p1 + p2 + p3) / 3.0);
    REQUIRE(s->getHoursRemaining() ==
            (h1 - (h1 * p1)) + (h2 - (h2 * p2)) + (h3 - (h3 * p3)));
    REQUIRE(s->getWorkDaysRemaining() == (std::ceil((h1 - (h1 * p1)) / 8.0) +
                                          std::ceil((h2 - (h2 * p2)) / 8.0) +
                                          std::ceil((h3 - (h3 * p3)) / 8.0)));

    auto p = std::dynamic_pointer_cast<ParallelParentTask>(
        builder.setType(TaskType::PARALLEL).build());
    p->addTask(leaf1);
    p->addTask(leaf2);
    p->addTask(leaf3);

    REQUIRE(p->getCurrentHoursEstimate() == std::max({h1, h2, h3}));
    REQUIRE(p->getPercentComplete() == (p1 + p2 + p3) / 3.0);
    REQUIRE(p->getHoursRemaining() ==
            std::max({(h1 - (h1 * p1)), (h2 - (h2 * p2)), (h3 - (h3 * p3))}));
    REQUIRE(p->getWorkDaysRemaining() ==
            std::max({std::ceil((h1 - (h1 * p1)) / 8.0),
                      std::ceil((h2 - (h2 * p2)) / 8.0),
                      std::ceil((h3 - (h3 * p3)) / 8.0)}));
}

TEST_CASE("1.5 Details Available From Root", "[Complex]") {
    auto builder = TaskBuilder();

    auto h1 = 100;
    auto h2 = 150;
    auto h3 = 200;
    auto h4 = 150;
    auto h5 = 175;
    auto h6 = 280;
    auto p1 = 0.25;
    auto p2 = 0.50;
    auto p3 = 0.75;
    auto p4 = 0.12;
    auto p5 = 0.59;
    auto p6 = 0.74;

    auto leaf1 = std::dynamic_pointer_cast<LeafTask>(
        builder.setType(TaskType::LEAF).setHours(h1).build());
    auto leaf2 = std::dynamic_pointer_cast<LeafTask>(
        builder.setType(TaskType::LEAF).setHours(h2).build());
    auto leaf3 = std::dynamic_pointer_cast<LeafTask>(
        builder.setType(TaskType::LEAF).setHours(h3).build());
    auto leaf4 = std::dynamic_pointer_cast<LeafTask>(
        builder.setType(TaskType::LEAF).setHours(h4).build());
    auto leaf5 = std::dynamic_pointer_cast<LeafTask>(
        builder.setType(TaskType::LEAF).setHours(h5).build());
    auto leaf6 = std::dynamic_pointer_cast<LeafTask>(
        builder.setType(TaskType::LEAF).setHours(h6).build());

    leaf1->setPercentComplete(p1);
    leaf2->setPercentComplete(p2);
    leaf3->setPercentComplete(p3);
    leaf4->setPercentComplete(p4);
    leaf5->setPercentComplete(p5);
    leaf6->setPercentComplete(p6);

    auto p = std::dynamic_pointer_cast<ParallelParentTask>(
        builder.setType(TaskType::PARALLEL).build());
    p->addTask(leaf4);
    p->addTask(leaf5);
    p->addTask(leaf6);

    auto root = std::dynamic_pointer_cast<SequentialParentTask>(
        builder.setType(TaskType::SEQUENTIAL).build());
    root->addTask(leaf1);
    root->addTask(leaf2);
    root->addTask(leaf3);
    root->addTask(p);

    REQUIRE(root->getCurrentHoursEstimate() ==
            (h1 + h2 + h3 + std::max({h4, h5, h6})));
    REQUIRE(std::floor(root->getPercentComplete() * 100) ==
            std::floor(((p1 + p2 + p3 + p4 + p5 + p6) / 6.0) * 100));
    REQUIRE(
        root->getHoursRemaining() ==
        (h1 - (h1 * p1)) + (h2 - (h2 * p2)) + (h3 - (h3 * p3)) +
            std::max({(h4 - (h4 * p4)), (h5 - (h5 * p5)), (h6 - (h6 * p6))}));
    REQUIRE(root->getWorkDaysRemaining() ==
            (std::ceil((h1 - (h1 * p1)) / 8.0) +
             std::ceil((h2 - (h2 * p2)) / 8.0) +
             std::ceil((h3 - (h3 * p3)) / 8.0)) +
                std::max({std::ceil((h4 - (h4 * p4)) / 8.0),
                          std::ceil((h5 - (h5 * p5)) / 8.0),
                          std::ceil((h6 - (h6 * p6)) / 8.0)}));
}

TEST_CASE("Complex WBS to XML", "[Complex]") {
    auto builder = TaskBuilder();

    auto h1 = 100;
    auto h2 = 150;
    auto h3 = 200;
    auto h4 = 150;
    auto h5 = 175;
    auto h6 = 280;
    auto p1 = 0.25;
    auto p2 = 0.50;
    auto p3 = 0.75;
    auto p4 = 0.12;
    auto p5 = 0.59;
    auto p6 = 0.74;

    auto leaf1 =
        std::dynamic_pointer_cast<LeafTask>(builder.setType(TaskType::LEAF)
                                                .setLabel("Leaf1")
                                                .setDescription("1st Leaf Task")
                                                .setHours(h1)
                                                .build());
    auto leaf2 =
        std::dynamic_pointer_cast<LeafTask>(builder.setType(TaskType::LEAF)
                                                .setLabel("Leaf2")
                                                .setDescription("2nd Leaf Task")
                                                .setHours(h2)
                                                .build());
    auto leaf3 =
        std::dynamic_pointer_cast<LeafTask>(builder.setType(TaskType::LEAF)
                                                .setLabel("Leaf3")
                                                .setDescription("3rd Leaf Task")
                                                .setHours(h3)
                                                .build());
    auto leaf4 =
        std::dynamic_pointer_cast<LeafTask>(builder.setType(TaskType::LEAF)
                                                .setLabel("Leaf4")
                                                .setDescription("4th Leaf Task")
                                                .setHours(h4)
                                                .build());
    auto leaf5 =
        std::dynamic_pointer_cast<LeafTask>(builder.setType(TaskType::LEAF)
                                                .setLabel("Leaf5")
                                                .setDescription("5th Leaf Task")
                                                .setHours(h5)
                                                .build());
    auto leaf6 =
        std::dynamic_pointer_cast<LeafTask>(builder.setType(TaskType::LEAF)
                                                .setLabel("Leaf6")
                                                .setDescription("6th Leaf Task")
                                                .setHours(h6)
                                                .build());

    leaf1->setPercentComplete(p1);
    leaf2->setPercentComplete(p2);
    leaf3->setPercentComplete(p3);
    leaf4->setPercentComplete(p4);
    leaf5->setPercentComplete(p5);
    leaf6->setPercentComplete(p6);

    auto p = std::dynamic_pointer_cast<ParallelParentTask>(
        builder.setType(TaskType::PARALLEL).build());
    p->addTask(leaf4);
    p->addTask(leaf5);
    p->addTask(leaf6);

    auto root = std::dynamic_pointer_cast<SequentialParentTask>(
        builder.setType(TaskType::SEQUENTIAL).build());
    root->addTask(leaf1);
    root->addTask(leaf2);
    root->addTask(leaf3);
    root->addTask(p);

    std::shared_ptr<TaskVisitor> visitor = std::shared_ptr<XMLOutputVisitor>(
        new XMLOutputVisitor("ComplexTest.xml"));

    for (auto&& i : *root) {
        i->accept(visitor);
    }

    // Test will throw if the file could not be created.
}

TEST_CASE("Complex WBS to Outline", "[Complex]") {
    auto builder = TaskBuilder();

    auto h1 = 100;
    auto h2 = 150;
    auto h3 = 200;
    auto h4 = 150;
    auto h5 = 175;
    auto h6 = 280;
    auto p1 = 0.25;
    auto p2 = 0.50;
    auto p3 = 0.75;
    auto p4 = 0.12;
    auto p5 = 0.59;
    auto p6 = 0.74;

    auto leaf1 =
        std::dynamic_pointer_cast<LeafTask>(builder.setType(TaskType::LEAF)
                                                .setLabel("Leaf1")
                                                .setDescription("1st Leaf Task")
                                                .setHours(h1)
                                                .build());
    auto leaf2 =
        std::dynamic_pointer_cast<LeafTask>(builder.setType(TaskType::LEAF)
                                                .setLabel("Leaf2")
                                                .setDescription("2nd Leaf Task")
                                                .setHours(h2)
                                                .build());
    auto leaf3 =
        std::dynamic_pointer_cast<LeafTask>(builder.setType(TaskType::LEAF)
                                                .setLabel("Leaf3")
                                                .setDescription("3rd Leaf Task")
                                                .setHours(h3)
                                                .build());
    auto leaf4 =
        std::dynamic_pointer_cast<LeafTask>(builder.setType(TaskType::LEAF)
                                                .setLabel("Leaf4")
                                                .setDescription("4th Leaf Task")
                                                .setHours(h4)
                                                .build());
    auto leaf5 =
        std::dynamic_pointer_cast<LeafTask>(builder.setType(TaskType::LEAF)
                                                .setLabel("Leaf5")
                                                .setDescription("5th Leaf Task")
                                                .setHours(h5)
                                                .build());
    auto leaf6 =
        std::dynamic_pointer_cast<LeafTask>(builder.setType(TaskType::LEAF)
                                                .setLabel("Leaf6")
                                                .setDescription("6th Leaf Task")
                                                .setHours(h6)
                                                .build());

    leaf1->setPercentComplete(p1);
    leaf2->setPercentComplete(p2);
    leaf3->setPercentComplete(p3);
    leaf4->setPercentComplete(p4);
    leaf5->setPercentComplete(p5);
    leaf6->setPercentComplete(p6);

    auto p = std::dynamic_pointer_cast<ParallelParentTask>(
        builder.setType(TaskType::PARALLEL).setLabel("Parallel").build());
    p->addTask(leaf4);
    p->addTask(leaf5);
    p->addTask(leaf6);

    auto root = std::dynamic_pointer_cast<SequentialParentTask>(
        builder.setType(TaskType::SEQUENTIAL).setLabel("Root").build());
    root->addTask(leaf1);
    root->addTask(leaf2);
    root->addTask(leaf3);
    root->addTask(p);

    std::shared_ptr<TaskVisitor> visitor =
        std::shared_ptr<OutlineVisitor>(new OutlineVisitor("ComplexTest.txt"));

    for (auto&& i : *root) {
        i->accept(visitor);
    }

    // Test will throw if the file could not be created.
}
