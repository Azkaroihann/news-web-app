const initialState = {
  articles: [],
  savedArticles: [],
};

const articlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ARTICLES':
      return { ...state, articles: action.payload };
    case 'SAVE_ARTICLE':
      return { ...state, savedArticles: [...state.savedArticles, action.payload] };
    case 'UNSAVE_ARTICLE':
      return {
        ...state,
        savedArticles: state.savedArticles.filter(
          (article) => article.web_url !== action.payload.web_url
        ),
      };
    default:
      return state;
  }
};

export default articlesReducer;
