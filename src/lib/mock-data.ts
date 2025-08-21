// Mock data for UXi Education LMS
import { 
  Student, Assessment, Homework, CalendarEvent, 
  PoESection, User, Course, Topic, Batch
} from './types';

// Demo users
export const mockUsers: User[] = [
  {
    id: '547030',
    email: 'macy.fisher@example.com',
    name: 'Macy Fisher',
    role: 'student',
    avatar: '/api/placeholder/32/32'
  },
  {
    id: 'admin001',
    email: 'phillip@uxieducation.com',
    name: 'Phillip',
    role: 'admin',
    avatar: '/api/placeholder/32/32'
  }
];

// Student data
export const mockStudent: Student = {
  id: '547030',
  email: 'macy.fisher@example.com',
  name: 'Macy Fisher',
  role: 'student',
  moodleId: '547030',
  program: {
    name: 'Electrician (NQF Level 4)',
    qualificationId: '90973',
    curriculumCode: '734101001',
    occupationalCertificate: 'Electrician',
    academicYear: 'Year 3'
  },
  batch: 'Elec_May_2021',
  year: 'Third',
  gender: 'Female',
  age: 22,
  competentAssessments: 34,
  totalAssessments: 36
};

// Additional students for admin view
export const mockStudents: Student[] = [
  mockStudent,
  {
    id: '703703',
    email: 'thabang.theletsane@example.com',
    name: 'Thabang Theletsane',
    role: 'student',
    moodleId: '703703',
    program: mockStudent.program,
    batch: 'Elec_May_2021',
    year: 'Third',
    gender: 'Male',
    age: 24,
    competentAssessments: 32,
    totalAssessments: 36
  },
  {
    id: '891234',
    email: 'sarah.johnson@example.com',
    name: 'Sarah Johnson',
    role: 'student',
    moodleId: '891234',
    program: mockStudent.program,
    batch: 'Elec_May_2021',
    year: 'Third',
    gender: 'Female',
    age: 21,
    competentAssessments: 35,
    totalAssessments: 36
  },
  {
    id: '567890',
    email: 'michael.brown@example.com',
    name: 'Michael Brown',
    role: 'student',
    moodleId: '567890',
    program: mockStudent.program,
    batch: 'Elec_May_2021',
    year: 'Third',
    gender: 'Male',
    age: 23,
    competentAssessments: 30,
    totalAssessments: 36
  },
  {
    id: '456789',
    email: 'lisa.wilson@example.com',
    name: 'Lisa Wilson',
    role: 'student',
    moodleId: '456789',
    program: mockStudent.program,
    batch: 'Elec_May_2021',
    year: 'Third',
    gender: 'Female',
    age: 22,
    competentAssessments: 33,
    totalAssessments: 36
  }
];

// Assessments data
export const mockAssessments: Assessment[] = [
  {
    id: 'fa1',
    title: 'Formative Assessment 1',
    type: 'formative',
    course: 'KM-04',
    date: new Date('2024-01-25'),
    time: '10:00 AM',
    location: 'Design Studio A',
    duration: 60,
    status: 'competent',
    items: []
  },
  {
    id: 'fa2',
    title: 'Formative Assessment 2',
    type: 'formative',
    course: 'KM-03',
    date: new Date('2024-02-05'),
    time: '02:00 PM',
    location: 'Computer Lab 2',
    duration: 90,
    status: 'competent',
    items: []
  },
  {
    id: 'fa3',
    title: 'Formative Assessment 3',
    type: 'formative',
    course: 'KM-02',
    date: new Date('2024-03-10'),
    time: '01:00 PM',
    location: 'Design Lab 1',
    duration: 75,
    status: 'competent',
    items: []
  },
  {
    id: 'fa4',
    title: 'Formative Assessment 4',
    type: 'formative',
    course: 'KM-02',
    date: new Date('2024-04-02'),
    time: '09:45 AM',
    location: 'Lecture Hall B',
    duration: 120,
    status: 'competent',
    items: []
  },
  {
    id: 'pa1',
    title: 'Practical Assessment 1 Task 1',
    type: 'practical',
    course: 'PM',
    date: new Date('2024-03-15'),
    time: '09:45 AM',
    location: 'Lecture Hall B',
    duration: 180,
    status: 'competent',
    items: []
  },
  {
    id: 'pa2',
    title: 'Practical Assessment 1 Task 2',
    type: 'practical',
    course: 'PM',
    date: new Date('2024-04-20'),
    time: '01:30 AM',
    location: 'Prototype Lab',
    duration: 180,
    status: 'competent',
    items: []
  }
];

