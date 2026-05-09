export interface ManageStudent {
  id: number;
  hoten: string;
  phuhuynh: string;
  sdt: string;
  hocluc: string;
  diem: number;
}

export interface FormError {
  [key: string]: string;
}

export interface FormField {
  key: keyof Omit<ManageStudent, 'id' | 'hocluc'>;
  type: string;
  placeholder: string;
  step?: string;
  min?: string;
  max?: string;
}
