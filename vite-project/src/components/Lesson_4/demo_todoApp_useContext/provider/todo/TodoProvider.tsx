import { useState, type ReactNode } from "react";
import { TodoContext } from "./todoContext";
import { initialTasks } from "../../services/tasks";
import type { Task, TaskStatus } from "../../types";

export const TodoProvider = ({ children }: { children: ReactNode }) => {
    const [tasks, setTasks] = useState<Task[]>(initialTasks);

    const addTask = (title: string) => {
        const newTask: Task = {
            id: `task-${Date.now()}`,
            title: title,
            status: "TODO",
        };
        setTasks((prevTasks) => [...prevTasks, newTask]);
    };

    const updateTaskStatus = (taskId: string, newStatus: TaskStatus) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskId ? { ...task, status: newStatus } : task
            )
        );
    };

    const moveTask = (activeId: string, overId: string) => {
        setTasks((prevTasks) => {
            const oldIndex = prevTasks.findIndex((t) => t.id === activeId);
            const newIndex = prevTasks.findIndex((t) => t.id === overId);
            
            const newTasks = [...prevTasks];
            const [movedTask] = newTasks.splice(oldIndex, 1);
            newTasks.splice(newIndex, 0, movedTask);
            return newTasks;
        });
    };

    return (
        <TodoContext.Provider value={{ tasks, updateTaskStatus, moveTask, addTask }}>
            {children}
        </TodoContext.Provider>
    );
};