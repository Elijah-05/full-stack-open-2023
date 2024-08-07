import { CoursePart } from "../types";
import { assertNever } from "../utils";

const Part = ({part}: {part: CoursePart}) => {
  const renderContents = () => {
    switch (part.kind) {
      case "basic":
        return <p style={{margin: 0}}>{part.description}</p>;
      case "group":
        return <p style={{margin: 0}}>Group projects {part.groupProjectCount}</p>;
      case "background":
        return (
          <div>
            <p style={{margin: 0}}>{part.description}</p>
            <p style={{margin: 0}}>Background material {part.backgroundMaterial}</p>
          </div>
        );
        case "special":
            return <div><span style={{fontWeight: 'bold'}}>Required skills:</span> {part.requirements.map(r => <span key={r} style={{margin: "0 4px"}}>{`"${r}"`}</span>)}</div>
      default:
        assertNever(part);
        break;
    }
  };

  return renderContents();
};

export default Part;
