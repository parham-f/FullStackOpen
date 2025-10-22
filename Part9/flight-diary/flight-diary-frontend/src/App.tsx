import { useState, useEffect } from 'react';
import axios from 'axios';
import type { DiaryEntry } from './types';
import DiaryList from './components/DiaryList';
import DiaryForm from './components/DiaryForm';

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  

  useEffect(() => {
    axios.get<DiaryEntry[]>('http://localhost:5173/api/diaries').then(response => {
      setDiaries(response.data);
    })
  }, []);

  return (
    <div>
      <h2>Diary Entries</h2>
      <DiaryList diaries={diaries}/>
      <h2>Add New Entry</h2>
      <DiaryForm diaries={diaries} setDiaries={setDiaries}/>
    </div>
  );
}

export default App
