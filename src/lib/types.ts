// UXi Education LMS Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'lecturer' | 'admin';
  avatar?: string;
}

export interface Student extends User {
  role: 'student';
  moodleId: string;
  program: Program;
  batch: string;
  year: string;
  gender: string;
  age?: number;
  competentAssessments: number;
  totalAssessments: number;
}

export interface Program {
  name: string;
  qualificationId: string;
  curriculumCode: string;
  occupationalCertificate: string;
  academicYear: string;
}

export interface Course {
  id: string;
  code: string; // KM-04, KM-03, etc.
  name: string;
  description?: string;
  year: number;
  topics: Topic[];
}

export interface Topic {
  id: string;
  code: string; // KT0101, etc.
  name: string;
  description?: string;
  courseId: string;
  files: TopicFile[];
}

export interface TopicFile {
  id: string;
  name: string;
  type: 'pdf' | 'docx' | 'txt';
  url: string;
  size: number;
  uploadedBy: string;
  uploadedAt: Date;
}

export interface Assessment {
  id: string;
  title: string;
  type: 'formative' | 'practical';
  course: string; // KM-04, etc.
  date: Date;
  time: string;
  location: string;
  duration: number; // minutes
  status: 'competent' | 'in-progress' | 'not-submitted';
  items: AssessmentItem[];
}

export interface AssessmentItem {
  id: string;
  question: string;
  scenario?: string;
  options: string[];
  correctAnswer: number;
  order: number;
}

export interface Attempt {
  id: string;
  assessmentId: string;
  studentId: string;
  answers: number[];
  score: number;
  completedAt: Date;
  timeSpent: number; // seconds
}

export interface Homework {
  id: string;
  code: string; // KM-01-KT01, etc.
  title: string;
  description: string;
  dueDate: Date;
  status: 'completed' | 'in-progress' | 'not-submitted';
  submittedAt?: Date;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  time: string;
  type: 'class' | 'practical' | 'assessment' | 'exam';
  location: string;
  course?: string;
}

export interface Attendance {
  id: string;
  eventId: string;
  studentId: string;
  status: 'present' | 'absent' | 'late';
  date: Date;
}

export interface PoESection {
  id: string;
  section: string;
  description: string;
  tasks: number;
  complete: boolean;
  date?: Date;
  artifacts: PoEArtifact[];
}

export interface PoEArtifact {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadedAt: Date;
}

export interface Batch {
  id: string;
  name: string;
  program: string;
  startDate: Date;
  endDate: Date;
  students: Student[];
}

export interface Fee {
  id: string;
  studentId: string;
  amount: number;
  type: string;
  dueDate: Date;
  status: 'paid' | 'pending' | 'overdue';
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  read: boolean;
  createdAt: Date;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

// Auth types
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}