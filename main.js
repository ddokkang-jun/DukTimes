"use strict";

let openNavBtn = document.querySelector("#side-nav-openBtn");
let sideMenu = document.querySelector(".side-nav");
let searchInput = document.querySelector(".search-input");
let searchBtn = document.querySelector(".search-button");
let news = [];
let menus = document.querySelectorAll(".menus button");
let url;

menus.forEach((item) =>
  item.addEventListener("click", (e) => getNewsByTopic(e))
);

const getNews = async () => {
  try {
    let header = new Headers({
      "x-api-key": "VrKECsFqNvXqOoeT-ubrqiM8FUafbe6UQ1MRb2hQ2Ls",
    });
    let response = await fetch(url, { headers: header });
    let data = await response.json();
    if (response.status == 200) {
      if (data.total_hits == 0) {
        throw new Error("검색된 결과값이 없습니다.");
      }
      news = data.articles;
      render();
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    errorRender(error.message);
    console.log("잡힌 에러는", error.message);
  }
};
const searchKeyword = async () => {
  let keyword = searchInput.value;
  url = new URL(
    `https://api.newscatcherapi.com/v2/search?q=${keyword}&countries=KR&page_size=10`
  );

  getNews();
};

searchBtn.addEventListener("click", searchKeyword);

function openNav() {
  sideMenu.style.width = "250px";
}

function closeNav() {
  sideMenu.style.width = "0";
}

const getLateNews = async () => {
  url = new URL(
    `https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=business&page_size=10`
  );
  getNews();
};
getLateNews();

const getNewsByTopic = async (event) => {
  let topic = event.target.textContent.toLowerCase();
  url = new URL(
    `https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&page_size=10&topic=${topic}`
  );

  getNews();
};

const render = () => {
  let newsHTML = "";
  newsHTML = news
    .map((item) => {
      return `<div class="row news">
    <div class="col-lg-4">
      <img class="new-image-size" src="${item.media}" alt="news-image">
    </div>
    <div class="col-lg-8">
      <h2>${item.title}</h2>
      <p>${item.summary}</p>
      <div>${item.clean_url} ${item.published_date}</div>
    </div>
  </div>`;
    })
    .join("");

  document.querySelector("#new-board").innerHTML = newsHTML;
};

const errorRender = (message) => {
  let errorHtml = `<div class="alert alert-danger text-center" role="alert">
    ${message}
  </div>`;
  document.querySelector("#new-board").innerHTML = errorHtml;
};
