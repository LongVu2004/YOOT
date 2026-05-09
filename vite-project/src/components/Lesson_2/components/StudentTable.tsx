import React from "react";
import type { ManageStudent, FormField } from "../typesStudent";

interface StudentTableProps {
  filteredStudents: ManageStudent[];
  editingStudent: ManageStudent | null;
  setEditingStudent: React.Dispatch<React.SetStateAction<ManageStudent | null>>;
  formFields: FormField[];
  handleSaveEdit: () => void;
  handleDelete: (id: number) => void;
  getAcademicLevel: (diem: number) => string;
  getLevelColor: (hocluc: string) => string;
}

const StudentTable: React.FC<StudentTableProps> = ({
  filteredStudents,
  editingStudent,
  setEditingStudent,
  formFields,
  handleSaveEdit,
  handleDelete,
  getAcademicLevel,
  getLevelColor,
}) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string,
    type: string
  ) => {
    if (!editingStudent) return;
    let value: string | number = e.target.value;
    if (type === "number") {
      value = parseFloat(value) || 0;
    }
    setEditingStudent({ ...editingStudent, [key]: value });
  };

  return (
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
        {filteredStudents.map((student) => (
          <tr key={student.id} className="student-row">
            {editingStudent?.id === student.id ? (
              <>
                {formFields.map((field) => (
                  <td key={field.key.toString()}>
                    <input
                      type={field.type}
                      step={field.step}
                      min={field.min}
                      max={field.max}
                      className="form-input"
                      value={editingStudent[field.key]}
                      onChange={(e) => handleInputChange(e, field.key, field.type)}
                    />
                  </td>
                ))}
                <td>
                  <div
                    className="level-badge"
                    style={{
                      backgroundColor: getLevelColor(
                        getAcademicLevel(editingStudent.diem)
                      ),
                    }}
                  >
                    {getAcademicLevel(editingStudent.diem)}
                  </div>
                </td>
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
                    onClick={() => setEditingStudent(null)}
                  >
                    Hủy
                  </button>
                </td>
              </>
            ) : (
              <>
                <td>
                  <strong>{student.hoten}</strong>
                </td>
                <td>{student.phuhuynh}</td>
                <td>{student.sdt}</td>
                <td>
                  <strong>{student.diem}</strong>
                </td>
                <td>
                  <div
                    className="level-badge"
                    style={{ backgroundColor: getLevelColor(student.hocluc) }}
                  >
                    {student.hocluc}
                  </div>
                </td>
                <td>
                  <button
                    className="btn btn-outline"
                    onClick={() => setEditingStudent(student)}
                    style={{ marginRight: "8px" }}
                  >
                    Sửa
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(student.id)}
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

export default StudentTable;