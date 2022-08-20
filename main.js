'use strict'

let openNavBtn = document.querySelector('#side-nav-openBtn');
let sideMenu = document.querySelector('.side-nav');

let news = [];

// openNavBtn.addEventListener('click', openNav());

function openNav(){
  sideMenu.style.width = '250px';
}

function closeNav(){
  sideMenu.style.width = '0';
}

const getLateNews = async() => {
  let url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=business&page_size=10`);
  console.log(url);
  let header = new Headers({'x-api-key':'VrKECsFqNvXqOoeT-ubrqiM8FUafbe6UQ1MRb2hQ2Ls'});

  let response = await fetch(url, { headers:header });
  let data = await response.json();
  console.log(data);

  news = data.articles;
  console.log(news);
  
  render();
}

const render = () => {
  let newsHTML = '';
  newsHTML = news.map((item) => {
    return `<div class="row news">
    <div class="col-lg-4">
      <img class="new-image-size" src="${item.media}" alt="news-image">
    </div>
    <div class="col-lg-8">
      <h2>${item.title}</h2>
      <p>${item.summary}</p>
      <div>${item.clean_url} ${item.published_date}</div>
    </div>
  </div>`
  }).join('');

  document.querySelector('#new-board').innerHTML = newsHTML;
}

getLateNews();

