import React, { useEffect, useState } from 'react';
import './NewsPage.css';
import Navbar from './Navbar';

const apiKey = 'd959c631bba34cff9967acb676b101bf'

const NewsPage = () => {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    const getAllNews = async () => {
      const apiURL = `https://newsapi.org/v2/everything?q=gaming&from=2024-01-14&sortBy=popularity&apiKey=d959c631bba34cff9967acb676b101bf`;

      try {
        const response = await fetch(apiURL);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data);
        setArticles(data.articles);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getAllNews();
  }, []);

  const openArticle = (url) => {
    window.open(url, '_blank');
  };

  return (
<div className="container">
<Navbar />
  <h1 className='news-feed'>News Feed</h1>
  <ul className="news-list">
    {articles.map((article, index) => (
      <li key={index} className="article" onClick={() => openArticle(article.url)}>
        <div className="article-content">
          <h2 className="title">{article.title}</h2>
          <div className='description-item'>
          {article.urlToImage && <img src={article.urlToImage} alt={article.title} className="image" />}
          <p className="description">{article.description}</p>
          </div>
         
        </div>
      </li>
    ))}
  </ul>
</div>

  );
};

export default NewsPage;

