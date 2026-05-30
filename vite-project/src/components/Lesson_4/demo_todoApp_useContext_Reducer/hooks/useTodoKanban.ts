import { useContext } from "react";
import { TodoKanbanContext } from "../context/todo-kanban-context";

export const useTodo = () => {
  const context = useContext(TodoKanbanContext);

  if (!context) {
    throw new Error("useTodo must be used within TodoKanbanProvider");
  }

  return context;
};
