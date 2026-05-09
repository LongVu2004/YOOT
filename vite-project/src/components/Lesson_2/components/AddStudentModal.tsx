import React from "react";
import type { ManageStudent, FormError, FormField } from "../typesStudent";

interface AddStudentModalProps {
  isAddModalOpen: boolean;
  setIsAddModalOpen: (isOpen: boolean) => void;
  newStudent: Omit<ManageStudent, 'id' | 'hocluc'>;
  setNewStudent: React.Dispatch<React.SetStateAction<Omit<ManageStudent, 'id' | 'hocluc'>>>;
  errors: FormError;
  setErrors: React.Dispatch<React.SetStateAction<FormError>>;
  formFields: FormField[];
  handleAddStudent: () => void;
  getAcademicLevel: (diem: number) => string;
  getLevelColor: (hocluc: string) => string;
}

const AddStudentModal: React.FC<AddStudentModalProps> = ({
  isAddModalOpen,
  setIsAddModalOpen,
  newStudent,
  setNewStudent,
  errors,
  setErrors,
  formFields,
  handleAddStudent,
  getAcademicLevel,
  getLevelColor,
}) => {
  if (!isAddModalOpen) return null;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string,
    type: string
  ) => {
    let value: string | number = e.target.value;
    if (type === "number") {
      value = parseFloat(value) || 0;
    }
    setNewStudent({ ...newStudent, [key]: value });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="modal-title">Thêm học viên mới</h3>
          <button
            className="btn btn-outline"
            onClick={() => {
              setIsAddModalOpen(false);
              setErrors({});
            }}
          >
            ✕
          </button>
        </div>
        <div className="modal-body">
          {formFields.map((field) => (
            <div key={field.key.toString()}>
              <input
                type={field.type}
                step={field.step}
                min={field.min}
                max={field.max}
                className={`form-input ${errors[field.key] ? "input-error" : ""}`}
                placeholder={field.placeholder}
                value={newStudent[field.key] || ""}
                onChange={(e) => handleInputChange(e, field.key, field.type)}
              />
              {errors[field.key] && (
                <p style={{ color: "#ef4444", fontSize: "12px", marginTop: "4px" }}>
                  {errors[field.key]}
                </p>
              )}
            </div>
          ))}

          {newStudent.diem > 0 && (
            <div
              className="level-badge"
              style={{
                backgroundColor: getLevelColor(getAcademicLevel(newStudent.diem)),
                width: "fit-content",
                margin: "12px 0",
              }}
            >
              Học lực: {getAcademicLevel(newStudent.diem)}
            </div>
          )}

          <button
            className="btn btn-primary"
            style={{ width: "100%", padding: "14px" }}
            onClick={handleAddStudent}
          >
            Thêm học viên
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddStudentModal;