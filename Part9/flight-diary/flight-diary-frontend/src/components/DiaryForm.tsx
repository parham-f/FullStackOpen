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
                <p>Date: <input type='date' value={newDate} onChange={(event) => setNewDate(event.target.value)}/></p>
                <p>
                    Visibility: 
                    <label>
                        <input name="visibility" type='radio' checked={newVisibility === 'great'} onChange={() => setNewVisibility('great')}/>
                        Great
                    </label>
                    <label>
                        <input name="visibility" type='radio' checked={newVisibility === 'good'} onChange={() => setNewVisibility('good')}/>
                        Good
                    </label>
                    <label>
                        <input name="visibility" type='radio' checked={newVisibility === 'ok'} onChange={() => setNewVisibility('ok')}/>
                        OK
                    </label>
                    <label>
                        <input name="visibility" type='radio' checked={newVisibility === 'poor'} onChange={() => setNewVisibility('poor')}/>
                        Poor
                    </label>
                </p>
                <p>
                    Weather: 
                    <label>
                        <input name="weather" type='radio' checked={newWeather === 'sunny'} onChange={() => setNewWeather('sunny')}/>
                        Sunny
                    </label>
                    <label>
                        <input name="weather" type='radio' checked={newWeather === 'rainy'} onChange={() => setNewWeather('rainy')}/>
                        Rainy
                    </label>
                    <label>
                        <input name="weather" type='radio' checked={newWeather === 'cloudy'} onChange={() => setNewWeather('cloudy')}/>
                        Cloudy
                    </label>
                    <label>
                        <input name="weather" type='radio' checked={newWeather === 'stormy'} onChange={() => setNewWeather('stormy')}/>
                        Stormy
                    </label>
                    <label>
                        <input name="weather" type='radio' checked={newWeather === 'windy'} onChange={() => setNewWeather('windy')}/>
                        Windy
                    </label>
                </p>
                <p>Comment: <input value={newComment} onChange={(event) => setNewComment(event.target.value)}/></p>
                <button type='submit'>Add</button>
            </form>
        </>
    );
};

export default DiaryForm;