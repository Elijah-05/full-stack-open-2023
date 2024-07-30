import express, { json } from 'express';
import calculateExercise from './exerciseCalculator';
import calculateBmi from './bmiCalculator';
const app = express();
app.use(json())

app.get('/hello', (_req, res) => {
  res.send("Hello Full Stack!")
})

app.get('/bmi', (req, res) => {
  const {height, weight} = req.query

  const HEIGHT = Number(height)
  const WEIGHT = Number(weight)

  if(isNaN(WEIGHT) || isNaN(HEIGHT) || height === '' || weight === '') {
    return res.status(400).send({error: "malformatted paramters"})
  }

  const resultObject = {
    weight: WEIGHT,
    height: HEIGHT,
    bmi: calculateBmi({height: HEIGHT, weight: WEIGHT})
  }
  return res.send(resultObject)
})

app.post('/exercises', (req, res) => {
  const {daily_exercises, target} = req.body
  const isExeNumArray = daily_exercises?.every((exercise: Array<number | string>) => typeof (exercise) === 'number')

  if(!isExeNumArray || isNaN(Number(target))) {
    return res.status(400).send({error: "malformated parameters"})
  }

  const exeResult = calculateExercise(daily_exercises, target)
  return res.send(exeResult)
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});