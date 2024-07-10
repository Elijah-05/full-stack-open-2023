const calculateBmi = (height: number, weight: number) => {
  if (typeof height !== "number" || typeof weight !== "number") {
    throw new Error(
      "function parameters are wrong types! The should be both numbers."
    );
  }
  const meterHeight = height / 100;
  const bmi = weight / (meterHeight * meterHeight);
  switch (true) {
    case bmi < 18.5:
      return "Underweight";
    case bmi >= 18.5 && bmi <= 24.9:
      return "Normal (healthy weight)";
    case bmi >= 25 && bmi <= 29.9:
      return "Overweight";
    case bmi >= 30:
      return "Obese";
    default:
      return "Invalid!";
  }
};

console.log(calculateBmi(180, 74));
