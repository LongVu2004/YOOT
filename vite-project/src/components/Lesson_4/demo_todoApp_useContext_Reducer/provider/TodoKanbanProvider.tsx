import { useReducer } from "react";
import {
  TodoKanbanContext,
  type TodoKanbanItem,
} from "../context/todo-kanban-context";
import { todoKanbanReducer, initialTodoKanbanState } from "../constants/todo-kanban-reducer";
import { TODO_KANBAN_ACTION } from "../constants/todo-kanban-actions";

export const TodoKanbanProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(todoKanbanReducer, initialTodoKanbanState);

  // ADD TODO
  const handleAddTodo = (newTodo: TodoKanbanItem) => {
    dispatch({
      type: TODO_KANBAN_ACTION.ADD_TODO,
      payload: newTodo,
    });
  };

  // UPDATE TODO
  const handleUpdateTodo = (updatedTodo: TodoKanbanItem) => {
    dispatch({
      type: TODO_KANBAN_ACTION.UPDATE_TODO,
      payload: updatedTodo,
    });
  };

  // DELETE TODO
  const handleDeleteTodo = (id: string) => {
    dispatch({
      type: TODO_KANBAN_ACTION.DELETE_TODO,
      payload: id,
    });
  };

  // SEARCH TODO
  const handleSearchTodo = (value: string) => {
    dispatch({
      type: TODO_KANBAN_ACTION.SEARCH_TODO,
      payload: value,
    });
  };

  const handleDragEndTodo = (activeId: string, overId: string) => {
    dispatch({
      type: TODO_KANBAN_ACTION.DRAG_END_TODO,
      payload: { activeId, overId },
    });
  };

  // FILTER TODOS
  const filteredTodos = state.todos.filter(
    (todo) =>
      todo.title.toLowerCase().includes(state.search.toLowerCase()) ||
      todo.code.toLowerCase().includes(state.search.toLowerCase()),
  );

  return (
    <TodoKanbanContext.Provider
      value={{
        todos: state.todos,
        search: state.search,
        filteredTodos,
        setTodos: (setter) => {
          if (typeof setter === 'function') {
            const newTodos = setter(state.todos);
            // eslint-disable-next-line react-hooks/immutability
            state.todos = newTodos;
          } else {
            state.todos = setter;
          }
        },
        handleAddTodo,
        handleSearchTodo,
        handleUpdateTodo,
        handleDeleteTodo,
        handleDragEndTodo,
      }}
    >
      {children}
    </TodoKanbanContext.Provider>
  );
};
