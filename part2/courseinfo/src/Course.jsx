const Header = ({ course }) => <h2>{course}</h2>;

const Total = ({ sum }) => (
  <p style={{ fontWeight: "bold" }}>total of {sum} exercises</p>
);

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => {
  return parts.map((part) => <Part part={part} key={part.name} />);
};

const Course = ({ course }) => {
  return course.map((cours) => (
    <div key={cours.id}>
      <Header course={cours.name} />
      <Content parts={cours.parts} />
      <Total
        sum={cours.parts
          .map((part) => part.exercises)
          .reduce((acc, cur) => acc + cur, 0)}
      />
    </div>
  ));
};

export default Course;
