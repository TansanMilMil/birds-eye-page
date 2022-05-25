import { BottomNavigation, BottomNavigationAction, Box, Theme } from '@mui/material';
import { TodayNews } from './pages/todayNews/TodayNews';
import title from './images/logo.png';
import { useEffect, useState } from 'react';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import { Trends } from './pages/trends/Trends';
import { Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from "react-redux";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { MuiTheme } from './mui-theme';
import { RootState } from './app/store';

export function App() {
  const navigate = useNavigate();
  const [navigationValue, setNavigationValue] = useState<string>();
  const theme: Theme = useSelector((state: RootState) => {
    return createTheme({
      palette: MuiTheme.GetTheme(state.theme.themeName),
    });
  });

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