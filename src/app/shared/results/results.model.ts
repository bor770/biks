export interface Result {
  grade: number;
  studentId: number;
  subject: string;
}

interface FullStudentData {
  address: string;
  city: string;
  country: string;
  dateJoined: Date;
  email: string;
  name: string;
  zip: string;
}

export type StudentData = Partial<FullStudentData>;

export type Students = Record<number, StudentData>;
