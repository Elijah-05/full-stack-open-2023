import axios from "axios";
import { DiaryEntry, DiaryType } from "../types";
// import { DiaryType } from "../types";

const baseUrl = import.meta.env.VITE_API_URL;

const getAllDiaries = async () => {
  const res = await axios.get<DiaryType[]>(`${baseUrl}/api/diaries`);
  return res.data;
};

const createDiary = async (object: DiaryEntry) => {
  const res = await axios.post(`${baseUrl}/api/diaries`, object);
  return res;
};

export { getAllDiaries, createDiary };
