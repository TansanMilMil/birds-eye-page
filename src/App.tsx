import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material';
import './App.css';
import { TodayNews } from './todayNews/TodayNews';
import title from './images/title.png';
import { useState } from 'react';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import { Trends } from './trends/Trends';

export function App() {
  const [navSelectedIndex, setNavSelectedIndex] = useState(0);

  return (
    <div className="app">
      <h1>
        <img src={title} alt="title" />
      </h1>

      { navSelectedIndex === 0 && 
        <Box sx={{ maxWidth: '1200px', margin: '0 auto' }}>
          <TodayNews></TodayNews>
        </Box>
      }
      { navSelectedIndex === 1 && 
        <Box sx={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Trends></Trends>
        </Box>
      }

      <BottomNavigation
        showLabels
        value={navSelectedIndex}
        onChange={(event, newValue) => {
          setNavSelectedIndex(newValue);
        }}
        sx={{ position: 'fixed', bottom: '0', left: '0', width: '100%' }}
      >
        <BottomNavigationAction label="News" icon={<NewspaperIcon />} />
        <BottomNavigationAction label="Trends" icon={<BubbleChartIcon />} />
      </BottomNavigation>      
    </div>
  );
}

export default App;
