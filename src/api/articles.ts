const BASE_URL = "https://api.spaceflightnewsapi.net/v3/articles"

export const getArticlesData = () => {
  return fetch(BASE_URL)
    .then(response=> response.json());
}
