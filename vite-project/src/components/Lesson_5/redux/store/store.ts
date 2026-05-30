import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../../cart-redux/slice/cartSlice";
// import todoKanbanReducer from "../../todo-kanban-redux/slice/todoKanbanSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    // todoKanban: todoKanbanReducer,
  },
});

// type (nếu dùng TS)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
