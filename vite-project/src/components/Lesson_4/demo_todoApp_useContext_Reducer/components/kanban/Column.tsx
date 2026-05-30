import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import type { ColumnsType } from "./Board";

import TaskCard from "./TaskCard";

import type { TodoKanbanItem } from "../../context/todo-kanban-context";
import { useDroppable } from "@dnd-kit/core";

interface ColumnProps {
  column: ColumnsType;
  todos: TodoKanbanItem[];
  handleEditTodo: (todo: TodoKanbanItem) => void;
}

const Column: React.FC<ColumnProps> = ({ column, todos, handleEditTodo }) => {
  const { setNodeRef } = useDroppable({
    id: column.key,
  });

  return (
    <div ref={setNodeRef} className="min-h-175 bg-gray-200 rounded-xl p-3">
      <div className="flex gap-2 mb-4">
        <h1 className="font-semibold">{column.title}</h1>

        <span className="text-sm text-gray-500">{todos.length}</span>
      </div>

      <SortableContext
        items={todos.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-col gap-3">
          {todos.map((todo) => (
            <TaskCard
              key={todo.id}
              todo={todo}
              onEdit={() => handleEditTodo(todo)}
            />
          ))}
        </div>
      </SortableContext>
    </div>
  );
};

export default Column;
