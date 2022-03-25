import { Box, CircularProgress, Grid } from '@mui/material';
import { Masonry } from '@mui/lab';
import { useEffect, useState } from 'react';
import { BirdsEyeApi } from './api/birds-eye-api';
import './App.css';
import { Article } from './Article';
import { News } from './types/news';

export function App() {
  const [newsList, setNewsList] = useState<News[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (newsList.length === 0) {
      setIsLoading(true);
      BirdsEyeApi.getTodayNews()
        .then(newsList => {
          let allNews: News[] = [];
          newsList.data.forEach(group => {
            allNews = allNews.concat(group.news);
          });
          allNews = allNews.map(news => {
            news.scrapedDateTime = new Date(Date.parse(news.scrapedDateTime)).toLocaleString();
            return news;
          });
          allNews = shuffle(allNews);
          setNewsList(allNews);

          setIsLoading(false);
        })
        .catch(err => {
          setIsLoading(false);
        });
    }
  }, [newsList.length]);

  const shuffle = (inputArray: any[]) => {
    const array: any[] = JSON.parse(JSON.stringify(inputArray));
    array.sort(() => Math.random() - 0.5);
    return array;
  };

  return (
    <div className="app">
      <h1>Birds Eye</h1>
      <Box sx={{ maxWidth: '1200px', margin: '0 auto' }}>
        { isLoading && 
          <Box sx={{ textAlign: 'center', margin: '3rem' }}>
            <CircularProgress />
          </Box>
        }
        { !isLoading && 
          <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={{ xs: 1, sm: 2, md: 3 }}>
            {newsList.map(news => 
              <Article 
                id={news.id} 
                title={news.title} 
                description={news.description} 
                sourceBy={news.sourceBy} 
                scrapedUrl={news.scrapedUrl} 
                scrapedDateTime={news.scrapedDateTime} 
                articleUrl={news.articleUrl}></Article>
            )}
          </Masonry>
        }
      </Box>
    </div>
  );
}

export default App;
