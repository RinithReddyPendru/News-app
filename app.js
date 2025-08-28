const API_KEY = "9a921d6295944a39bee31977b05746a5"; // Replace with your NewsAPI key
const newsContainer = document.getElementById("news-container");
const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("searchBtn");

async function fetchNews() {
  const query = searchInput.value || "technology"; // default topic
  const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    newsContainer.innerHTML = ""; // Clear old news

    if (!data.articles || data.articles.length === 0) {
      newsContainer.innerHTML = "<p>No news found.</p>";
      return;
    }

    data.articles.forEach(article => {
      const card = document.createElement("div");
      card.classList.add("news-card");

      card.innerHTML = `
        <img src="${article.urlToImage || 'https://via.placeholder.com/300'}" alt="News Image">
        <h3>${article.title}</h3>
        <p>${article.description || "No description available"}</p>
        <a href="${article.url}" target="_blank">Read More</a>
      `;
      newsContainer.appendChild(card);
    });
  } catch (error) {
    newsContainer.innerHTML = "<p>Error fetching news. Check console.</p>";
    console.error(error);
  }
}

// Run when button clicked
searchBtn.addEventListener("click", fetchNews);

// Load default news on page load
fetchNews();
