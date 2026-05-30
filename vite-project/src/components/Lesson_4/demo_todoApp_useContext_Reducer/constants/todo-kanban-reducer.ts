import type { TodoKanbanItem, TodoKanbanStatus } from "../context/todo-kanban-context";
import { arrayMove } from "@dnd-kit/sortable";
import { columns } from "../components/kanban/Board";
import { TODO_KANBAN_ACTION } from "./todo-kanban-actions";

export interface TodoKanbanState {
    todos: TodoKanbanItem[];
    search: string;
}

export const initialTodoKanbanState: TodoKanbanState = {
    todos: [
        {
            id: "1",
            code: "TODO-1",
            title: "Học Reactjs",
            level: "HIGH",
            status: "TODO",
        },
    ],
    search: "",
};

type TodoKanbanAction =
    {
        type: typeof TODO_KANBAN_ACTION.ADD_TODO;
        payload: TodoKanbanItem;
    }
    | {
        type: typeof TODO_KANBAN_ACTION.UPDATE_TODO;
        payload: TodoKanbanItem;
    }
    | {
        type: typeof TODO_KANBAN_ACTION.DELETE_TODO;
        payload: string; 
    }
    | {
        type: typeof TODO_KANBAN_ACTION.SEARCH_TODO;
        payload: string; 
    }
    | {
        type: typeof TODO_KANBAN_ACTION.DRAG_END_TODO;
        payload: { activeId: string; overId: string };
    };

export const todoKanbanReducer = (
    state: TodoKanbanState,
    action: TodoKanbanAction
): TodoKanbanState => {
    switch (action.type) {
        case TODO_KANBAN_ACTION.ADD_TODO: {
            const { payload: newTodo } = action;
            return {
                ...state,
                todos: [...state.todos, newTodo],
            };
        }
        case TODO_KANBAN_ACTION.UPDATE_TODO: {
            const { payload: updatedTodo } = action;
            return {
                ...state,
                todos: state.todos.map((todo) =>
                    todo.id === updatedTodo.id ? updatedTodo : todo
                ),
            };
        }
        case TODO_KANBAN_ACTION.DELETE_TODO: {
            const { payload: id } = action;
            return {
                ...state,
                todos: state.todos.filter((todo) => todo.id !== id),
            };
        }
        case TODO_KANBAN_ACTION.SEARCH_TODO: {
            const { payload: searchValue } = action;
            return {
                ...state,
                search: searchValue,
            };
        }
        case TODO_KANBAN_ACTION.DRAG_END_TODO: {
            const { payload } = action;
            const { activeId, overId } = payload;

            if (activeId === overId) return state;

            const activeTask = state.todos.find((t) => t.id === activeId);

            if (!activeTask) return state;

            const isColumn = columns.some((col) => col.key === overId);

            if (isColumn && activeTask.status !== overId) {
                return {
                    ...state,
                    todos: state.todos.map((todo) =>
                        todo.id === activeId
                            ? {
                                ...todo,
                                status: overId as TodoKanbanStatus,
                            }
                            : todo
                    ),
                };
            }

            const overTask = state.todos.find((t) => t.id === overId);

            if (!overTask) return state;

            if (activeTask.status === overTask.status) {
                const sameColumnTodos = state.todos.filter(
                    (t) => t.status === activeTask.status
                );

                const oldIndex = sameColumnTodos.findIndex((t) => t.id === activeId);
                const newIndex = sameColumnTodos.findIndex((t) => t.id === overId);

                const reordered = arrayMove(sameColumnTodos, oldIndex, newIndex);

                const otherTodos = state.todos.filter(
                    (t) => t.status !== activeTask.status
                );

                return {
                    ...state,
                    todos: [...otherTodos, ...reordered],
                };
            } else {
                return {
                    ...state,
                    todos: state.todos.map((todo) =>
                        todo.id === activeId
                            ? {
                                ...todo,
                                status: overTask.status,
                            }
                            : todo
                    ),
                };
            }
        }
        default:
            return state;
    }
};
