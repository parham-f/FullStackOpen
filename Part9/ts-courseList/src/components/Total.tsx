import type { ContentProps } from "../types";

const Total = ({courseParts}: ContentProps) => {
    const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);
    return (
        <p>
            Number of exercises {totalExercises}
        </p>
    )
}

export default Total;