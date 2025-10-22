import { useState } from 'react';
import type { DiaryEntry } from '../types';
import axios from 'axios';

const DiaryForm = ({diaries, setDiaries}: {diaries: DiaryEntry[], setDiaries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>}) => {
    const [newDate, setNewDate] = useState('');
    const [newVisibility, setNewVisibility] = useState('');
    const [newWeather, setNewWeather] = useState('');
    const [newComment, setNewComment] = useState('');
    const [notification, setNotification] = useState('');

    const submit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        const diaryToAdd = {
            date: newDate,
            weather: newWeather,
            visibility: newVisibility,
            comment: newComment
        }
        
        axios.post<DiaryEntry>('http://localhost:5173/api/diaries', diaryToAdd)
            .then(response => {
                setDiaries(diaries.concat(response.data));
            })
            .catch(error => {
                if (axios.isAxiosError(error)) {
                    setNotification(String(error?.response?.data));
                    setTimeout(() => {
                        setNotification('');
                    }, 5000);
                } else {
                    console.error(error);
                }
            })

        setNewDate('');
        setNewWeather('');
        setNewVisibility('');
        setNewComment('');
  };

    return (
        <>
            <p style={{color: 'red'}}>{notification}</p>
            <form onSubmit={submit}>
                <p>Date: <input value={newDate} onChange={(event) => setNewDate(event.target.value)}/></p>
                <p>Visibility: <input value={newVisibility} onChange={(event) => setNewVisibility(event.target.value)}/></p>
                <p>Weather: <input value={newWeather} onChange={(event) => setNewWeather(event.target.value)}/></p>
                <p>Comment: <input value={newComment} onChange={(event) => setNewComment(event.target.value)}/></p>
                <button type='submit'>Add</button>
            </form>
        </>
    );
};

export default DiaryForm;