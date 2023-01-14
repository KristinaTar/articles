import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { Article } from "../types/Articles";
import * as articlesAPI from "../api/articles";
import { LoadingStatus } from "../types/enums";

export interface ArticlesState {
  articles: Article[];
  loading: LoadingStatus;
  searchText: string;
  filteredArticles: Article[];
}

const initialState: ArticlesState = {
  articles: [],
  loading: LoadingStatus.Idle,
  searchText: "",
  filteredArticles: [],
};

export const fetchArticles = createAsyncThunk("articles/fetchArticles", async () => {
  return {
    articles: await articlesAPI.getArticlesData(),
  };
});

export const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    setSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload.toLocaleLowerCase();
      if (state.searchText.trim() === "") {
        state.filteredArticles = [...state.articles];
        return;
      }

      const articles = [...state.articles];
      const filteredArticles: Article[] = [];

      for (let i = 0; i < articles.length; i++) {
        if (articles[i].title.toLowerCase().includes(state.searchText)) {
          filteredArticles.push(articles[i]);
          delete articles[i];
        }
      }
      for (let i = 0; i < articles.length; i++) {
        if (articles[i] && articles[i].summary.toLowerCase().includes(state.searchText)) {
          filteredArticles.push(articles[i]);
        }
      }

      state.filteredArticles = filteredArticles;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = LoadingStatus.Loading;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.loading = LoadingStatus.Idle;
        state.articles = action.payload.articles;
        state.filteredArticles = [...action.payload.articles];
      })
      .addCase(fetchArticles.rejected, (state) => {
        state.loading = LoadingStatus.Failed;
      });
  },
});

export const getArticle = (articleId: string | undefined) => (state: RootState) => {
  if (!articleId) return undefined;

  return state.articles.articles.find((article) => article.id === Number(articleId));
};
export const getFilteredArticles = (state: RootState) => state.articles.filteredArticles;
export const getLoadingStatus = (state: RootState) => state.articles.loading;
export const getSearchText = (state: RootState) => state.articles.searchText;
export const { setSearchText } = articlesSlice.actions;

export default articlesSlice.reducer;
