import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchArticles } from '../redux/actions/articlesActions';

const Navbar = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query) {
      navigate(`/search?q=${query}`);
      dispatch(fetchArticles(query));
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#e85428" }}>
      <div className="container">
        <Link className="navbar-brand text-white fw-bold" to="/">
          NewsApp
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Indonesia
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/programming">
                Programming
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/covid">
                Covid
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/saved">
                Saved
              </Link>
            </li>
          </ul>
          <form className="d-flex" onSubmit={handleSearch}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Cari berita..."
              aria-label="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="btn btn-outline-light" type="submit">
              Cari
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
