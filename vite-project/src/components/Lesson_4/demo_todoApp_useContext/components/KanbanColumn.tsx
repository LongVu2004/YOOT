import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { TaskCard } from "./TaskCard";
import type { Task, TaskStatus } from "../types";

type KanbanColumnProps = {
    id: TaskStatus;
    title: string;
    tasks: Task[];
};

export const KanbanColumn = ({ id, title, tasks }: KanbanColumnProps) => {
    const { setNodeRef } = useDroppable({
        id: id,
        data: { type: "Column", status: id },
    });

    return (
        <div
            style={{
                flex: 1,
                backgroundColor: "#f4f5f7",
                padding: "16px",
                borderRadius: "8px",
                minHeight: "500px",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <h3 style={{ marginBottom: "16px", fontWeight: "bold" }}>
                {title} ({tasks.length})
            </h3>
            
            <div ref={setNodeRef} style={{ flex: 1 }}>
                <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
                    {tasks.map((task) => (
                        <TaskCard key={task.id} task={task} />
                    ))}
                </SortableContext>
            </div>
        </div>
    );
};