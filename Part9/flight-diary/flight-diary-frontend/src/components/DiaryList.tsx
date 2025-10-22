import type { DiaryEntry } from '../types';

const DiaryList = ({diaries}: {diaries: DiaryEntry[]}) => {
    return (
        <>
        {diaries.map(d => (
        <div key={d.id}>
          <h3>{d.date}</h3>
          <p>Visibility: {d.visibility}</p>
          <p>Weather: {d.weather}</p>
        </div>
      ))}
      </>
    );
};

export default DiaryList;