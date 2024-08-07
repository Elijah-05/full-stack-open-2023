import { CoursePart } from "../types";
import Part from "./Part";

interface CourseProps {
  courseContent: CoursePart;
}

const Content = ({ courseContent }: CourseProps) => {
  const { name, exerciseCount } = courseContent;

  return (
    <div style={{marginTop: '14px'}}>
      <h2 style={{margin: 0}}>
        {name} {exerciseCount}
      </h2>
      <Part part={courseContent} />
    </div>
  );
};

export default Content;
