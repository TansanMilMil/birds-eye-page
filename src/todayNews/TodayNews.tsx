import { Box, CircularProgress, Grid } from '@mui/material';
import { Masonry } from '@mui/lab';
import { Error } from '@mui/icons-material';
import { Article } from '../article/Article';
import { News } from '../types/news';
import { useEffect, useState } from 'react';
import { BirdsEyeApi } from '../api/birds-eye-api';

export function TodayNews() {
    const [newsList, setNewsList] = useState<News[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [hasError, setHasError] = useState<boolean>(false);
  
    useEffect(() => {
      if (newsList.length === 0) {
        setIsLoading(true);
        BirdsEyeApi.getTodayNews()
          .then(newsList => {
            const news: News[] = newsList.data.map(news => {
              news.scrapedDateTime = new Date(Date.parse(news.scrapedDateTime)).toLocaleString();
              return news;
            });
            setNewsList(news);
            setIsLoading(false);
          })
          .catch(err => {
            console.error(err);
            setIsLoading(false);
            setHasError(true);
          });
      }
    }, []);
  
    return (
        <div>
          { hasError &&
            <Box sx={{ textAlign: 'center', color: 'error.dark' }}>
              <Error fontSize="large" />
              <div>network error...</div>
            </Box>
          }
          { isLoading && 
              <Box sx={{ textAlign: 'center', margin: '3rem' }}>
              <CircularProgress color="secondary" />
              </Box>
          }
          { !isLoading && 
            <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={{ xs: 1, sm: 1, md: 1 }}>
              {newsList.map((news, i) => 
                <Article 
                  key={i}
                  id={news.id} 
                  title={news.title} 
                  description={news.description} 
                  sourceBy={news.sourceBy} 
                  scrapedUrl={news.scrapedUrl} 
                  scrapedDateTime={news.scrapedDateTime} 
                  articleUrl={news.articleUrl}
                  articleImageUrl={news.articleImageUrl}></Article>
              )}
            </Masonry>
          }
        </div>
    );
}