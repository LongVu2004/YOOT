import React, { useState, useMemo } from "react";
import type { Course, FormError, FormField } from "./typesCourse";
import AddCourseModal from "./components/AddCourseModal";
import CourseTable from "./components/CourseTable";

const CourseManagement: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([
    {
      id: 1,
      name: "React Cơ bản",
      description: "Khóa học React cho người mới bắt đầu",
      duration: "3 tháng",
      students: 45,
    },
    {
      id: 2,
      name: "JavaScript Advanced",
      description: "JavaScript nâng cao và ES6+",
      duration: "2 tháng",
      students: 32,
    },
    {
      id: 3,
      name: "HTML/CSS",
      description: "Nền tảng web development",
      duration: "2 tháng",
      students: 58,
    },
    {
      id: 4,
      name: "TypeScript",
      description: "TypeScript từ cơ bản đến nâng cao",
      duration: "2 tháng",
      students: 28,
    },
  ]);

  const [search, setSearch] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCourse, setNewCourse] = useState<Omit<Course, "id">>({
    name: "",
    description: "",
    duration: "",
    students: "",
  });

  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [errors, setErrors] = useState<FormError>({});

  const formFields: FormField[] = [
    { key: "name", type: "text", placeholder: "Tên khóa học" },
    { key: "description", type: "text", placeholder: "Mô tả khóa học" },
    { key: "duration", type: "text", placeholder: "Thời lượng (vd: 2 tháng)" },
    { key: "students", type: "number", placeholder: "Số học viên", min: "0" },
  ];

  const filteredCourses = useMemo(() => {
    return courses.filter(
      (c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.description.toLowerCase().includes(search.toLowerCase())
    );
  }, [courses, search]);

  const handleValidate = () => {
    const NewError: FormError = {};

    if (!newCourse.name.trim()) {
      NewError.name = "Tên khóa học không được để trống";
    }

    if (!newCourse.description.trim()) {
      NewError.description = "Mô tả khóa học không được để trống";
    }

    if (!newCourse.duration.trim()) {
      NewError.duration = "Thời lượng khóa học không được để trống";
    }

    if (newCourse.students === "") {
      NewError.students = "Số học viên không được để trống";
    } else if (parseInt(newCourse.students as string) <= 0) {
      NewError.students = "Số học viên là một số lớn hơn 0";
    }

    setErrors(NewError);
    return Object.keys(NewError).length === 0;
  };

  const handleAddCourse = () => {
    if (!handleValidate()) return;

    const course: Course = {
      id: Date.now(),
      ...newCourse,
    };

    setCourses([...courses, course]);
    setNewCourse({ name: "", description: "", duration: "", students: "" });
    setIsAddModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Xác nhận xoá khóa học này?")) {
      setCourses(courses.filter((c) => c.id !== id));
    }
  };

  const handleSaveEdit = () => {
    if (!editingCourse) return;

    setCourses(
      courses.map((c) => (c.id === editingCourse.id ? editingCourse : c))
    );
    setEditingCourse(null);
  };

  return (
    <div className="course-management-container">
      <div className="management-header">
        <div className="left">
          <h1>Quản lý Khóa đào tạo</h1>
          <h2>Danh sách các khóa học</h2>
        </div>
        <button className="btn btn-primary" onClick={() => setIsAddModalOpen(true)}>
          + Thêm khóa học
        </button>
      </div>

      {/* Search */}
      <div className="controls">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên khóa học hoặc mô tả..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Table */}
      <CourseTable
        filteredCourses={filteredCourses}
        editingCourse={editingCourse}
        setEditingCourse={setEditingCourse}
        formFields={formFields}
        handleSaveEdit={handleSaveEdit}
        handleDelete={handleDelete}
      />

      {filteredCourses.length === 0 && (
        <p style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
          Không tìm thấy khóa học nào
        </p>
      )}

      {/* Add Modal */}
      <AddCourseModal
        isAddModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
        newCourse={newCourse}
        setNewCourse={setNewCourse}
        errors={errors}
        setErrors={setErrors}
        formFields={formFields}
        handleAddCourse={handleAddCourse}
      />
    </div>
  );
};

export default CourseManagement;