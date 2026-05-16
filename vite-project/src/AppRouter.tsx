import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import AdminLayout from "./layouts/AdminLayout"
import CourseManagement from "./components/Lesson_1/CourseManagement";
import StudentManagement from "./components/Lesson_1/StudentManagement";
import CourseTailwind from "./components/Lesson_1/TailwindCSS/Course/CourseManagement";
import StudentTailwind from "./components/Lesson_1/TailwindCSS/Student/StudentManagement";
import CourseManagementAntd from "./components/Lesson_1/Antd/Course/CourseManagementAntd";
import StudentManagementAntd from "./components/Lesson_1/Antd/Student/StudentManagementAntd";

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
          </Route>
        </Routes>
      </BrowserRouter>
    );
};

export default AppRouter;