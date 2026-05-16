import React, { useState, useMemo } from "react";

type Course = {
  id: number;
  name: string;
  description: string;
  duration: string;
  students: number | string;
};

type FormError = {
  [key: string]: string;
};

const CourseManagement: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);

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

  const filteredCourses = useMemo(() => {
    return courses.filter(
      (c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.description.toLowerCase().includes(search.toLowerCase())
    );
  }, [courses, search]);

  const handleValidate = () => {
    const NewError: FormError = {};

    if (!newCourse.name.trim()) NewError.name = "Không được để trống";
    if (!newCourse.description.trim()) NewError.description = "Không được để trống";
    if (!newCourse.duration.trim()) NewError.duration = "Không được để trống";

    if (newCourse.students === "" || Number(newCourse.students) <= 0) {
      NewError.students = "Phải > 0";
    }

    setErrors(NewError);
    return Object.keys(NewError).length === 0;
  };

  const handleAddCourse = () => {
    if (!handleValidate()) return;

    setCourses([
      ...courses,
      { id: Date.now(), ...newCourse },
    ]);

    setNewCourse({ name: "", description: "", duration: "", students: "" });
    setIsAddModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if (confirm("Xoá?")) {
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
    <div className="p-6 max-w-6xl mx-auto bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Quản lý Khóa đào tạo
          </h1>
          <p className="text-sm text-slate-500">
            Danh sách khóa đào tạo
          </p>
        </div>

        <button onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold">+ Thêm khóa học
        </button>
        
      </div>

      {/* Search */}
      <input
        className="w-full mb-4 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
        placeholder="Tìm kiếm..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Table */}
      <div className="overflow-hidden rounded-xl shadow bg-white">
        <table className="w-full">
          <thead className="bg-slate-100 text-left text-sm text-slate-600">
            <tr>
              <th className="p-4">Tên</th>
              <th className="p-4">Mô tả</th>
              <th className="p-4">Thời lượng</th>
              <th className="p-4">Học viên</th>
              <th className="p-4">Hành động</th>
            </tr>
          </thead>

          <tbody>
            {filteredCourses.map((course) => (
              <tr key={course.id} className="border-t hover:bg-slate-50">
                {editingCourse?.id === course.id ? (
                  <>
                    <td className="p-3">
                      <input
                        className="w-full border p-2 rounded"
                        value={editingCourse.name}
                        onChange={(e) =>
                          setEditingCourse({ ...editingCourse, name: e.target.value })
                        }
                      />
                    </td>
                    <td className="p-3">
                      <input
                        className="w-full border p-2 rounded"
                        value={editingCourse.description}
                        onChange={(e) =>
                          setEditingCourse({ ...editingCourse, description: e.target.value })
                        }
                      />
                    </td>
                    <td className="p-3">
                      <input
                        className="w-full border p-2 rounded"
                        value={editingCourse.duration}
                        onChange={(e) =>
                          setEditingCourse({ ...editingCourse, duration: e.target.value })
                        }
                      />
                    </td>
                    <td className="p-3">
                      <input
                        type="number"
                        className="w-full border p-2 rounded"
                        value={editingCourse.students}
                        onChange={(e) =>
                          setEditingCourse({
                            ...editingCourse,
                            students: Number(e.target.value),
                          })
                        }
                      />
                    </td>
                    <td className="p-3 space-x-2">
                      <button
                        onClick={handleSaveEdit}
                        className="bg-green-500 text-white px-3 py-1 rounded"
                      >
                        Lưu
                      </button>
                      <button
                        onClick={() => setEditingCourse(null)}
                        className="border px-3 py-1 rounded"
                      >
                        Huỷ
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="p-4 font-semibold">{course.name}</td>
                    <td className="p-4">{course.description}</td>
                    <td className="p-4">{course.duration}</td>
                    <td className="p-4 font-bold">{course.students}</td>
                    <td className="p-4 space-x-2">
                      <button
                        onClick={() => setEditingCourse(course)}
                        className="border px-3 py-1 rounded"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDelete(course.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Xoá
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredCourses.length === 0 && (
        <p className="text-center py-10 text-slate-500">Không có dữ liệu</p>
      )}

      {/* Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">

            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Thêm khóa học</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-500 hover:text-black text-xl"
              >
                ✕
              </button>
            </div>
            <input
              className="w-full border p-2 mb-2 rounded"
              placeholder="Tên"
              value={newCourse.name}
              onChange={(e) =>
                setNewCourse({ ...newCourse, name: e.target.value })
              }
            />
            {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}

            <input
              className="w-full border p-2 mb-2 rounded"
              placeholder="Mô tả"
              value={newCourse.description}
              onChange={(e) =>
                setNewCourse({ ...newCourse, description: e.target.value })
              }
            />

            <input
              className="w-full border p-2 mb-2 rounded"
              placeholder="Thời lượng"
              value={newCourse.duration}
              onChange={(e) =>
                setNewCourse({ ...newCourse, duration: e.target.value })
              }
            />

            <input
              type="number"
              className="w-full border p-2 mb-2 rounded"
              placeholder="Số học viên"
              value={newCourse.students}
              onChange={(e) =>
                setNewCourse({
                  ...newCourse,
                  students: Number(e.target.value),
                })
              }
            />

            <button
              onClick={handleAddCourse}
              className="w-full bg-blue-500 text-white py-2 rounded mt-3"
            >
              Thêm
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseManagement;