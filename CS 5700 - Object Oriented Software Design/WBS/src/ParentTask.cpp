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

TreeIterator ParentTask::begin() {
    return TreeIterator(shared_from_this());
}

TreeIterator ParentTask::end() {
    return TreeIterator(nullptr);
}
