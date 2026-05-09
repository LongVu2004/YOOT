import type { Student } from "../../types/Student";

export type Validator = (value: string) => string | null;

// Helper function to determine academic level based on score
export const getAcademicLevel = (score: number): string => {
    if (score >= 9) return "Giỏi";
    if (score >= 8) return "Tốt";
    if (score >= 6.5) return "Khá";
    if (score >= 5) return "Trung bình";
    return "Yếu";
};

// Helper function to get color based on academic level
export const getLevelColor = (level: string): string => {
    switch (level) {
        case "Giỏi":
            return "#4CAF50"; // Green
        case "Tốt":
            return "#8BC34A"; // Light Green
        case "Khá":
            return "#FFC107"; // Amber
        case "Trung bình":
            return "#FF9800"; // Orange
        case "Yếu":
            return "#F44336"; // Red
        default:
            return "#9E9E9E"; // Grey
    }
};

export const StudentValidator: Partial<Record<keyof Student, Validator[]>> = {
    hoten: [(v) => (!v.trim() ? "Họ và tên học viên không được để trống" : null)],
    phuhuynh: [(v) => (!v.trim() ? "Tên phụ huynh không được để trống" : null)],
    sdt: [
        (v) => (!v.trim() ? "Số điện thoại không được để trống" : null),
        (v) => (!/^\d{10}$/.test(v) ? "Số điện thoại phải có 10 chữ số" : null)
    ],
    diem: [
        (v) => (!v.toString().trim() ? "Điểm không được để trống" : null),
        (v) => typeof v === "number" && v >= 0 && v <= 10 ? null : "Điểm phải từ 0 đến 10"
    ]
}
