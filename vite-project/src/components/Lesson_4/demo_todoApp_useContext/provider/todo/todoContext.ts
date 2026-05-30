import { createContext } from "react";
import type { Task, TaskStatus } from "../../types";

export type TodoContextType = {
    tasks: Task[];
    updateTaskStatus: (taskId: string, newStatus: TaskStatus) => void;
    moveTask: (activeId: string, overId: string) => void;
    addTask: (title: string) => void;
};

export const TodoContext = createContext<TodoContextType | null>(null);