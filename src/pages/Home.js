import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchArticles, saveArticle, unsaveArticle } from '../redux/actions/articlesActions';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articles.articles);
  const savedArticles = useSelector((state) => state.articles.savedArticles);

  useEffect(() => {
    dispatch(fetchArticles('indonesian'));
  }, [dispatch]);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Berita Terkini dari Indonesia</h1>
      {articles.length > 0 ? (
        <div className="row">
          {articles.map((article, index) => {
            const isSaved = savedArticles.some(
              (savedArticle) => savedArticle.web_url === article.web_url
            );
            return (
              <div key={index} className="col-md-4 mb-4">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{article.headline.main}</h5>
                    <p className="card-text">{article.snippet}</p>
                    <div className="d-flex justify-content-between">
                      <a href={article.web_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary mb-2">
                        Baca Selengkapnya
                      </a>
                      <button
                        onClick={() =>
                          isSaved ? dispatch(unsaveArticle(article)) : dispatch(saveArticle(article))
                        }
                        className={`btn ${isSaved ? 'btn-danger' : 'btn-success'} mb-2`}
                      >
                        <i className={`bi ${isSaved ? 'bi-bookmark-x' : 'bi-bookmark'}`}></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center">Memuat berita...</p>
      )}
    </div>
  );
};

export default Home;
