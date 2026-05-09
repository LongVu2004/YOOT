export interface Course {
  id: number;
  name: string;
  description: string;
  duration: string;
  students: number | string;
}

export interface FormError {
  [key: string]: string;
}

export interface FormField {
  key: keyof Omit<Course, "id">;
  type: string;
  placeholder: string;
  min?: string;
}