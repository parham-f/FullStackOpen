import type { CoursePart } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
    return (
        <div>
            {courseParts.map(part => {
        switch (part.kind) {
            case "basic":
                return(
                    <div key={part.name}>
                        <h3>{part.name} {part.exerciseCount}</h3>
                        <p>{part.description}</p>
                    </div>
                )
            case "group":
                return(
                    <div key={part.name}>
                        <h3>{part.name} {part.exerciseCount}</h3>
                        <p>Group project exercises: {part.groupProjectCount}</p>
                    </div>
                )
            case "background":
                return(
                    <div key={part.name}>
                        <h3>{part.name} {part.exerciseCount}</h3>
                        <p>{part.description}</p>
                        <p>Background Material: {part.backgroundMaterial}</p>
                    </div>
                )
            case "special":
                return(
                    <div key={part.name}>
                        <h3>{part.name} {part.exerciseCount}</h3>
                        <p>{part.description}</p>
                        <p>Required skills: {part.requirements.join(', ')}</p>
                    </div>
                )
            default:
                return assertNever(part);
        }
    })}
        </div>
    )
};

export default Content;