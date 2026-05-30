import Board from "../components/kanban/Board";
import { TodoKanbanProvider } from "../provider/TodoKanbanProvider";

const TodoKanbanPage = () => {
  return (
    <TodoKanbanProvider>
      <Board />
    </TodoKanbanProvider>
  );
};

export default TodoKanbanPage;
