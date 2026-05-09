import React from "react";
import type { Course, FormError, FormField } from "../typesCourse";

interface AddCourseModalProps {
  isAddModalOpen: boolean;
  setIsAddModalOpen: (isOpen: boolean) => void;
  newCourse: Omit<Course, "id">;
  setNewCourse: React.Dispatch<React.SetStateAction<Omit<Course, "id">>>;
  errors: FormError;
  setErrors: React.Dispatch<React.SetStateAction<FormError>>;
  formFields: FormField[];
  handleAddCourse: () => void;
}

const AddCourseModal: React.FC<AddCourseModalProps> = ({
  isAddModalOpen,
  setIsAddModalOpen,
  newCourse,
  setNewCourse,
  errors,
  setErrors,
  formFields,
  handleAddCourse,
}) => {
  if (!isAddModalOpen) return null;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string,
    type: string
  ) => {
    let value: string | number = e.target.value;
    if (type === "number") {
      value = value === "" ? "" : parseInt(value) || 0;
    }
    setNewCourse({ ...newCourse, [key]: value });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="modal-title">Thêm khóa học mới</h3>
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
                min={field.min}
                className={`form-input ${errors[field.key] ? "input-error" : ""}`}
                placeholder={field.placeholder}
                value={newCourse[field.key]}
                onChange={(e) => handleInputChange(e, field.key, field.type)}
              />
              {errors[field.key] && (
                <p style={{ color: "#ef4444", fontSize: "12px", marginTop: "4px" }}>
                  {errors[field.key]}
                </p>
              )}
            </div>
          ))}

          <button
            className="btn btn-primary"
            style={{ width: "100%", padding: "14px", marginTop: "12px" }}
            onClick={handleAddCourse}
          >
            Thêm khóa học
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCourseModal;