import React, { useState, useMemo } from "react";
import { getAcademicLevel, getLevelColor } from "./index";

type ManageStudent = {
  id: number;
  hoten: string;
  phuhuynh: string;
  sdt: string;
  hocluc: string;
  diem: number;
};

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

  const filteredStudents = useMemo(() => {
    return students.filter(student =>
      student.hoten.toLowerCase().includes(search.toLowerCase()) ||
      student.phuhuynh.toLowerCase().includes(search.toLowerCase()) ||
      student.sdt.includes(search)
    );
  }, [students, search]);

  const handleAddStudent = () => {
    if (!newStudent.hoten.trim()) return;

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
      <table className="student-table">
        <thead>
          <tr>
            <th>Học viên</th>
            <th>Phụ huynh</th>
            <th>Số điện thoại</th>
            <th>Điểm</th>
            <th>Học lực</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map(student => (
            <tr key={student.id} className="student-row">
              {editingStudent?.id === student.id ? (
                <>
                  <td><input className="form-input" value={editingStudent.hoten} onChange={e => setEditingStudent({...editingStudent, hoten: e.target.value})} /></td>
                  <td><input className="form-input" value={editingStudent.phuhuynh} onChange={e => setEditingStudent({...editingStudent, phuhuynh: e.target.value})} /></td>
                  <td><input className="form-input" value={editingStudent.sdt} onChange={e => setEditingStudent({...editingStudent, sdt: e.target.value})} /></td>
                  <td><input type="number" step="0.1" className="form-input" value={editingStudent.diem} onChange={e => setEditingStudent({...editingStudent, diem: parseFloat(e.target.value)||0})} /></td>
                  <td>
                    <div className={`level-badge ${getLevelColor(editingStudent.hocluc).includes('#10b981') ? 'level-excellent' : ''}`} style={{backgroundColor: getLevelColor(getAcademicLevel(editingStudent.diem))}}>
                      {getAcademicLevel(editingStudent.diem)}
                    </div>
                  </td>
                  <td>
                    <button className="btn btn-success" onClick={handleSaveEdit} style={{marginRight: '8px'}}>Lưu</button>
                    <button className="btn btn-outline" onClick={() => setEditingStudent(null)}>Hủy</button>
                  </td>
                </>
              ) : (
                <>
                  <td><strong>{student.hoten}</strong></td>
                  <td>{student.phuhuynh}</td>
                  <td>{student.sdt}</td>
                  <td><strong>{student.diem}</strong></td>
                  <td>
                    <div className="level-badge" style={{ backgroundColor: getLevelColor(student.hocluc) }}>
                      {student.hocluc}
                    </div>
                  </td>
                  <td>
                    <button className="btn btn-outline" onClick={() => setEditingStudent(student)} style={{marginRight: '8px'}}>Sửa</button>
                    <button className="btn btn-danger" onClick={() => handleDelete(student.id)}>Xoá</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {filteredStudents.length === 0 && (
        <p style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
          Không tìm thấy học viên nào
        </p>
      )}

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Thêm học viên mới</h3>
              <button className="btn btn-outline" onClick={() => setIsAddModalOpen(false)}>✕</button>
            </div>
            <div className="modal-body">
              <input
                className="form-input"
                placeholder="Họ và tên học viên *"
                value={newStudent.hoten}
                onChange={e => setNewStudent({...newStudent, hoten: e.target.value})}
              />
              <input
                className="form-input"
                placeholder="Tên phụ huynh"
                value={newStudent.phuhuynh}
                onChange={e => setNewStudent({...newStudent, phuhuynh: e.target.value})}
              />
              <input
                className="form-input"
                placeholder="Số điện thoại"
                value={newStudent.sdt}
                onChange={e => setNewStudent({...newStudent, sdt: e.target.value})}
              />
              <input
                type="number"
                step="0.1"
                min="0"
                max="10"
                className="form-input"
                placeholder="Điểm trung bình (0-10) *"
                value={newStudent.diem}
                onChange={e => setNewStudent({...newStudent, diem: parseFloat(e.target.value)||0})}
              />

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

export default StudentManagement;