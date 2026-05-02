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
