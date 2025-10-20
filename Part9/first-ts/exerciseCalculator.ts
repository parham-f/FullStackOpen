interface ExerciseValues {
  target: number;
  days: number[];
}

interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const parseArguments = (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const argsAsNumber = args.slice(2).map(a => Number(a)).includes(NaN);

  if (!argsAsNumber) {      
    return {
      target: Number(args[2]),
      days: args.slice(3).map(a => Number(a))
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

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
    };
};

try {
  const { target, days } = parseArguments(process.argv);
  console.log(calculateExercises(days, target));    
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

export {};