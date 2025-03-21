function change() {
    var userInput = document.getElementById("input").value;
    document.getElementById("Text").innerText = userInput;
}


document.querySelector('.button').addEventListener('click', change);


const API_KEY = "8b6dcfc2e7ed42748748024d6bfa27b2";
const CATEGORY = "Technology"; 
const NEWS_API_URL = `https://newsapi.org/v2/top-headlines?category=${CATEGORY}&apiKey=${API_KEY}&pageSize=10`;


function News() {
    const newsSection = document.createElement('div');
    newsSection.className = 'row mb-4';
    newsSection.innerHTML = `
        <div class="col-12">
            <div class="block">
                <h2 class="mb-3">Latest ${CATEGORY.charAt(0).toUpperCase() + CATEGORY.slice(1)} News</h2>
                <div id="news-container" class="row">
                    <div class="col-12 text-center">
                        <div class="spinner-border" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    
    document.querySelector('.calabaza').appendChild(newsSection);
    
    
    fetch(NEWS_API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayNews(data.articles);
        })
        .catch(error => {
            document.getElementById('news-container').innerHTML = `
                <div class="col-12">
                    <div class="alert alert-danger" role="alert">
                        Failed to load news: ${error.message}
                    </div>
                </div>
            `;
            console.error('Error fetching news:', error);
        });
}


function displayNews(articles) {
    const newsContainer = document.getElementById('news-container');
    if (!articles || articles.length === 0) {
        newsContainer.innerHTML = `
            <div class="col-12">
                <div class="alert alert-info" role="alert">
                    No news articles found for this category.
                </div>
            </div>
        `;
        return;
    }
    
    
    newsContainer.innerHTML = '';
    
    
    articles.slice(0, 11).forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.className = 'col-md-6 col-lg-4 mb-3';
        
        articleElement.innerHTML = `
            <div class="card h-100">
                <div class="card-body">
                    <h5 class="card-title">${article.title || 'No Title'}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${article.source.name || 'Unknown Source'}</h6>
                    <p class="card-text">${article.description || 'No description available'}</p>
                </div>
                <div class="card-footer">
                    <a href="${article.url}" class="btn btn-sm btn-primary" target="_blank">Read More</a>
                </div>
            </div>
        `;
        
        newsContainer.appendChild(articleElement);
    });
}

document.addEventListener('DOMContentLoaded', News);