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
}

getLateNews();
