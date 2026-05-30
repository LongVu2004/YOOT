import { createContext } from "react";

export type TodoKanbanStatus = "TODO" | "IN_PROGRESS" | "REVIEW" | "DONE";

export type TodoKanbanLevel = "LOW" | "NORMAL" | "HIGH";

export interface TodoKanbanItem {
  id: string;
  code: string;
  title: string;
  level: TodoKanbanLevel;
  status: TodoKanbanStatus;
}

interface TodoContextType {
  todos: TodoKanbanItem[];
  search: string;
  filteredTodos: TodoKanbanItem[];
  setTodos: React.Dispatch<React.SetStateAction<TodoKanbanItem[]>>;
  handleAddTodo: (newTodo: TodoKanbanItem) => void;
  handleUpdateTodo: (updatedTodo: TodoKanbanItem) => void;
  handleDeleteTodo: (id: string) => void;
  handleSearchTodo: (value: string) => void;
  handleDragEndTodo: (activeId: string, overId: string) => void;
}

export const TodoKanbanContext = createContext({} as TodoContextType);
