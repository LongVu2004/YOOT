import React, { useState } from "react";
import { getAcademicLevel, getLevelColor } from "../../../Lesson_1/index"; // Điều chỉnh lại đường dẫn import nếu cần
import StudentTableForm from "../../Student/StudentForm/StudentTableForm";

export type ManageStudent = {
  id: number;
  hoten: string;
  phuhuynh: string;
  sdt: string;
  hocluc: string;
  diem: number;
};

type FormError = {
  [key: string]: string;
};

const StudentForm: React.FC = () => {
  const [students, setStudents] = useState<ManageStudent[]>([
    { id: 1, hoten: "Nguyễn Văn A", phuhuynh: "Nguyễn Minh F", sdt: "0123456789", hocluc: "Tốt", diem: 8.5 },
    { id: 2, hoten: "Lê Thị B", phuhuynh: "Lê Văn C", sdt: "0879456321", hocluc: "Trung bình", diem: 6.0 },
    { id: 3, hoten: "Trần Hạo E", phuhuynh: "Trần Minh H", sdt: "0879456123", hocluc: "Yếu", diem: 4.5 },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newStudent, setNewStudent] = useState<Omit<ManageStudent, 'id' | 'hocluc'>>({
    hoten: "", phuhuynh: "", sdt: "", diem: 0
  });
  const [errors, setErrors] = useState<FormError>({});

  // Validate form thêm mới
  const handleValidate = () => {
    const newErrors: FormError = {};
    
    if (!newStudent.hoten.trim()) newErrors.hoten = "Họ và tên học viên không được để trống";
    if (!newStudent.phuhuynh.trim()) newErrors.phuhuynh = "Tên phụ huynh không được để trống";
    if (newStudent.diem <= 0 || newStudent.diem > 10) newErrors.diem = "Điểm phải từ 0 đến 10";
    if (!/^\d{10}$/.test(newStudent.sdt)) newErrors.sdt = "Số điện thoại phải có 10 chữ số";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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

  const handleDeleteStudent = (id: number) => {
    if (window.confirm("Xác nhận xoá học viên này?")) {
      setStudents(students.filter(s => s.id !== id));
    }
  };

  const handleUpdateStudent = (updatedStudent: ManageStudent) => {
    setStudents(students.map(s => s.id === updatedStudent.id ? updatedStudent : s));
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

      {/* Gọi Component Table và truyền props */}
      <StudentTableForm 
        students={students} 
        onDelete={handleDeleteStudent} 
        onUpdate={handleUpdateStudent} 
      />

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Thêm học viên mới</h3>
              <button className="btn btn-outline" onClick={() => {
                setIsAddModalOpen(false);
                setErrors({});
              }}>✕</button>
            </div>
            <div className="modal-body">
              <div>
                <input
                  className={`form-input ${errors.hoten ? 'input-error' : ''}`}
                  placeholder="Họ và tên học viên *"
                  value={newStudent.hoten}
                  onChange={e => setNewStudent({...newStudent, hoten: e.target.value})}
                />
                {errors.hoten && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{errors.hoten}</p>}
              </div>
              
              <div>
                <input
                  className={`form-input ${errors.phuhuynh ? 'input-error' : ''}`}
                  placeholder="Tên phụ huynh"
                  value={newStudent.phuhuynh}
                  onChange={e => setNewStudent({...newStudent, phuhuynh: e.target.value})}
                />
                {errors.phuhuynh && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{errors.phuhuynh}</p>}
              </div>
              <div>
                <input
                  className={`form-input ${errors.sdt ? 'input-error' : ''}`}
                  placeholder="Số điện thoại"
                  value={newStudent.sdt}
                  onChange={e => setNewStudent({...newStudent, sdt: e.target.value})}
                />
                {errors.sdt && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{errors.sdt}</p>}
              </div>
              
              <div>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  className={`form-input ${errors.diem ? 'input-error' : ''}`}
                  placeholder="Điểm trung bình (0-10) *"
                  value={newStudent.diem}
                  onChange={e => setNewStudent({...newStudent, diem: parseFloat(e.target.value)||0})}
                />
                {errors.diem && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{errors.diem}</p>}
              </div>

              {newStudent.diem > 0 && (
                <div className="level-badge" style={{ 
                  backgroundColor: getLevelColor(getAcademicLevel(newStudent.diem)),
                  width: 'fit-content',
                  margin: '12px 0'
                }}>
                  Học lực: {getAcademicLevel(newStudent.diem)}
                </div>
              )}

              <button className="btn btn-primary" style={{width: '100%', padding: '14px'}} onClick={handleAddStudent}>
                Thêm học viên
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentForm;