// Jonathan Petersen
// A01236750
// WBS Assignment
// Parent Task Header

#ifndef WBS_PARENT_TASK_HPP
#define WBS_PARENT_TASK_HPP

#include "Task.hpp"

class SequentialParentTask;
class ParallelParentTask;
class ParentTask;
class TreeIterator;

class TreeIterator {
   public:
    TreeIterator(std::shared_ptr<Task> rootNode);
    ~TreeIterator() = default;
    TreeIterator& operator++();
    std::shared_ptr<Task> operator*();
    bool operator==(const TreeIterator& that);
    bool operator!=(const TreeIterator& that);
    inline std::shared_ptr<Task> getNode() const { return m_node; }

   private:
    std::shared_ptr<Task> breadthFirstSearch(std::shared_ptr<Task> root,
                                             int length);
    std::shared_ptr<Task> m_root;
    std::shared_ptr<Task> m_node;
    int m_index;
};

class ParentTask : public Task {
    // public virtual std::enable_shared_from_this<ParentTask> {
   public:
    inline ParentTask(int id,
                      std::string label,
                      std::string description,
                      int hoursEstimate)
        : Task(id, label, description, hoursEstimate), m_tasks() {}
    virtual ~ParentTask() = default;
    virtual double getPercentComplete();
    inline std::vector<std::shared_ptr<Task>> getTasks() { return m_tasks; }
    inline void setTasks(std::vector<std::shared_ptr<Task>> tasks) {
        m_tasks = tasks;
        for (auto&& task : m_tasks) {
            auto p_parent = shared_from_this();
            task->setParent(p_parent);
        }
    }

    TreeIterator begin();
    TreeIterator end();

   protected:
    std::vector<std::shared_ptr<Task>> m_tasks;
};

#endif
