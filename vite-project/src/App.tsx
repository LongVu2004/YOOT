// import { useState } from 'react'
// import ToggleButton from './components/Lesson_1/ToggleButton'
// import InputPreview from './components/Lesson_1/InputPreview';
// import UsersList from './components/Lesson_1/UsersList';
// import UsersWithMapAndFilter from './components/Lesson_1/UsersWithMapAndFilter';

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import AdminLayout from "./layouts/AdminLayout"
import CourseManagement from "./components/Lesson_1/CourseManagement"
import StudentManagement from "./components/Lesson_1/StudentManagement"
import CourseTailwind from "./components/Lesson_1/TailwindCSS/Course/CourseManagement"
import StudentTailwind from "./components/Lesson_1/TailwindCSS/Student/StudentManagement"


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
            
            <Route index element={<Navigate to="/courses" replace />} />
            <Route path="courses" element={<CourseManagement />} />
            <Route path="students" element={<StudentManagement />} />
            
            <Route index element={<Navigate to="/students-tailwind" replace />} />
            <Route path="students-tailwind" element={<StudentTailwind />} />
            <Route path="courses-tailwind" element={<CourseTailwind />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )

}

export default App
