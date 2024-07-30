interface BMIProps {
  weight: number;
  height: number;
}

const parseArguments = (args: string[]): BMIProps => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      weight: Number(args[2]),
      height: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const calculateBmi = ({ weight, height }: BMIProps) => {
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

if(require.main === module) {
  try {
    const { weight, height } = parseArguments(process.argv);
    console.log(calculateBmi({ weight, height }));
  } catch (error: unknown) {
    let errorMsg = "Something wend wrong.";
    if (error instanceof Error) {
      errorMsg += " Error: " + error.message;
    }
    console.log(errorMsg);
  }
}

export default calculateBmi