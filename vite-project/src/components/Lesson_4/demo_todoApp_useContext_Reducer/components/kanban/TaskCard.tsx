import { Avatar, Button, Card, Dropdown, Tag } from "antd";

import type { TodoKanbanItem } from "../../context/todo-kanban-context";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useTodo } from "../../hooks/useTodoKanban";
import { EditOutlined, DeleteOutlined, MoreOutlined } from "@ant-design/icons";

const levelColorMap = {
  LOW: "green",
  NORMAL: "blue",
  HIGH: "orange",
  CRITICAL: "red",
};

interface TaskCardProps {
  todo: TodoKanbanItem;
  onEdit: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ todo, onEdit }) => {
  const { handleDeleteTodo } = useTodo();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: todo.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const items = [
    {
      key: "edit",
      icon: <EditOutlined />,
      label: "Edit",
      onClick: onEdit,
    },
    {
      key: "delete",
      danger: true,
      icon: <DeleteOutlined />,
      label: "Delete",
      onClick: () => handleDeleteTodo(todo.id),
    },
  ];

  const handlePointerDown = (e: React.PointerEvent) => {
    const target = e.target as HTMLElement;

    if (
      target.closest("button") ||
      target.closest(".ant-dropdown") ||
      target.closest(".ant-dropdown-menu")
    ) {
      e.stopPropagation();
      return;
    }

    /* Là sự kiện kéo thả */
    listeners?.onPointerDown?.(e);
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      onPointerDown={handlePointerDown}
      {...attributes}
      className="rounded-xl shadow-sm hover:shadow-md border border-gray-200"
      styles={{
        body: {
          padding: "14px",
        },
      }}
    >
      <div className="flex flex-col">
        <div className="flex items-start justify-between">
          <h2 className="text-[15px] font-medium text-gray-800 leading-6">
            {todo.title}
          </h2>

          <Dropdown
            menu={{
              items,
            }}
            trigger={["click"]}
          >
            <Button type="text" icon={<MoreOutlined />} />
          </Dropdown>
        </div>

        <div className="flex flex-col">
          <Tag color={levelColorMap[todo.level]} className="w-fit font-medium">
            {todo.level}
          </Tag>

          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 font-medium">
              {todo.code}
            </span>

            <Avatar size={34} src="https://i.pravatar.cc/100" />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;
