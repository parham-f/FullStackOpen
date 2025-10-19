interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const calculateExercises = (exDays: number[], target: number): Result => {
    const datCount = exDays.length;
    const workedDays = exDays.filter(d => d !== 0).length;
    const average = (exDays.reduce((total, number) => total + number, 0)) / exDays.length;
    const success = average >= target ? true : false;
    let rating = 0;
    let ratingDescription = "";
    if(target - average <= 0) {
        rating = 3;
        ratingDescription = "Bravo!";
    } else if(target - average < 0.5) {
        rating = 2;
        ratingDescription = "Not bad but could be better!";
    } else {
        rating = 1;
        ratingDescription = "Get up and do something!";
    }

    return {
        periodLength: datCount,
        trainingDays: workedDays,
        success: success,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: average
    }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));