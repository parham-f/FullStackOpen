import type { CourseParts, ContentProps } from "../types";

const Content = ({courseParts}: ContentProps) => {
    return (
        <div>
        {courseParts.map((c: CourseParts) => (
            <p key={c.name}>
                {c.name} {c.exerciseCount}
            </p>
        ))}
        </div>
    )
};

export default Content;