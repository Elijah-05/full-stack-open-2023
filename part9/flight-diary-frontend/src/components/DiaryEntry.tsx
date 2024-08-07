import { DiaryType } from "../types";

const DiaryEntry = ({ allDiary }: { allDiary: DiaryType[] }) => {
  return (
    <div className="">
      <h1>Diary Entries</h1>
      {allDiary.map((diary) => {
        const { date, visibility, weather } = diary;
        return (
          <div key={diary.id}>
            <h2 style={{margin: '14px 0 0px 0'}}>{date}</h2>
            <p style={{margin: 0}}>Visibility: {visibility}</p>
            <p style={{margin: 0}}>Weather: {weather}</p>
          </div>
        );
      })}
    </div>
  );
};

export default DiaryEntry;
