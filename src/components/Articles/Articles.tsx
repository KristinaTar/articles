import React from "react";
import { useAppSelector } from "../../app/hooks";
import { getFilteredArticles, getLoadingStatus, getSearchText } from "../../app/articlesSlicer";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Grid, styled, Typography } from "@mui/material";
import styles from "./Articles.module.scss";
import calendar_icon from "../../images/calendar_icon.svg";
import arrow_right from "../../images/Arrow_Right.svg";
import { convertDate, getHighlightedText } from "../../scripts/helpers";
import Filter from "../Filter/Filter";
import { Link } from "react-router-dom";
import { LoadingStatus } from "../../types/enums";

const CardContentNoPadding = styled(CardContent)(`
  padding: 25px;
`);

const Articles: React.FC = () => {
  const filteredArticles = useAppSelector(getFilteredArticles);
  const loadingStatus = useAppSelector(getLoadingStatus);
  const searchText = useAppSelector(getSearchText);

  return (
    <>
      <Filter />
      <Grid container spacing={"45px"} columns={{ xs: 4, sm: 8, md: 12 }} justifyContent="center">
        {loadingStatus === LoadingStatus.Failed ? (
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            Failed to load
          </Typography>
        ) : (
          filteredArticles.map((article) => (
            <Grid item key={article.id} style={{ maxWidth: "100%" }}>
              <Card key={article.id} className={styles.card__container}>
                <CardMedia
                  component="img"
                  height="217"
                  image={article.imageUrl}
                  alt="articleImage"
                />
                <CardContentNoPadding className={styles.card__content}>
                  <div className={styles.card__date}>
                    <img src={calendar_icon} alt="icon" className={styles.card__calendarIcon} />
                    {convertDate(article.publishedAt)}
                  </div>
                  <div className={styles.card__title}>
                    {getHighlightedText(article.title, searchText)}
                  </div>
                  <div className={styles.card__description}>
                    {getHighlightedText(
                      article.summary.length < 100
                        ? article.summary
                        : article.summary.slice(0, 97) + "...",
                      searchText
                    )}
                  </div>
                  <Link to={"/article/" + article.id}>
                    <div className={styles.card__button}>
                      Read more
                      <img
                        className={styles.card__buttonArrow}
                        src={arrow_right}
                        alt="arrowRight"
                      />
                    </div>
                  </Link>
                </CardContentNoPadding>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </>
  );
};

export default Articles;
