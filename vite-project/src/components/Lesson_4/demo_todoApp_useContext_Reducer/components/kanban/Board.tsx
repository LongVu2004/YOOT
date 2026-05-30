import { useState } from "react";

import { closestCorners, DndContext, type DragEndEvent } from "@dnd-kit/core";

import { Button, Input, message } from "antd";

import Column from "./Column";

import { useTodo } from "../../hooks/useTodoKanban";

import type {
  TodoKanbanItem,
  TodoKanbanStatus,
} from "../../context/todo-kanban-context";
import ModalTodoKanban from "../modal/ModalTodoKanban";

export type ColumnsType = {
  key: TodoKanbanStatus;
  title: string;
};

// eslint-disable-next-line react-refresh/only-export-components
export const columns: ColumnsType[] = [
  {
    key: "TODO",
    title: "TO DO",
  },
  {
    key: "IN_PROGRESS",
    title: "IN PROGRESS",
  },
  {
    key: "REVIEW",
    title: "IN REVIEW",
  },
  {
    key: "DONE",
    title: "DONE",
  },
];

const Board = () => {
  const {
    search,
    filteredTodos,
    handleAddTodo,
    handleUpdateTodo,
    handleDragEndTodo,
    handleSearchTodo,
  } = useTodo();

  const [openModal, setOpenModal] = useState(false);
  const [editingTodo, setEditingTodo] = useState<TodoKanbanItem | null>(null);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    handleDragEndTodo(active.id as string, over.id as string);
  };

  const handleEditTodo = (todo: TodoKanbanItem) => {
    setEditingTodo(todo);

    setOpenModal(true);
  };

  const handleSubmit = (values: Omit<TodoKanbanItem, "id">) => {
    if (editingTodo) {
      handleUpdateTodo({
        ...editingTodo,
        ...values,
      });

      message.success("Update todo success");
    } else {
      const newTodo: TodoKanbanItem = {
        id: Date.now().toString(),

        code: values.code,

        title: values.title,

        level: values.level,

        status: "TODO",
      };

      handleAddTodo(newTodo);

      message.success("Create todo success");
    }

    setOpenModal(false);
    setEditingTodo(null);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Input.Search
          placeholder="Search by title or code..."
          allowClear
          size="large"
          className="max-w-87.5"
          value={search}
          onChange={(e) => handleSearchTodo(e.target.value)}
        />

        <Button type="primary" size="large" onClick={() => setOpenModal(true)}>
          Add Todo
        </Button>
      </div>

      <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: `repeat(${columns.length}, minmax(280px, 1fr))`,
          }}
        >
          {columns.map((column) => (
            <Column
              key={column.key}
              column={column}
              todos={filteredTodos.filter((item) => item.status === column.key)}
              handleEditTodo={handleEditTodo}
            />
          ))}
        </div>
      </DndContext>

      <ModalTodoKanban
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setEditingTodo(null);
        }}
        onSuccess={handleSubmit}
        editingTodo={editingTodo}
      />
    </div>
  );
};

export default Board;
