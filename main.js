'use strict'

let news = [];

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
