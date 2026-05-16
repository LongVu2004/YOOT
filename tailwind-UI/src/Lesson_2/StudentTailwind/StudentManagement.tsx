import React, { useState, useMemo } from "react";
import { getAcademicLevel, getLevelColor } from "../../../../vite-project/src/components/Lesson_1/index";

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
  // start with no mock data — real data can be loaded or added via the UI
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
    if (!newStudent.hoten.trim()) {
      newErrors.hoten = "Họ và tên học viên không được để trống";
    }
    if(!newStudent.phuhuynh.trim()) {
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
  }

  const filteredStudents = useMemo(() => {
    return students.filter(student =>
      student.hoten.toLowerCase().includes(search.toLowerCase()) ||
      student.phuhuynh.toLowerCase().includes(search.toLowerCase()) ||
      student.sdt.includes(search)
    );
  }, [students, search]);

  const handleAddStudent = () => {
    if (!HandleValidate()) return;
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
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Quản lý Học viên</h1>
          <p className="text-sm text-gray-500">Thông tin chi tiết và theo dõi học tập</p>
        </div>
        <button
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:from-blue-700 hover:to-blue-600 transform hover:-translate-y-0.5 transition duration-150 ease-out focus:outline-none focus:ring-4 focus:ring-blue-200"
          onClick={() => setIsAddModalOpen(true)}
        >
          + Thêm học viên mới
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên học viên, phụ huynh hoặc SĐT..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-4 py-3 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
        />
      </div>

      {students.length === 0 ? (
        <div className="bg-white shadow-lg rounded-xl p-10 text-center border border-gray-100">
          
          <p className="text-xl font-semibold mb-2">Chưa có học viên nào trong danh sách</p>
          <p className="text-sm text-gray-500 mb-6">Thêm học viên để bắt đầu lưu trữ và quản lý thông tin.</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-100">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Học viên</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phụ huynh</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Số điện thoại</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Điểm</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Học lực</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Thao tác</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td className="px-6 py-10 text-center text-gray-500" colSpan={6}>Không tìm thấy học viên phù hợp</td>
                </tr>
              ) : (
                filteredStudents.map(student => (
                  <tr key={student.id} className="group hover:bg-gray-50 transition-colors duration-150">
                    {editingStudent?.id === student.id ? (
                      <>
                        <td className="px-6 py-4"><input className="w-full border rounded-md px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-200 transition" value={editingStudent.hoten} onChange={e => setEditingStudent({...editingStudent, hoten: e.target.value})} /></td>
                        <td className="px-6 py-4"><input className="w-full border rounded-md px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-200 transition" value={editingStudent.phuhuynh} onChange={e => setEditingStudent({...editingStudent, phuhuynh: e.target.value})} /></td>
                        <td className="px-6 py-4"><input className="w-full border rounded-md px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-200 transition" value={editingStudent.sdt} onChange={e => setEditingStudent({...editingStudent, sdt: e.target.value})} /></td>
                        <td className="px-6 py-4"><input type="number" step="0.1" className="w-24 border rounded-md px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-200 transition" value={editingStudent.diem} onChange={e => setEditingStudent({...editingStudent, diem: parseFloat(e.target.value)||0})} /></td>
                        <td className="px-6 py-4">
                          <div className="inline-block text-white text-xs px-3 py-1 rounded-full shadow-sm font-medium" style={{backgroundColor: getLevelColor(getAcademicLevel(editingStudent.diem))}}>
                            {getAcademicLevel(editingStudent.diem)}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <button className="bg-green-600 text-white px-3 py-1 rounded-md mr-2 shadow-sm hover:shadow-md transform active:scale-95 transition" onClick={handleSaveEdit}>Lưu</button>
                          <button className="border border-gray-200 px-3 py-1 rounded-md shadow-sm hover:shadow-md transition" onClick={() => setEditingStudent(null)}>Hủy</button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-6 py-4"><div className="font-medium text-gray-800">{student.hoten}</div></td>
                        <td className="px-6 py-4 text-gray-600">{student.phuhuynh}</td>
                        <td className="px-6 py-4 text-gray-600">{student.sdt}</td>
                        <td className="px-6 py-4"><div className="font-semibold text-gray-800">{student.diem}</div></td>
                        <td className="px-6 py-4">
                          <div className="inline-block text-white text-xs px-3 py-1 rounded-full shadow-sm font-medium" style={{backgroundColor: getLevelColor(student.hocluc)}}>
                            {student.hocluc}
                          </div>
                        </td>
                        <td className="px-6 py-4 flex items-center gap-2">
                          <button className="border border-gray-200 px-3 py-1 rounded-md hover:shadow hover:border-gray-300 transition" onClick={() => setEditingStudent(student)}>Sửa</button>
                          <button className="bg-red-600 text-white px-3 py-1 rounded-md hover:shadow-md transform active:scale-95 transition" onClick={() => handleDelete(student.id)}>Xoá</button>
                        </td>
                      </>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {isAddModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          onClick={() => { setIsAddModalOpen(false); setErrors({}); }}
        >
          <div
            className="w-full max-w-md p-6 rounded-xl shadow-lg border border-white/20 bg-white/30 backdrop-blur-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Thêm học viên mới</h3>
              <button className="text-gray-600 hover:text-gray-800" onClick={() => { setIsAddModalOpen(false); setErrors({}); }}>✕</button>
            </div>
            <div className="space-y-3">
              <div>
                <input
                  className={`w-full border rounded-md px-3 py-2 shadow-sm ${errors.hoten ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-blue-200 transition`}
                  placeholder="Họ và tên học viên *"
                  value={newStudent.hoten}
                  onChange={e => setNewStudent({...newStudent, hoten: e.target.value})}
                />
                {errors.hoten && <p className="text-red-500 text-sm mt-1">{errors.hoten}</p>}
              </div>
              <div>
                <input
                  className={`w-full border rounded-md px-3 py-2 shadow-sm ${errors.phuhuynh ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-blue-200 transition`}
                  placeholder="Tên phụ huynh"
                  value={newStudent.phuhuynh}
                  onChange={e => setNewStudent({...newStudent, phuhuynh: e.target.value})}
                />
                {errors.phuhuynh && <p className="text-red-500 text-sm mt-1">{errors.phuhuynh}</p>}
              </div>
              <div>
                <input
                  className={`w-full border rounded-md px-3 py-2 shadow-sm ${errors.sdt ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-blue-200 transition`}
                  placeholder="Số điện thoại"
                  value={newStudent.sdt}
                  onChange={e => setNewStudent({...newStudent, sdt: e.target.value})}
                />
                {errors.sdt && <p className="text-red-500 text-sm mt-1">{errors.sdt}</p>}
              </div>
              <div>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  className={`w-full border rounded-md px-3 py-2 shadow-sm ${errors.diem ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-blue-200 transition`}
                  placeholder="Điểm trung bình (0-10) *"
                  value={newStudent.diem}
                  onChange={e => setNewStudent({...newStudent, diem: parseFloat(e.target.value)||0})}
                />
                {errors.diem && <p className="text-red-500 text-sm mt-1">{errors.diem}</p>}
              </div>

              {newStudent.diem > 0 && (
                <div className="inline-block text-white text-sm px-2 py-1 rounded-full shadow-sm" style={{ backgroundColor: getLevelColor(getAcademicLevel(newStudent.diem)) }}>
                  Học lực: {getAcademicLevel(newStudent.diem)}
                </div>
              )}

              <button className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:from-blue-700 hover:to-blue-600 transition" onClick={handleAddStudent}>
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


