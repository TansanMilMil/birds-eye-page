import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material';
import { TodayNews } from './pages/todayNews/TodayNews';
import title from './images/logo.png';
import { useEffect, useState } from 'react';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import { Trends } from './pages/trends/Trends';
import { Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green, lightGreen, orange, pink, teal } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: teal,
    secondary: pink,
  },
});

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
    <ThemeProvider theme={theme}>
      <Box sx={{ backgroundColor: 'primary.main' }}>
        <AppBase>
          <Title>
            <img src={title} alt="title" />
          </Title>

          <Routes>
            <Route path="/news" element={<TodayNews></TodayNews>} />
            <Route path="/trends" element={<Trends></Trends>} />
          </Routes>

          <Credit>
            <div>ロゴは <a href="https://www.designevo.com/jp/" title="無料オンラインロゴメーカー">DesignEvo</a> ロゴメーカーさんに作られる</div>
          </Credit>

          <BottomNavigation
            showLabels
            value={navigationValue}
            onChange={(event, newValue) => { 
              setNavigationValue(newValue);
              navigate(newValue); 
            }}
            sx={{ position: 'fixed', bottom: '0', left: '0', width: '100%', zIndex: 100 }}>
            <BottomNavigationAction label="News" icon={<NewspaperIcon />} value="/news" />
            <BottomNavigationAction label="Trends" icon={<BubbleChartIcon />} value="/trends" />
          </BottomNavigation>      
        </AppBase>
      </Box>
    </ThemeProvider>
  );
}

const AppBase = styled.div`
  min-height: 100vh;
  padding: 8px 8px 5rem 8px;
`;

const Title = styled.h1`
  font-family: 'Tempus Sans ITC';
  color: #e7e7e7;
  text-align: center;
  font-weight: normal;
  margin: 0;
`;

const Credit = styled.div`
  font-size: 0.5rem;
  text-align: center;
  color: #ccc;
`;