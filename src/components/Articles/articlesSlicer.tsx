import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store'
import {Article} from '../../types/Articles';
import * as articlesAPI from '../../api/articles';
import { getArticlesData } from "../../api/articles";
import {LoadingStatus, ErrorTypes} from "../../types/enums";

export interface ArticlesState {
  articles: Article[];
  loading: LoadingStatus;
  error: string,
}

const initialState:ArticlesState = {
  articles: [],
  loading: LoadingStatus.Idle,
  error: '',
}


export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async () => {
   return{
     articles: await articlesAPI.getArticlesData(),
   }
  });

export const articlesSlice = createSlice(
  {
    name: 'articles',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchArticles.pending, (state) => {
          state.loading = LoadingStatus.Loading;
        })
        .addCase(fetchArticles.fulfilled, (state, action) => {
          state.loading = LoadingStatus.Idle;
          console.log(action.payload.articles);
          state.articles = action.payload.articles;
        })
        .addCase(fetchArticles.rejected, (state) => {
          state.loading = LoadingStatus.Failed;
          state.error = ErrorTypes.FailedToFetch;
        });
    }

  }
);

export const getArticles = (state: RootState) => state.articles.articles;

export default articlesSlice.reducer;
