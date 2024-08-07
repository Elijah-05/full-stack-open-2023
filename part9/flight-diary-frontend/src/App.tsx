import { useEffect, useState } from "react";
import { getAllDiaries } from "./services/services";
import { DiaryType } from "./types";
import DiaryEntry from "./components/DiaryEntry";
import DiaryForm from "./components/DiaryForm";

const App = () => {
  const [diary, setDiary] = useState<DiaryType[]>([]);

  useEffect(() => {
    getAllDiaries()
      .then((res) => setDiary(res))
      .catch((err) => console.log("ERrror: ", err));
  }, []);

  return (
    <div>
      <DiaryForm setDiary={setDiary} />
      <DiaryEntry allDiary={diary} />
    </div>
  );
};

export default App;
