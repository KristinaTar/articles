import React, { useEffect, useState } from "react";
import { OutlinedInput } from "@mui/material";
import styles from "./Filter.module.scss";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getFilteredArticles,
  setSearchText as setSearchTextAction,
} from "../Articles/articlesSlicer";

const useSearch = () => {
  const dispatch = useAppDispatch();
  const [searchText, setSearchText] = useState("");
  const [debounceId, setDebounceId] = useState<NodeJS.Timeout>();

  useEffect(() => {
    dispatch(setSearchTextAction(""));
  }, []);

  function updateSearchText(newText: string) {
    setSearchText(newText);
    clearTimeout(debounceId);
    setDebounceId(
      setTimeout(function () {
        dispatch(setSearchTextAction(newText));
      }, 1000)
    );
  }

  return [searchText, updateSearchText] as const;
};

const Filter: React.FC = () => {
  const filteredArticles = useAppSelector(getFilteredArticles);
  const [searchText, updateSearchText] = useSearch();

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchTitle}>Filter by keywords</div>

      <OutlinedInput
        className={styles.searchInput}
        placeholder="Search"
        data-testid="searchInput"
        value={searchText}
        onChange={(e) => updateSearchText(e.target.value)}
      />
      <div className={styles.searchResults}>Results: {filteredArticles.length}</div>
      <div className={styles.horizontalLine}></div>
    </div>
  );
};

export default Filter;
