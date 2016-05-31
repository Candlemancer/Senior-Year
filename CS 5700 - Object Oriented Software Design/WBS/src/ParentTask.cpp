// Jonathan Petersen
// A01236750
// WBS Assignment
// Parallel Parent Task Implementation

#include "ParentTask.hpp"

double ParentTask::getPercentComplete() {
    auto totalPercent = 0.0;
    for (auto&& task : m_tasks) {
        totalPercent += task->getPercentComplete();
    }
    totalPercent /= m_tasks.size();
    return totalPercent;
}

void ParentTask::setTasks(std::vector<std::shared_ptr<Task>> tasks) {
    m_tasks = tasks;
    for (auto&& task : m_tasks) {
        task->setParent(shared_from_this());
    }
}

void ParentTask::addTask(std::shared_ptr<Task> task) {
    task->setParent(shared_from_this());
    m_tasks.push_back(task);
}

TreeIterator ParentTask::begin() {
    return TreeIterator(shared_from_this());
}

TreeIterator ParentTask::end() {
    return TreeIterator(nullptr);
}
