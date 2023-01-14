import React from "react";
import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { getArticle } from "../Articles/articlesSlicer";
import styles from "./Article.module.scss";
import arrow_left from "../../images/Arrow_Left.svg";
import { Card, Typography } from "@mui/material";

const Article: React.FC = () => {
  const { articleId } = useParams();
  const article = useAppSelector(getArticle(articleId));

  return (
    <>
      <Card className={styles.article__container}>
        {!article ? (
          <Typography variant="h4" sx={{ textAlign: "center" }}>
            No such article
          </Typography>
        ) : (
          <>
            <img
              className={styles.article__headerImage}
              src={article.imageUrl}
              alt="articleImage"
            />

            <div className={styles.article__title}>{article.title}</div>
            <div className={styles.article__text}>
              <p>{article.summary}</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate totam,
                voluptatem! Architecto atque aut impedit nam quas quasi quis voluptatibus
                voluptatum. Accusamus aliquid asperiores consequatur, cupiditate debitis deserunt
                dignissimos doloremque dolorum ea, eius expedita facilis id, illo impedit inventore
                iusto labore magnam maiores nesciunt omnis quibusdam sunt tenetur. Aperiam,
                consequuntur!
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum exercitationem
                facere fugiat maiores, modi natus, nisi non omnis optio, provident quam quisquam
                quos recusandae sit ut? Dolorem doloribus, est eum fuga ipsam iste itaque nemo
                officiis sequi ullam? Ad animi, architecto asperiores at blanditiis cupiditate
                debitis dicta dolorum eligendi enim expedita, impedit ipsum natus nobis obcaecati
                perferendis quam quia, repellat similique sint soluta sunt tempora velit voluptatem
                voluptatum! Beatae esse inventore molestiae natus sapiente sequi voluptatem. Debitis
                minima numquam quas ullam! Aperiam, at consequatur dolorem doloremque esse ex itaque
                iure perferendis possimus qui, quod saepe, sequi soluta tempore vero? Est.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum eligendi eos est
                eveniet ipsum nemo nihil perspiciatis possimus quam sapiente.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium assumenda at
                atque, debitis, deserunt ducimus ea earum ex illum in inventore ipsum labore
                laboriosam maxime minima minus mollitia nemo nisi nobis nostrum nulla odio omnis
                pariatur possimus provident quidem quisquam repellat reprehenderit repudiandae sint
                sit sunt temporibus tenetur ullam unde voluptatem voluptatum. Accusantium animi
                dicta facere minima placeat quidem. Aut consectetur debitis delectus dignissimos ea
                eaque eligendi et exercitationem facere, libero, maiores nihil obcaecati officia
                quod rem sapiente temporibus totam unde vero voluptatem. Adipisci aliquid animi
                corporis cupiditate distinctio dolores incidunt, inventore itaque libero minus
                molestiae molestias nihil officia perferendis possimus praesentium quaerat quia quo
                quod sint tempore totam ut, voluptatem. Adipisci, ipsam, quo? Enim id minima nostrum
                quaerat rem!
              </p>
            </div>
          </>
        )}
      </Card>
      <Link to={"/"}>
        <div className={styles.article__button}>
          <img className={styles.article__buttonArrow} src={arrow_left} alt="arrowLeft" />
          Back to homepage
        </div>
      </Link>
    </>
  );
};

export default Article;
