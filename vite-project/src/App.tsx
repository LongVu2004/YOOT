// import AppRouter from './AppRouter';
import Header from './components/Lesson_4/demo-cartContext/layout/Header';
import ProductPages from './components/Lesson_4/demo-cartContext/pages/ProductPages';
import CartProvider from './components/Lesson_4/demo-cartContext/provider/cart/CartProvider';

function App() {
  // const [count, setCount] = useState<number>(0);

  // const increase = () => {
  //   setCount(count + 1)
  // }

  // const decrease = () => {
  //   setCount(count - 1)
  // }
  
  return (
    <div>
      {/* <h1>Counter: {count}</h1>
      <button onClick={increase} style={{ marginRight: '10px' }}>
        Increase
      </button>
      <button onClick={decrease}>Decrease</button> */}
      {/* <ToggleButton /> */}

      {/* <InputPreview /> */}

      {/* <UsersList /> */}
      {/* <UsersWithMapAndFilter /> */}
      {/* <StudentManagement /> */}
      {/* <DynamicForm /> */}
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminLayout />}>
            
            <Route index element={<Navigate to="/courses" replace />} />
            <Route path="courses" element={<CourseManagement />} />
            <Route path="students" element={<StudentManagement />} />
            
            <Route index element={<Navigate to="/students-tailwind" replace />} />
            <Route path="students-tailwind" element={<StudentTailwind />} />
            <Route path="courses-tailwind" element={<CourseTailwind />} />
          </Route>
        </Routes>
      </BrowserRouter> */}
      {/* <AppRouter />  */}
      <CartProvider>
        <Header />
        <ProductPages />
      </CartProvider>
    </div>
  )

}

export default App
