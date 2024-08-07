export interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface DescriptionProp extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends DescriptionProp {
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends DescriptionProp {
  backgroundMaterial: string;
  kind: "background";
}

interface CoursePartSpecial extends DescriptionProp {
  requirements: Array<string>;
  kind: "special";
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;
