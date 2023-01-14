import React, { useEffect } from "react";
import Articles from "./components/Articles/Articles";
import styles from "./App.module.scss";
import { Route, Routes } from "react-router-dom";
import Article from "./components/Article/Article";
import { fetchArticles } from "./components/Articles/articlesSlicer";
import { useAppDispatch } from "./app/hooks";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchArticles());
  }, []);

  return (
    <div className={styles.appContainer}>
      <Routes>
        <Route index element={<Articles />} />
        <Route path="/article/:articleId" element={<Article />} />
      </Routes>
    </div>
  );
};

export default App;
