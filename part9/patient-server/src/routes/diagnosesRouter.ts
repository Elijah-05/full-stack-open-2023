import express from 'express'
import { getAllDiagnoses } from '../services/diagnosisService'
const router = express.Router()

router.get('/', (_req, res) => {
    res.send(getAllDiagnoses())
})

export default router