import React, { useState, useMemo } from "react";

type Course = {
  id: number;
  name: string;
  description: string;
  duration: string;
  students: number;
};

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
    students: 0,
  });

  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  const filteredCourses = useMemo(() => {
    return courses.filter(
      (c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.description.toLowerCase().includes(search.toLowerCase())
    );
  }, [courses, search]);

  const handleAddCourse = () => {
    if (!newCourse.name.trim()) return;

    const course: Course = {
      id: Date.now(),
      ...newCourse,
    };

    setCourses([...courses, course]);
    setNewCourse({ name: "", description: "", duration: "", students: 0 });
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
      <table className="course-table">
        <thead>
          <tr>
            <th>Tên khóa học</th>
            <th>Mô tả</th>
            <th>Thời lượng</th>
            <th>Số học viên</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {filteredCourses.map((course) => (
            <tr key={course.id} className="course-row">
              {editingCourse?.id === course.id ? (
                <>
                  <td><input className="form-input" value={editingCourse.name} onChange={(e) => setEditingCourse({...editingCourse, name: e.target.value})} /></td>
                  <td><input className="form-input" value={editingCourse.description} onChange={(e) => setEditingCourse({...editingCourse, description: e.target.value})} /></td>
                  <td><input className="form-input" value={editingCourse.duration} onChange={(e) => setEditingCourse({...editingCourse, duration: e.target.value})} /></td>
                  <td><input type="number" className="form-input" value={editingCourse.students} onChange={(e) => setEditingCourse({...editingCourse, students: parseInt(e.target.value) || 0})} /></td>
                  <td>
                    <button className="btn btn-success" onClick={handleSaveEdit} style={{marginRight: '8px'}}>Lưu</button>
                    <button className="btn btn-outline" onClick={() => setEditingCourse(null)}>Hủy</button>
                  </td>
                </>
              ) : (
                <>
                  <td><strong>{course.name}</strong></td>
                  <td>{course.description}</td>
                  <td>{course.duration}</td>
                  <td><strong>{course.students}</strong></td>
                  <td>
                    <button className="btn btn-outline" onClick={() => setEditingCourse(course)} style={{marginRight: '8px'}}>Sửa</button>
                    <button className="btn btn-danger" onClick={() => handleDelete(course.id)}>Xoá</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {filteredCourses.length === 0 && (
        <p style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
          Không tìm thấy khóa học nào
        </p>
      )}

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Thêm khóa học mới</h3>
              <button className="btn btn-outline" onClick={() => setIsAddModalOpen(false)}>✕</button>
            </div>
            <div className="modal-body">
              <input
                className="form-input"
                placeholder="Tên khóa học"
                value={newCourse.name}
                onChange={(e) => setNewCourse({...newCourse, name: e.target.value})}
              />
              <input
                className="form-input"
                placeholder="Mô tả khóa học"
                value={newCourse.description}
                onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
              />
              <input
                className="form-input"
                placeholder="Thời lượng (vd: 2 tháng)"
                value={newCourse.duration}
                onChange={(e) => setNewCourse({...newCourse, duration: e.target.value})}
              />
              <input
                type="number"
                min="0"
                className="form-input"
                placeholder="Số học viên"
                value={newCourse.students}
                onChange={(e) => setNewCourse({...newCourse, students: parseInt(e.target.value) || 0})}
              />

              <button className="btn btn-primary" style={{width: '100%', padding: '14px'}} onClick={handleAddCourse}>
                Thêm khóa học
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseManagement;