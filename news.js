function produceDefaultUrl() {
  let url = `https://newsapi.org/v2/top-headlines?apiKey=e80cb128944d4bd683a8cd4b5d675d74`;

  // Look at all url query parameters and add them to the url above to respect language/country/category/page/etc.
  const urlParams = window.location.search.split("?")[1];
  console.log("here", window);
  // console.log("here", urlParams);
  // Guard against no url params and default to english.
  if (!urlParams) return url + "&language=en";

  urlParams.split("&").map((p) => {
    // "Massage data" into workable form.
    const [key, value] = p.split("=");
    url += `&${key}=${value}`;
  });

  return url;
}
let url = produceDefaultUrl();

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
