import React from "react";
import type { Course, FormField } from "../typesCourse";

interface CourseTableProps {
  filteredCourses: Course[];
  editingCourse: Course | null;
  setEditingCourse: React.Dispatch<React.SetStateAction<Course | null>>;
  formFields: FormField[];
  handleSaveEdit: () => void;
  handleDelete: (id: number) => void;
}

const CourseTable: React.FC<CourseTableProps> = ({
  filteredCourses,
  editingCourse,
  setEditingCourse,
  formFields,
  handleSaveEdit,
  handleDelete,
}) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string,
    type: string
  ) => {
    if (!editingCourse) return;
    let value: string | number = e.target.value;
    if (type === "number") {
      value = value === "" ? "" : parseInt(value) || 0;
    }
    setEditingCourse({ ...editingCourse, [key]: value });
  };

  return (
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
                {formFields.map((field) => (
                  <td key={field.key.toString()}>
                    <input
                      type={field.type}
                      min={field.min}
                      className="form-input"
                      value={editingCourse[field.key]}
                      onChange={(e) => handleInputChange(e, field.key, field.type)}
                    />
                  </td>
                ))}
                <td>
                  <button
                    className="btn btn-success"
                    onClick={handleSaveEdit}
                    style={{ marginRight: "8px" }}
                  >
                    Lưu
                  </button>
                  <button
                    className="btn btn-outline"
                    onClick={() => setEditingCourse(null)}
                  >
                    Hủy
                  </button>
                </td>
              </>
            ) : (
              <>
                <td>
                  <strong>{course.name}</strong>
                </td>
                <td>{course.description}</td>
                <td>{course.duration}</td>
                <td>
                  <strong>{course.students}</strong>
                </td>
                <td>
                  <button
                    className="btn btn-outline"
                    onClick={() => setEditingCourse(course)}
                    style={{ marginRight: "8px" }}
                  >
                    Sửa
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(course.id)}
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
  );
};

export default CourseTable;