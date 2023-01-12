import React from 'react';
import Articles from "./components/Articles/Articles";
import Filter from "./components/Filter/Filter";




const App: React.FC = () => {

  return (
    <>
      <Filter/>
      <Articles/>

    </>
  );
};

export default App;
