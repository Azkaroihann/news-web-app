import axios from 'axios';

export const fetchArticles = (query) => async (dispatch) => {
  const apiKey = process.env.REACT_APP_NYT_API_KEY;
  try {
    const response = await axios.get(
      `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&api-key=${apiKey}`
    );
    dispatch({ type: 'SET_ARTICLES', payload: response.data.response.docs });
  } catch (error) {
    console.error('Error fetching articles:', error);
  }
};

export const saveArticle = (article) => (dispatch) => {
  dispatch({ type: 'SAVE_ARTICLE', payload: article });
};

export const unsaveArticle = (article) => (dispatch) => {
  dispatch({ type: 'UNSAVE_ARTICLE', payload: article });
};
