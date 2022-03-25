import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { BirdsEyeApi } from './api/birds-eye-api';
import './App.css';
import { Article } from './Article';
import { News } from './types/news';

export function App() {
  const [newsList, setNewsList] = useState<News[]>([]);

  useEffect(() => {
    if (newsList.length === 0) {
      BirdsEyeApi.getTodayNews()
        .then(newsList => {
          let allNews: News[] = [];
          newsList.data.forEach(group => {
            allNews = allNews.concat(group.news);
          });
          setNewsList(allNews);
        });
    }
  });

  return (
    <div className="App">
      <h1>Birds Eye</h1>
      <Container>
        <Row>
          {newsList.map(news => 
            <Col xs={12} lg={6} xl={4} className="mb-3">
              <Article 
                id={news.id} 
                title={news.title} 
                description={news.description} 
                sourceBy={news.sourceBy} 
                scrapedUrl={news.scrapedUrl} 
                scrapedDateTime={news.scrapedDateTime} 
                articleUrl={news.articleUrl}></Article>
            </Col>
          )}
        </Row>        
      </Container>
    </div>
  );
}

export default App;
