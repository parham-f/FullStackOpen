export interface CourseName {
    courseName: string;
}

export interface CourseParts {
  name: string;
  exerciseCount: number;
}

export interface ContentProps {
  courseParts: CourseParts[];
}