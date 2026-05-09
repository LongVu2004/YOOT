// import { useState } from 'react'
// import ToggleButton from './components/Lesson_1/ToggleButton'
// import InputPreview from './components/Lesson_1/InputPreview';
// import UsersList from './components/Lesson_1/UsersList';
// import UsersWithMapAndFilter from './components/Lesson_1/UsersWithMapAndFilter';

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
// import CourseManagement from "./components/Lesson_1/CourseManagement"
import AdminLayout from "./layouts/AdminLayout"
// import StudentManagement from "./components/Lesson_1/StudentManagement"
// import DynamicForm from "./components/Lesson_2/pages/DynamicForm"
import StudentManagement from "./components/Lesson_2/StudentManagement"
import CourseManagement from "./components/Lesson_2/CourseManagement"


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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminLayout />}>
            
            {/* <Route index element={<Navigate to="/courses" replace />} />
            <Route path="courses" element={<CourseManagement />} />
            <Route path="students" element={<StudentManagement />} /> */}
            
            <Route index element={<Navigate to="/students" replace />} />
            <Route path="students" element={<StudentManagement />} />
            <Route path="courses" element={<CourseManagement />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )

}

export default App