// Homework data
export const mockHomework: Homework[] = [
  {
    id: 'hw1',
    code: 'KM-01-KT01',
    title: 'Assignment: Design Project 1',
    description: 'Complete the initial design project focusing on electrical safety protocols.',
    dueDate: new Date('2024-02-10'),
    status: 'not-submitted'
  },
  {
    id: 'hw2',
    code: 'KM-04-KT01',
    title: 'Assignment: World of Work Project',
    description: 'Research and present on workplace electrical standards.',
    dueDate: new Date('2024-03-05'),
    status: 'completed',
    submittedAt: new Date('2024-03-01')
  },
  {
    id: 'hw3',
    code: 'KM-03-KT01',
    title: 'Assignment: Fundamentals of electricity',
    description: 'Complete electrical fundamentals workbook exercises.',
    dueDate: new Date('2024-04-15'),
    status: 'in-progress'
  }
];

// Calendar events
export const mockCalendarEvents: CalendarEvent[] = [
  {
    id: 'event1',
    title: 'Electrical Safety Lecture',
    date: new Date('2024-01-15'),
    time: '09:00 AM',
    type: 'class',
    location: 'Lecture Hall A',
    course: 'KM-04'
  },
  {
    id: 'event2',
    title: 'Practical Lab Session',
    date: new Date('2024-01-18'),
    time: '14:00 PM',
    type: 'practical',
    location: 'Lab 1',
    course: 'KM-03'
  },
  {
    id: 'event3',
    title: 'Formative Assessment 4',
    date: new Date('2024-01-22'),
    time: '09:45 AM',
    type: 'assessment',
    location: 'Lecture Hall B',
    course: 'KM-02'
  }
];

// Portfolio of Evidence sections
export const mockPoESections: PoESection[] = [
  {
    id: 'section-a',
    section: 'Section A',
    description: 'Candidate & Admin Details',
    tasks: 7,
    complete: true,
    date: new Date('2021-02-06'),
    artifacts: []
  },
  {
    id: 'section-b',
    section: 'Section B',
    description: "KM's",
    tasks: 6,
    complete: true,
    date: new Date('2023-04-06'),
    artifacts: []
  },
  {
    id: 'section-c',
    section: 'Section C',
    description: "PM's",
    tasks: 7,
    complete: true,
    date: new Date('2023-04-06'),
    artifacts: []
  },
  {
    id: 'section-d',
    section: 'Section D',
    description: "WM's",
    tasks: 5,
    complete: true,
    date: new Date('2023-05-06'),
    artifacts: []
  },
  {
    id: 'section-e',
    section: 'Section E',
    description: 'Summative Evidence & Declarations',
    tasks: 4,
    complete: true,
    date: new Date('2023-07-06'),
    artifacts: []
  },
  {
    id: 'section-f',
    section: 'Section F',
    description: 'Appendices',
    tasks: 2,
    complete: true,
    date: new Date('2023-07-06'),
    artifacts: []
  }
];

// Courses
export const mockCourses: Course[] = [
  {
    id: 'km04',
    code: 'KM-04',
    name: 'Electrical Safety and Regulations',
    year: 3,
    topics: [
      {
        id: 'kt0101',
        code: 'KT0101',
        name: 'The Electrician\'s world of work',
        courseId: 'km04',
        files: []
      }
    ]
  },
  {
    id: 'km03',
    code: 'KM-03',
    name: 'Electrical Installation Principles',
    year: 3,
    topics: []
  },
  {
    id: 'km02',
    code: 'KM-02',
    name: 'Electrical Theory Fundamentals',
    year: 2,
    topics: []
  }
];

// Batches
export const mockBatches: Batch[] = [
  {
    id: 'elec-may-2021',
    name: 'Elec_May_2021',
    program: 'Electrician (NQF Level 4)',
    startDate: new Date('2021-05-01'),
    endDate: new Date('2024-04-30'),
    students: mockStudents
  }
];

// Utility function to simulate API delay
export const simulateDelay = (ms: number = 500) => 
  new Promise(resolve => setTimeout(resolve, ms));

// Mock API functions
export const mockAPI = {
  auth: {
    login: async (email: string, password: string) => {
      await simulateDelay();
      const user = mockUsers.find(u => u.email === email);
      if (user && password === 'password123') {
        return { success: true, data: user };
      }
      return { success: false, message: 'Invalid credentials' };
    },
    getCurrentUser: async () => {
      await simulateDelay();
      return { success: true, data: mockStudent };
    }
  },
  
  students: {
    getAll: async () => {
      await simulateDelay();
      return { success: true, data: mockStudents };
    },
    getById: async (id: string) => {
      await simulateDelay();
      const student = mockStudents.find(s => s.id === id);
      return { success: true, data: student };
    }
  },
  
  assessments: {
    getAll: async () => {
      await simulateDelay();
      return { success: true, data: mockAssessments };
    },
    getByStudent: async (studentId: string) => {
      await simulateDelay();
      return { success: true, data: mockAssessments };
    }
  },
  
  homework: {
    getByStudent: async (studentId: string) => {
      await simulateDelay();
      return { success: true, data: mockHomework };
    }
  },
  
  calendar: {
    getEvents: async (year: number, month: number) => {
      await simulateDelay();
      return { success: true, data: mockCalendarEvents };
    }
  },
  
  poe: {
    getSections: async (studentId: string) => {
      await simulateDelay();
      return { success: true, data: mockPoESections };
    }
  }
};