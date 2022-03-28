import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material';
import './App.css';
import { TodayNews } from './todayNews/TodayNews';
import title from './images/title.png';
import { useEffect, useState } from 'react';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import { Trends } from './trends/Trends';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export function App() {
  const navigate = useNavigate();
  const [navigationValue, setNavigationValue] = useState<string>();

  useEffect(() => {
    if (window.location.pathname === '/') {
      navigate('/news');
    }
    setNavigationValue(window.location.pathname);
  }, []);

  return (
    <div className="app">
      <h1>
        <img src={title} alt="title" />
      </h1>

      <Routes>
        <Route path="/news" element={<TodayNews></TodayNews>} />
        <Route path="/trends" element={<Trends></Trends>} />
      </Routes>

      <BottomNavigation
        showLabels
        value={navigationValue}
        onChange={(event, newValue) => { 
          setNavigationValue(newValue);
          navigate(newValue); 
        }}
        sx={{ position: 'fixed', bottom: '0', left: '0', width: '100%' }}>
        <BottomNavigationAction label="News" icon={<NewspaperIcon />} value="/news" />
        <BottomNavigationAction label="Trends" icon={<BubbleChartIcon />} value="/trends" />
      </BottomNavigation>      
    </div>
  );
}

export default App;
