import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { unsaveArticle } from '../redux/actions/articlesActions';
import 'bootstrap/dist/css/bootstrap.min.css';

const Saved = () => {
  const savedArticles = useSelector((state) => state.articles.savedArticles);
  const dispatch = useDispatch();

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Berita Tersimpan</h1>
      {savedArticles.length > 0 ? (
        <div className="row">
          {savedArticles.map((article, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{article.headline?.main || article.title}</h5>
                  <p className="card-text">{article.snippet || article.abstract}</p>
                  <div className="d-flex justify-content-between">
                    <a
                      href={article.web_url || article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary mb-2"
                    >
                      Baca Selengkapnya
                    </a>
                    <button
                      onClick={() => dispatch(unsaveArticle(article))}
                      className="btn btn-danger mb-2"
                    >
                      <i className="bi bi-trash"></i> Hapus
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">Tidak ada berita tersimpan.</p>
      )}
    </div>
  );
};

export default Saved;
