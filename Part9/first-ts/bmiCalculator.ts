interface BmiValues {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]): BmiValues => {
  if (args.length !== 4) {
    throw new Error('Usage: node bmiCalculator.js <height_cm> <weight_kg>');
  }

  const height = Number(args[2]);
  const weight = Number(args[3]);

  if (Number.isNaN(height) || Number.isNaN(weight)) {
    throw new Error('Provided values were not numbers!');
  }

  return { height, weight };
};


const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / ((height / 100) ** 2);

  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal range';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
};

export const bmiCalculator = (inputHeight: number, inputWeight: number) => {
  if (Number.isNaN(inputHeight) || Number.isNaN(inputWeight)) {
    return {
      error: 'Provided values were not numbers!'
    };
  }
  if (inputHeight <= 0 || inputWeight <= 0) {
    return {
      error: 'Height and weight must be > 0'
    };
  }
  const bmi = calculateBmi(inputHeight, inputWeight);
  return {
    weight: inputWeight,
    height: inputHeight,
    bmi: bmi
  };
};

if (require.main === module) {
  try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
  } catch (error: unknown) {
    let msg = 'Something bad happened.';
    if (error instanceof Error) msg += ' Error: ' + error.message;
    console.error(msg);
    process.exitCode = 1;
  }
}