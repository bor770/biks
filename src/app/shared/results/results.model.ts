export type AveragesById = Record<number, number>;

export type AveragesBySubject = Record<string, number>;

export interface Result {
  date: Date;
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
