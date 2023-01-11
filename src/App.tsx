import React, { useEffect } from 'react';
import { useAppDispatch } from "./app/hooks";
import { fetchArticles } from "./components/Articles/articlesSlicer";



const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchArticles());
  } ,[]);


  return (
    <>

    </>
  );
};

export default App;
