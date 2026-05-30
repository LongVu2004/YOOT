import { useState } from "react";
import { DndContext, type DragEndEvent, type DragOverEvent, closestCorners } from "@dnd-kit/core";
import { useTodo } from "../provider/todo/useTodo";
import { KanbanColumn } from "../components/KanbanColumn";
import { Header } from "../layout/Header";

export const TodoAppPage = () => {
    const { tasks, updateTaskStatus, moveTask, addTask } = useTodo();

    const [newTaskTitle, setNewTaskTitle] = useState("");
    const todoTasks = tasks.filter((t) => t.status === "TODO");
    const inProgressTasks = tasks.filter((t) => t.status === "IN_PROGRESS");
    const doneTasks = tasks.filter((t) => t.status === "DONE");

    const handleAddTask = () => {
        if (newTaskTitle.trim() === "") return; 
        addTask(newTaskTitle);
        setNewTaskTitle(""); 
    };

    const handleDragOver = (event: DragOverEvent) => {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id as string;
        const overId = over.id as string;
        const activeData = active.data.current;
        const overData = over.data.current;

        if (!activeData || !overData) return;

        const isDraggingTask = activeData.type === "Task";
        const isOverAColumn = overData.type === "Column";
        
        if (isDraggingTask && isOverAColumn) {
            updateTaskStatus(activeId, overId as never);
            return;
        }

        const isOverATask = overData.type === "Task";
        if (isDraggingTask && isOverATask) {
            const newStatus = overData.task.status;
            if (activeData.task.status !== newStatus) {
                updateTaskStatus(activeId, newStatus);
            }
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id as string;
        const overId = over.id as string;

        if (activeId !== overId) {
            moveTask(activeId, overId);
        }
    };

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#fff" }}>
            <Header />
            <div style={{ padding: "24px" }}>
                <div style={{ marginBottom: "24px", display: "flex", gap: "8px" }}>
                    <input
                        type="text"
                        placeholder="Nhập tên công việc mới..."
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleAddTask()} 
                        style={{
                            padding: "8px 12px",
                            width: "300px",
                            borderRadius: "4px",
                            border: "1px solid #d9d9d9",
                            fontSize: "14px"
                        }}
                    />
                    <button
                        onClick={handleAddTask}
                        style={{
                            padding: "8px 16px",
                            backgroundColor: "#1890ff",
                            color: "#fff",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontWeight: "bold"
                        }}
                    >
                        + Thêm
                    </button>
                </div>

                <DndContext
                    collisionDetection={closestCorners}
                    onDragOver={handleDragOver}
                    onDragEnd={handleDragEnd}
                >
                    <div style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}>
                        <KanbanColumn id="TODO" title="Cần làm" tasks={todoTasks} />
                        <KanbanColumn id="IN_PROGRESS" title="Đang làm" tasks={inProgressTasks} />
                        <KanbanColumn id="DONE" title="Đã xong" tasks={doneTasks} />
                    </div>
                </DndContext>
            </div>
        </div>
    );
};