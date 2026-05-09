import React, { useState, useMemo } from "react";
import { getAcademicLevel, getLevelColor } from "../Lesson_1/index"; // Thay đổi đường dẫn import nếu cần thiết
import type { ManageStudent, FormError, FormField } from "./typesStudent";
import AddStudentModal from "./components/AddStudentModal";
import StudentTable from "./components/StudentTable";

const StudentManagement: React.FC = () => {
  const [students, setStudents] = useState<ManageStudent[]>([
    { id: 1, hoten: "Nguyễn Văn A", phuhuynh: "Nguyễn Minh F", sdt: "0123456789", hocluc: "Tốt", diem: 8.5 },
    { id: 2, hoten: "Lê Thị B", phuhuynh: "Lê Văn C", sdt: "0879456321", hocluc: "Trung bình", diem: 6.0 },
    { id: 3, hoten: "Trần Hạo E", phuhuynh: "Trần Minh H", sdt: "0879456123", hocluc: "Yếu", diem: 4.5 },
  ]);

  const [search, setSearch] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newStudent, setNewStudent] = useState<Omit<ManageStudent, 'id' | 'hocluc'>>({
    hoten: "", phuhuynh: "", sdt: "", diem: 0
  });

  const [editingStudent, setEditingStudent] = useState<ManageStudent | null>(null);
  const [errors, setErrors] = useState<FormError>({});

  const formFields: FormField[] = [
    { key: "hoten", type: "text", placeholder: "Họ và tên học viên *" },
    { key: "phuhuynh", type: "text", placeholder: "Tên phụ huynh" },
    { key: "sdt", type: "text", placeholder: "Số điện thoại" },
    { key: "diem", type: "number", placeholder: "Điểm trung bình (0-10) *", step: "0.1", min: "0", max: "10" }
  ];

  const handleValidate = () => {
    const newErrors: FormError = {};

    if (!newStudent.hoten.trim()) {
      newErrors.hoten = "Họ và tên học viên không được để trống";
    }

    if (!newStudent.phuhuynh.trim()) {
      newErrors.phuhuynh = "Tên phụ huynh không được để trống";
    }

    if (newStudent.diem <= 0 || newStudent.diem > 10) {
      newErrors.diem = "Điểm phải từ 0 đến 10";
    }

    if (!/^\d{10}$/.test(newStudent.sdt)) {
      newErrors.sdt = "Số điện thoại phải có 10 chữ số";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const filteredStudents = useMemo(() => {
    return students.filter(student =>
      student.hoten.toLowerCase().includes(search.toLowerCase()) ||
      student.phuhuynh.toLowerCase().includes(search.toLowerCase()) ||
      student.sdt.includes(search)
    );
  }, [students, search]);

  const handleAddStudent = () => {
    if (!handleValidate()) return;

    const academicLevel = getAcademicLevel(newStudent.diem);
    const student: ManageStudent = {
      id: Date.now(),
      ...newStudent,
      hocluc: academicLevel
    };

    setStudents([...students, student]);
    setNewStudent({ hoten: "", phuhuynh: "", sdt: "", diem: 0 });
    setIsAddModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Xác nhận xoá học viên này?")) {
      setStudents(students.filter(s => s.id !== id));
    }
  };

  const handleSaveEdit = () => {
    if (!editingStudent) return;

    const updated = {
      ...editingStudent,
      hocluc: getAcademicLevel(editingStudent.diem)
    };

    setStudents(students.map(s => s.id === updated.id ? updated : s));
    setEditingStudent(null);
  };

  return (
    <div className="student-management-container">
      <div className="management-header">
        <div className="left">
          <h1>Quản lý Học viên</h1>
          <h2>Thông tin chi tiết và theo dõi học tập</h2>
        </div>
        <button className="btn btn-primary" onClick={() => setIsAddModalOpen(true)}>
          + Thêm học viên mới
        </button>
      </div>

      {/* Search */}
      <div className="controls">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên học viên, phụ huynh hoặc SĐT..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Table */}
      <StudentTable
        filteredStudents={filteredStudents}
        editingStudent={editingStudent}
        setEditingStudent={setEditingStudent}
        formFields={formFields}
        handleSaveEdit={handleSaveEdit}
        handleDelete={handleDelete}
        getAcademicLevel={getAcademicLevel}
        getLevelColor={getLevelColor}
      />

      {filteredStudents.length === 0 && (
        <p style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
          Không tìm thấy học viên nào
        </p>
      )}

      {/* Add Modal */}
      <AddStudentModal
        isAddModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
        newStudent={newStudent}
        setNewStudent={setNewStudent}
        errors={errors}
        setErrors={setErrors}
        formFields={formFields}
        handleAddStudent={handleAddStudent}
        getAcademicLevel={getAcademicLevel}
        getLevelColor={getLevelColor}
      />
    </div>
  );
};

export default StudentManagement;