// Jonathan Petersen
// A01236750
// WBS Assignment
// Tree Iterator Implementation

#include "ParentTask.hpp"
#include <queue>

TreeIterator::TreeIterator(std::shared_ptr<Task> rootNode)
    : m_root(rootNode), m_node(rootNode), m_index(2) {}

TreeIterator& TreeIterator::operator++() {
    auto orig = m_node;

    m_node = breadthFirstSearch(m_root, m_index);
    ++m_index;

    if (m_node == orig) {
        m_node = nullptr;
    }

    return *this;
}

std::shared_ptr<Task> TreeIterator::operator*() {
    return m_node;
}

bool TreeIterator::operator==(const TreeIterator& that) {
    if (this->getNode() == that.getNode()) {
        return true;
    }
    return false;
}

bool TreeIterator::operator!=(const TreeIterator& that) {
    return !(this->operator==(that));
}

std::shared_ptr<Task> TreeIterator::breadthFirstSearch(
    std::shared_ptr<Task> root,
    int length) {
    auto node = root;
    std::queue<std::shared_ptr<Task>> q;
    q.push(root);

    while (!q.empty() && length > 0) {
        node = q.front();
        q.pop();

        length -= 1;

        auto parent = std::dynamic_pointer_cast<ParentTask>(node);
        if (parent == std::shared_ptr<ParentTask>()) {
            continue;
        }

        for (auto&& child : parent->getTasks()) {
            q.push(child);
        }
    }

    return node;
}
