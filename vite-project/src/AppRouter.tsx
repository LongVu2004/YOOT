import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import AdminLayout from "./layouts/AdminLayout"
import CourseManagement from "./components/Lesson_1/CourseManagement";
import StudentManagement from "./components/Lesson_1/StudentManagement";
import CourseTailwind from "./components/Lesson_1/TailwindCSS/Course/CourseManagement";
import StudentTailwind from "./components/Lesson_1/TailwindCSS/Student/StudentManagement";
import CourseManagementAntd from "./components/Lesson_1/Antd/Course/CourseManagementAntd";
import StudentManagementAntd from "./components/Lesson_1/Antd/Student/StudentManagementAntd";
import { TodoAppPage } from "./components/Lesson_4/demo_todoApp_useContext/pages/TodoAppPage";
import { TodoProvider } from "./components/Lesson_4/demo_todoApp_useContext/provider/todo/TodoProvider";
import CartProvider from "./components/Lesson_4/demo-cartContext/provider/cart/CartProvider";
import ProductPages from "./components/Lesson_4/demo-cartContext/pages/ProductPages";
import Header from "./components/Lesson_4/demo-cartContext/layout/Header";
import CartProviderReducer from "./components/Lesson_4/demo-cartContext-Reducer/provider/cart/CartProvider";
import ProductPagesReducer from "./components/Lesson_4/demo-cartContext-Reducer/pages/ProductPages";
import HeaderReducer from "./components/Lesson_4/demo-cartContext-Reducer/layout/Header";
import { TodoKanbanProvider } from "./components/Lesson_4/demo_todoApp_useContext_Reducer/provider/TodoKanbanProvider";
import TodoKanbanPage from "./components/Lesson_4/demo_todoApp_useContext_Reducer/pages/TodoAppPage";
import HeaderRedux from "./components/Lesson_5/cart-redux/layout/Header";
import ProductPagesRedux from "./components/Lesson_5/cart-redux/pages/ProductPages";
import { Provider } from "react-redux";
import { store } from "./components/Lesson_5/redux/store/store";

const AppRouter = () => {
    return (
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminLayout />}>
            
            <Route index element={<Navigate to="/students" replace />} />
            <Route path="courses" element={<CourseManagement />} />
            <Route path="students" element={<StudentManagement />} />
            

            <Route path="students-tailwind" element={<StudentTailwind />} />
            <Route path="courses-tailwind" element={<CourseTailwind />} />

            
            <Route path="students-Antd" element={<StudentManagementAntd />} />
            <Route path="courses-Antd" element={<CourseManagementAntd />} />

            <Route path="cart-context-useContext" 
              element={
                <CartProvider>
                  < Header />
                  < ProductPages />
                </CartProvider>}
              />

            <Route path = "cart-context-Reducer"
              element={
                <CartProviderReducer>
                  < HeaderReducer />
                  < ProductPagesReducer />
                </CartProviderReducer>}
              />

            <Route path="todo-app" 
              element={
                <TodoProvider>
                  <TodoAppPage />
                </TodoProvider>} 
              />

            <Route path="todo-app-reducer"
              element={
                <TodoKanbanProvider>
                  <TodoKanbanPage />
                </TodoKanbanProvider>} 
              />

            <Route 
              path="cart-redux"
              element={
                <Provider store={store}>
                  <HeaderRedux />
                  <ProductPagesRedux />
                </Provider>
              }
            />
            </Route>
        </Routes>
      </BrowserRouter>
    );
};

export default AppRouter;