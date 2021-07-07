const url =
  "https://newsapi.org/v2/top-headlines?country=us&apiKey=e80cb128944d4bd683a8cd4b5d675d74";

async function getArticles() {
  const response = await fetch(url);
  const json = await response.json();
  const { articles } = json;
  console.log({ json });
  document.getElementById("title").innerHTML = `CoderNews (${articles.length})`;
  const articlesHTML = articles.map(renderArticle);
  console.log(articlesHTML);
  document.getElementById("newsList").innerHTML = articlesHTML.join("");
}

getArticles();
function renderArticle(article) {
  if (article.urlToImage != undefined) {
    return `
    <li class="mb-3 align-self-center article">
        ${article.title}
        <img src="${article.urlToImage}" alt="Snow" width="900" 
        height="500"/>
      </div>
        <i class="fa fa-edit fa-xs"></i><h4 class="mb-0">${article.author}</h4>
        <p><i class="fa fa-envelope"></i>${article.publishedAt}</p>
        <h6 class="mb-0"><a href="${article.url}">${article.source.name}</a></h6>
      <p><i class="fa fa-envelope"></i>${article.content}</p>

    </li>
  `;
  }
}
