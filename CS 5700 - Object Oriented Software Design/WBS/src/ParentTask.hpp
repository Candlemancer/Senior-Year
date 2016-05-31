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
    inline ParentTask(int id, std::string label, std::string description)
        : Task(id, label, description, 0), m_tasks() {}
    virtual ~ParentTask() = default;
    virtual double getPercentComplete();
    inline std::vector<std::shared_ptr<Task>> getTasks() { return m_tasks; }
    void setTasks(std::vector<std::shared_ptr<Task>> tasks);
    void addTask(std::shared_ptr<Task> task);

    TreeIterator begin();
    TreeIterator end();

   protected:
    std::vector<std::shared_ptr<Task>> m_tasks;
};

#endif
