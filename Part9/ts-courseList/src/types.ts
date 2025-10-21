export interface CourseName {
    courseName: string;
}

export interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

export interface CourseWithDescription extends CoursePartBase {
  description: string;
}

export interface CoursePartBasic extends CourseWithDescription {
  kind: "basic"
}

export interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

export interface CoursePartBackground extends CourseWithDescription {
  backgroundMaterial: string;
  kind: "background"
}

export interface CoursePartSpecial extends CourseWithDescription {
  requirements: string[];
  kind: "special"
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;