// Jonathan Petersen
// A01236750
// WBS Assignment
// Task Builder Implementation

#include "../api/catch.hpp"

#include "TaskBuilder.hpp"
#include "LeafTask.hpp"
#include "SequentialParentTask.hpp"
#include "ParallelParentTask.hpp"
#include <stdexcept>
#include <iostream>

TaskBuilder::TaskBuilder()
    : m_currentTaskID(0),
      m_currentType(TaskType::LEAF),
      m_currentLabel("Label"),
      m_currentDescription("Description"),
      m_currentOriginalHoursEstimate(0) {}

TaskBuilder& TaskBuilder::setType(TaskType currentType) {
    this->m_currentType = currentType;
    return *this;
}

TaskBuilder& TaskBuilder::setLabel(std::string currentLabel) {
    this->m_currentLabel = currentLabel;
    return *this;
}

TaskBuilder& TaskBuilder::setDescription(std::string currentDescription) {
    this->m_currentDescription = currentDescription;
    return *this;
}

TaskBuilder& TaskBuilder::setHours(int currentOriginalHoursEstimate) {
    this->m_currentOriginalHoursEstimate = currentOriginalHoursEstimate;
    return *this;
}

std::shared_ptr<Task> TaskBuilder::build() {
    // TRICKY: If this function throws, toReturn could be left in an invalid
    // state. Don't go passing it around where it doesn't need to be.
    std::shared_ptr<Task> toReturn;

    switch (m_currentType) {
        case TaskType::LEAF:
            toReturn = std::make_shared<LeafTask>(
                m_currentTaskID++, m_currentLabel, m_currentDescription,
                m_currentOriginalHoursEstimate);
            break;
        case TaskType::SEQUENTIAL:
            toReturn = std::make_shared<SequentialParentTask>(
                m_currentTaskID++, m_currentLabel, m_currentDescription);
            break;
        case TaskType::PARALLEL:
            toReturn = std::make_shared<ParallelParentTask>(
                m_currentTaskID++, m_currentLabel, m_currentDescription);
            break;
        default:
            throw std::runtime_error("Builder created invalid type!");
            break;
    }
    m_currentType = m_defaultType;
    m_currentLabel = m_defaultLabel;
    m_currentDescription = m_defaultDescription;
    m_currentOriginalHoursEstimate = m_defaultOriginalHoursEstimate;

    return toReturn;
}

TEST_CASE("Basic builder Leaf test", "[Builder]") {
    auto manualLeaf =
        std::shared_ptr<LeafTask>(new LeafTask(0, "Label", "Description", 0));
    auto builder = TaskBuilder();
    auto autoLeaf = builder.setType(TaskType::LEAF).build();
    // autoLeaf = std::dynamic_pointer_cast<LeafTask>(autoLeaf);

    REQUIRE(*manualLeaf == autoLeaf.get());
}

TEST_CASE("Basic builder Sequential test", "[Builder]") {
    auto builder = TaskBuilder();
    auto autoSequential = builder.setType(TaskType::SEQUENTIAL).build();
    auto manualSequential = std::shared_ptr<SequentialParentTask>(
        new SequentialParentTask(0, "Label", "Description"));

    REQUIRE(*manualSequential == autoSequential.get());
}

TEST_CASE("Basic builder Parallel test", "[Builder]") {
    auto manualParallel = std::shared_ptr<ParallelParentTask>(
        new ParallelParentTask(0, "Label", "Description"));
    auto builder = TaskBuilder();
    auto autoParallel = builder.setType(TaskType::PARALLEL).build();

    REQUIRE(*manualParallel == autoParallel.get());
}

TEST_CASE("Basic negated builder Leaf test", "[Builder]") {
    auto manualLeaf =
        std::shared_ptr<LeafTask>(new LeafTask(1, "Label", "Description", 0));
    auto builder = TaskBuilder();
    auto autoLeaf = builder.setType(TaskType::LEAF).build();
    // autoLeaf = std::dynamic_pointer_cast<LeafTask>(autoLeaf);

    REQUIRE(*manualLeaf != autoLeaf.get());
}

TEST_CASE("Basic negated builder Sequential test", "[Builder]") {
    auto builder = TaskBuilder();
    auto autoSequential = builder.setType(TaskType::SEQUENTIAL).build();
    auto manualSequential = std::shared_ptr<SequentialParentTask>(
        new SequentialParentTask(1, "Label", "Description"));

    REQUIRE(*manualSequential != autoSequential.get());
}

TEST_CASE("Basic negated builder Parallel test", "[Builder]") {
    auto manualParallel = std::shared_ptr<ParallelParentTask>(
        new ParallelParentTask(1, "Label", "Description"));
    auto builder = TaskBuilder();
    auto autoParallel = builder.setType(TaskType::PARALLEL).build();

    REQUIRE(*manualParallel != autoParallel.get());
}

TEST_CASE("Moderate builder test", "[Builder]") {
    auto builder = TaskBuilder();

    auto manualLeaf = std::shared_ptr<LeafTask>(
        new LeafTask(0, "LeafLabel", "Description", 100));
    auto autoLeaf = builder.setType(TaskType::LEAF)
                        .setLabel("LeafLabel")
                        .setHours(100)
                        .build();
    REQUIRE(*manualLeaf == autoLeaf.get());

    auto manualSequential = std::shared_ptr<SequentialParentTask>(
        new SequentialParentTask(1, "SequentialLabel", "Special Description"));
    auto autoSequential = builder.setType(TaskType::SEQUENTIAL)
                              .setLabel("SequentialLabel")
                              .setDescription("Special Description")
                              .setHours(100)
                              .build();
    REQUIRE(*manualSequential == autoSequential.get());

    auto manualParallel = std::shared_ptr<ParallelParentTask>(
        new ParallelParentTask(2, "ParallelLabel", "Description"));
    auto autoParallel = builder.setType(TaskType::PARALLEL)
                            .setLabel("ParallelLabel")
                            .setHours(100)
                            .build();
    REQUIRE(*manualParallel == autoParallel.get());
}

TEST_CASE("Moderate negated builder test", "[Builder]") {
    auto builder = TaskBuilder();

    auto manualLeaf = std::shared_ptr<LeafTask>(
        new LeafTask(7, "LeafLabel", "Special Description", 100));
    auto autoLeaf = builder.setType(TaskType::LEAF)
                        .setLabel("LeafLabel")
                        .setHours(100)
                        .build();
    REQUIRE(*manualLeaf != autoLeaf.get());

    auto manualSequential = std::shared_ptr<SequentialParentTask>(
        new SequentialParentTask(7, "SequentialLabel", "Special Description"));
    auto autoSequential = builder.setType(TaskType::SEQUENTIAL)
                              .setLabel("SequentialLabel")
                              .setDescription("Special Description")
                              .setHours(100)
                              .build();
    REQUIRE(*manualSequential != autoSequential.get());

    auto manualParallel = std::shared_ptr<ParallelParentTask>(
        new ParallelParentTask(2, "ParallelLabel", "Special Description"));
    auto autoParallel = builder.setType(TaskType::PARALLEL)
                            .setLabel("ParallelLabel")
                            .setHours(100)
                            .build();
    REQUIRE(*manualParallel != autoParallel.get());
}
