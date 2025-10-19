const calculateBmi = (height: number, weight: number): string => {
    const bmi = weight / ((height/100) ** 2)
    if(bmi < 18.5) return "Underweight"
    else if(bmi < 24.9) return "Normal range"
    else if(bmi < 29.9) return "Overweight"
    else if(height <= 0) return "Height can not be zero or negative!"
}


console.log(calculateBmi(180, 74))