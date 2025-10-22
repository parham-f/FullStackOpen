import { useState, useEffect } from 'react';
import axios from 'axios';
import type { DiaryEntry } from './types';

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    axios.get<DiaryEntry[]>('http://localhost:5173/api/diaries').then(response => {
      setDiaries(response.data);
      console.log(response.data);
    })
  }, []);

  return (
    <div>
      <h2>Diary Entries</h2>
      {diaries.map(d => (
        <div key={d.id}>
          <h3>{d.date}</h3>
          <p>Visibility: {d.visibility}</p>
          <p>Weather: {d.weather}</p>
        </div>
      ))}
    </div>
  );
}

export default App
