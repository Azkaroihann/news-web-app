import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchArticles, saveArticle, unsaveArticle } from '../redux/actions/articlesActions';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from 'react-bootstrap/Spinner';

const Search = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articles.articles);
  const savedArticles = useSelector((state) => state.articles.savedArticles);

  // Ambil kata kunci dari URL (query parameter)
  const location = useLocation();
  const queryParam = new URLSearchParams(location.search).get('q');

  useEffect(() => {
    const loadArticles = async () => {
      if (queryParam) {
        setQuery(queryParam);
        try {
          await dispatch(fetchArticles(queryParam));
        } catch (err) {
          setError('Gagal memuat berita. Silakan coba lagi.');
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
        setError('Tidak ada kata kunci pencarian yang diberikan.');
      }
    };
    loadArticles();
  }, [queryParam, dispatch]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container text-center mt-5">
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Hasil Pencarian: {query}</h1>
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
                      <a
                        href={article.web_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary mb-2"
                      >
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
        <p className="text-center">Tidak ada berita ditemukan untuk kata kunci "{query}".</p>
      )}
    </div>
  );
};

export default Search;