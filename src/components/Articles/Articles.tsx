import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchArticles, getArticles, getFilteredArticles, getSearchText, setSearchText } from "./articlesSlicer";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Grid, styled } from '@mui/material';
import styles from './Articles.module.scss';
import calendar_icon from '../../images/calendar_icon.svg';
import arrow_right from '../../images/Arrow_Right.svg';
import { Article } from "../../types/Articles";
import { convertDate, getHighlightedText } from "../../scripts/helpers";

const CardContentNoPadding = styled(CardContent)(`
  padding: 25px;
`);

const Articles: React.FC = () => {
  const filteredArticles = useAppSelector(getFilteredArticles);
  const searchText = useAppSelector(getSearchText);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchArticles());
  }, []);


  return (
    <Grid
      container
      spacing={'45px'}
      columns={{ xs: 4, sm: 8, md: 12 }}
      justifyContent="center"
    >
      {filteredArticles.map(article => (
        <Grid item style={{ maxWidth: '100%' }}>
          <Card className={styles.card__container}>
            <CardMedia
              component="img"
              height="217"
              image={article.imageUrl}
              alt="articleImage"
            />
            <CardContentNoPadding className={styles.card__content}>
              <div className={styles.card__date}>
                <img src={calendar_icon} alt="icon" className={styles.card__calendarIcon}/>
                {convertDate(article.publishedAt)}
              </div>
              <div className={styles.card__title}>
                {getHighlightedText(article.title, searchText)}
              </div>
              <div className={styles.card__description}>
                {getHighlightedText(
                  article.summary.length < 100 ? article.summary : article.summary.slice(0, 97) + "...",
                  searchText
                )}
              </div>
              <div className={styles.card__button}>
                Read more
                <img className={styles.card__buttonArrow} src={arrow_right} alt="arrowRight"/>
              </div>
            </CardContentNoPadding>

          </Card>
        </Grid>

      ))}

    </Grid>
  );
};

export default Articles;
