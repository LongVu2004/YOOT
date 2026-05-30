import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Task } from "../types";

export const TaskCard = ({ task }: { task: Task }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: task.id, data: { type: "Task", task } });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        padding: "16px",
        margin: "8px 0",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: isDragging ? "0 4px 12px rgba(0,0,0,0.2)" : "0 1px 3px rgba(0,0,0,0.1)",
        cursor: "grab",
        opacity: isDragging ? 0.5 : 1,
        border: "1px solid #e8e8e8",
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            {task.title}
        </div>
    );
};