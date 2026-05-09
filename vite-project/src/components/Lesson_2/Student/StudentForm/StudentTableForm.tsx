import React, { useState, useMemo } from "react";
import type { ManageStudent } from "../../../Lesson_1/StudentManagement";
import { getAcademicLevel, getLevelColor } from "../../../Lesson_1/index"; // Điều chỉnh lại đường dẫn import nếu cần

interface StudentTableFormProps {
  students: ManageStudent[];
  onDelete: (id: number) => void;
  onUpdate: (student: ManageStudent) => void;
}

const StudentTableForm: React.FC<StudentTableFormProps> = ({ students, onDelete, onUpdate }) => {
  const [search, setSearch] = useState("");
  const [editingStudent, setEditingStudent] = useState<ManageStudent | null>(null);

  // Xử lý tìm kiếm
  const filteredStudents = useMemo(() => {
    return students.filter(student =>
      student.hoten.toLowerCase().includes(search.toLowerCase()) ||
      student.phuhuynh.toLowerCase().includes(search.toLowerCase()) ||
      student.sdt.includes(search)
    );
  }, [students, search]);

  // Xử lý lưu sau khi chỉnh sửa
  const handleSaveEdit = () => {
    if (!editingStudent) return;

    const updated = {
      ...editingStudent,
      hocluc: getAcademicLevel(editingStudent.diem)
    };

    onUpdate(updated); // Truyền dữ liệu đã cập nhật lên component cha
    setEditingStudent(null);
  };

  return (
    <>
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
                    <div className={`level-badge ${getLevelColor(getAcademicLevel(editingStudent.diem)).includes('#10b981') ? 'level-excellent' : ''}`} style={{backgroundColor: getLevelColor(getAcademicLevel(editingStudent.diem))}}>
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
                    <button className="btn btn-danger" onClick={() => onDelete(student.id)}>Xoá</button>
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
    </>
  );
};

export default StudentTableForm;