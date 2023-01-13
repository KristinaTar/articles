import React from 'react';
import Articles from "./components/Articles/Articles";
import Filter from "./components/Filter/Filter";
import styles from "./App.module.scss";

const App: React.FC = () => {


  return (
    <div className={styles.appContainer}>
      <Filter/>
      <Articles/>

    </div>
  );
};

export default App;
