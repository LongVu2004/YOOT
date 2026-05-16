import React, { useState, useMemo } from "react";
import { getAcademicLevel, getLevelColor } from "../../index";

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

const StudentManagement: React.FC = () => {
  const [students, setStudents] = useState<ManageStudent[]>([]);

  const [search, setSearch] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newStudent, setNewStudent] = useState<Omit<ManageStudent, 'id' | 'hocluc'>>({
    hoten: "", phuhuynh: "", sdt: "", diem: 0
  });

  const [editingStudent, setEditingStudent] = useState<ManageStudent | null>(null);
  const [errors, setErrors] = useState<FormError>({});

  const HandleValidate = () => {
    const newErrors: FormError = {};
    
    if (!newStudent.hoten.trim()) newErrors.hoten = "Họ và tên không được để trống";
    if (!newStudent.phuhuynh.trim()) newErrors.phuhuynh = "Phụ huynh không được để trống";
    if (newStudent.diem <= 0 || newStudent.diem > 10) newErrors.diem = "Điểm 0-10";
    if (!/^\d{10}$/.test(newStudent.sdt)) newErrors.sdt = "SĐT 10 số";

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
    if (!HandleValidate()) return;

    const student: ManageStudent = {
      id: Date.now(),
      ...newStudent,
      hocluc: getAcademicLevel(newStudent.diem)
    };

    setStudents([...students, student]);
    setNewStudent({ hoten: "", phuhuynh: "", sdt: "", diem: 0 });
    setIsAddModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Xác nhận xoá?")) {
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
    <div className="p-6 max-w-7xl mx-auto bg-slate-50 min-h-screen">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Quản lý học viên</h1>
          <p className="text-slate-500 text-sm">Thông tin chi tiết và theo dõi học tập</p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold"
        >
          + Thêm học viên
        </button>
      </div>

      {/* Search */}
      <input
        className="w-full md:w-[1000px] p-3 border rounded-lg mb-6 focus:ring-2 focus:ring-blue-400 outline-none"
        placeholder="Tìm kiếm..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100 text-sm text-slate-600">
            <tr>
              <th className="p-4 text-left">Học viên</th>
              <th className="p-4 text-left">Phụ huynh</th>
              <th className="p-4 text-left">SĐT</th>
              <th className="p-4 text-left">Điểm</th>
              <th className="p-4 text-left">Học lực</th>
              <th className="p-4 text-left">Thao tác</th>
            </tr>
          </thead>

          <tbody>
            {filteredStudents.map(student => (
              <tr key={student.id} className="border-t hover:bg-slate-50">
                {editingStudent?.id === student.id ? (
                  <>
                    <td><input className="input" value={editingStudent.hoten} onChange={e => setEditingStudent({...editingStudent, hoten: e.target.value})} /></td>
                    <td><input className="input" value={editingStudent.phuhuynh} onChange={e => setEditingStudent({...editingStudent, phuhuynh: e.target.value})} /></td>
                    <td><input className="input" value={editingStudent.sdt} onChange={e => setEditingStudent({...editingStudent, sdt: e.target.value})} /></td>
                    <td><input type="number" className="input" value={editingStudent.diem} onChange={e => setEditingStudent({...editingStudent, diem: parseFloat(e.target.value)||0})} /></td>
                    <td>
                      <span
                        className="px-3 py-1 rounded-full text-white text-sm"
                        style={{ backgroundColor: getLevelColor(getAcademicLevel(editingStudent.diem)) }}
                      >
                        {getAcademicLevel(editingStudent.diem)}
                      </span>
                    </td>
                    <td>
                      <button className="btn-green mr-2" onClick={handleSaveEdit}>Lưu</button>
                      <button className="btn-gray" onClick={() => setEditingStudent(null)}>Hủy</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="p-4 font-semibold">{student.hoten}</td>
                    <td className="p-4">{student.phuhuynh}</td>
                    <td className="p-4">{student.sdt}</td>
                    <td className="p-4 font-semibold">{student.diem}</td>
                    <td className="p-4">
                      <span
                        className="px-3 py-1 rounded-full text-white text-sm"
                        style={{ backgroundColor: getLevelColor(student.hocluc) }}
                      >
                        {student.hocluc}
                      </span>
                    </td>
                    <td className="p-4">
                      <button className="btn-gray mr-2" onClick={() => setEditingStudent(student)}>Sửa</button>
                      <button className="btn-red" onClick={() => handleDelete(student.id)}>Xoá</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredStudents.length === 0 && (
        <p className="text-center py-10 text-slate-500">Không có dữ liệu</p>
      )}

      {/* Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">
            
            <div className="flex justify-between mb-4">
              <h3 className="text-lg font-semibold">Thêm học viên</h3>
              <button onClick={() => setIsAddModalOpen(false)}>✕</button>
            </div>

            <input className="input" placeholder="Họ tên" value={newStudent.hoten}
              onChange={e => setNewStudent({...newStudent, hoten: e.target.value})} />
            {errors.hoten && <p className="text-red-500 text-sm">{errors.hoten}</p>}

            <input className="input" placeholder="Phụ huynh" value={newStudent.phuhuynh}
              onChange={e => setNewStudent({...newStudent, phuhuynh: e.target.value})} />

            <input className="input" placeholder="SĐT" value={newStudent.sdt}
              onChange={e => setNewStudent({...newStudent, sdt: e.target.value})} />

            <input type="number" className="input" placeholder="Điểm"
              value={newStudent.diem}
              onChange={e => setNewStudent({...newStudent, diem: parseFloat(e.target.value)||0})} />

            <button
              onClick={handleAddStudent}
              className="w-full bg-blue-500 text-white py-3 rounded-lg mt-4"
            >
              Thêm
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentManagement;