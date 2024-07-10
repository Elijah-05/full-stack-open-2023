interface ReturnObject {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

function calculateExercise(
  numArr: number[],
  target: number
): ReturnObject | void {
  const isValidArg =
    numArr.every((el) => typeof el === "number") &&
    Array.isArray(numArr) &&
    typeof target === "number";
  if (!isValidArg) {
    throw new Error("Invalid Argument is passed!");
  }

  const result: ReturnObject = {
    periodLength: numArr.length,
    trainingDays: numArr.filter((ex) => ex > 0).length,
    success: false,
    rating: 0,
    ratingDescription: "",
    target,
    average: numArr.reduce((cur, acc) => cur + acc, 0) / numArr.length,
  };
  switch (true) {
    case result.average > target:
      result.success = true;
      result.rating = 3;
      result.ratingDescription = "You acheived morethan your target";
      break;
    case result.average === target:
      result.success = true;
      result.rating = 3;
      result.ratingDescription = "You acheived your target successfully";
      break;
    case result.average < target && result.average > target * 0.75:
      result.success = true;
      result.rating = 2;
      result.ratingDescription = "You acheived your target successfully";
      break;
    case result.average >= target * 0.5:
      result.success = false;
      result.rating = 1.5;
      result.ratingDescription = "You accomplish about half of your target";
      break;
    case result.average < target * 0.5 && result.average > 0:
      result.success = false;
      result.rating = 1;
      result.ratingDescription =
        "You are below half of your target exercise hour";
      break;
    default:
      result.success = false;
      result.rating = 0;
      result.ratingDescription = "You haven't do any exercises";
      break;
  }

  return result;
}

console.log(calculateExercise([3, 0, 2, 1, 0, 0, 1], 2));
