let x = window.matchMedia("(max-width: 1024px)");
myFunction(x);
x.addListener(myFunction);

const galleryContainer = document.querySelector(".gallery-img");
let url =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=bfb5b9d5e29ec5e56bb78c01bc9d2bf8";
let url2;
let req = document.getElementById("search");
req.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    checkUrl();
  }
});
async function getData() {
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  showData(data);
}
getData();
async function getActor(link) {
  const res = await fetch(link);
  const data = await res.json();
  console.log(data);
  showActors(data);
}

function showData(data) {
  for (let i = 0; i < data.results.length; i++) {
    const img = document.createElement("img");
    const poster = document.createElement("div");
    const info = document.createElement("div");
    const title = document.createElement("div");
    const avarage = document.createElement("div");
    const details = document.createElement("a");
    const detailInfo = document.createElement("div");
    details.innerText = "Details";
    details.classList.add("button");
    poster.classList.add("poster");
    title.classList.add("title");
    img.classList.add("img");
    detailInfo.classList.add("detailInfo");
    avarage.classList.add("avarage");
    info.classList.add("info");
    img.src = `https://image.tmdb.org/t/p/w1280${data.results[i].poster_path}`;
    img.alt = `${data.results[i].original_title}`;
    title.innerText = data.results[i].title;
    avarage.innerText = data.results[i].vote_average;
    poster.append(img);
    poster.append(info);
    info.append(title);
    info.append(detailInfo);
    detailInfo.append(avarage);
    detailInfo.append(details);
    galleryContainer.append(poster);
    // poster.style.backgroundImage = `url(https://image.tmdb.org/t/p/w780${data.results[i].backdrop_path})`;
    if (avarage.innerText <= 5) {
      avarage.style.color = "#DD4132";
    } else if (avarage.innerText > 5 && avarage.innerText < 8) {
      avarage.style.color = "#FE840E";
    } else if (avarage.innerText >= 8) {
      avarage.style.color = "#79C753";
    }

    details.addEventListener("click", () => {
      url2 = `https://api.themoviedb.org/3/movie/${data.results[i].id}/credits?api_key=bfb5b9d5e29ec5e56bb78c01bc9d2bf8`;
      getActor(url2);
      document.querySelector(".overview").innerText = `Overview:
      ${data.results[i].overview}
      
      Release date: 
      ${data.results[i].release_date}
      `;
    });

    let closeModal = function () {
      document.querySelector(".modal").classList.add("hidden");
      document.body.style.overflowY = "scroll";
      document.querySelector(".actors").innerHTML = " ";
    };
    let openModal = function () {
      document.querySelector(".modal").classList.remove("hidden");
      document.body.style.overflowY = "hidden";
    };
    details.addEventListener("click", openModal);
    document.body.addEventListener("click", (e) => {
      if (e.target.className === "modal-body") {
        closeModal();
      }
    });
  }
}
function myFunction(x) {
  if (x.matches) {
    return false;
  } else {
    return true;
  }
}
function showActors(data) {
  if (myFunction(x)) {
    let n = 0;
    if (data.cast.length <= 15) {
      n = 5;
    } else if (data.cast.length > 15) {
      n = 10;
    }
    for (let i = 0; i < n; i++) {
      let actor = document.createElement("img");
      actor.classList.add("actor");
      actor.alt = data.cast[i].name;
      actor.src = `https://image.tmdb.org/t/p/w300/${data.cast[i].profile_path}`;
      document.querySelector(".actors").append(actor);
    }
  } else {
    document.querySelector(".actorCont").innerHTML = "";
    document.querySelector(".overview").style.maxWidth = "none";
  }
}

function checkUrl() {
  if (req.value === "") {
    galleryContainer.innerHTML = "";
    url =
      "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=bfb5b9d5e29ec5e56bb78c01bc9d2bf8";
    getData();
  } else {
    req.setAttribute("value", req.value);
    url = `https://api.themoviedb.org/3/search/movie?query=${req.value}&api_key=bfb5b9d5e29ec5e56bb78c01bc9d2bf8`;
    galleryContainer.innerHTML = " ";
    getData();
  }
}

console.log(myFunction(x));
