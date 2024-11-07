const bio = document.querySelector(".bio-p");
const name = document.querySelector(".name");
const subs = document.querySelector(".sub");
const inputEl = document.querySelector(".inputEl");
const srchBtn = document.querySelector(".search");
const bioImg = document.querySelector(".bio-img");
const album = document.querySelector(".album-container");
const imgDiv = document.querySelector(".img-div");
const relatedEl = document.querySelector(".related");
const songs = document.querySelector(".singles");

const getArtistId = async (name) => {
  const url = `https://youtube-music-api3.p.rapidapi.com/search?q=${name}&type=artists`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "1b2faa032bmshf9e45184513a7d1p1e1281jsnc5fcc597230e",
      "x-rapidapi-host": "youtube-music-api3.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    const artistId = result.result[0].browseId;
    getArtistInfo(artistId);
  } catch (error) {
    console.error(error);
  }
};

const getArtistInfo = async (id) => {
  const url = `https://youtube-music-api3.p.rapidapi.com/getArtists?id=${id}`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "1b2faa032bmshf9e45184513a7d1p1e1281jsnc5fcc597230e",
      "x-rapidapi-host": "youtube-music-api3.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    showDetails(result);
  } catch (error) {
    console.error(error);
  }
};

srchBtn.addEventListener("click", function () {
  getArtistId(inputEl.value);
  inputEl.value = "";
  album.innerHTML = "";
  relatedEl.innerHTML = "";
  songs.innerHTML = "";
});

const showDetails = (result) => {
  bio.innerText = result.description;
  name.innerText = result.title;
  bioImg.src = result.thumbnail;
  subs.innerText = `Subscribers: ${result.subscriberCount}`;

  for (let albums of result.albums.contents) {
    album.innerHTML += `<div class="flip-card">
    <div class="flip-card-inner">
      <div class="related flip-card-front">
        <img
          class="cont-img"
          src="${albums.thumbnail}"
        />
      </div>
      <div class="flip-card-back">
        <h2 class="artist-name">${albums.title}</h2>
      </div>
    </div>
  </div>`;
  }

  for (let artist of result.fans_might_also_like.contents) {
    const cardHTML = `<div class="flip-card artist-img">
    <div class="flip-card-inner">
      <div class="related flip-card-front">
        <img
          class="cont-img "
          src="${artist.thumbnail}"
          value='${artist.browseId}'
        />
      </div>
      <div class="flip-card-back">
        <h2 class="artist-name">${artist.title}</h2>
      </div>
    </div>
  </div>`;
    relatedEl.innerHTML += cardHTML;
  }
  const artistImages = relatedEl.querySelectorAll(".flip-card-back span");
  artistImages.forEach((image) => {
    image.onclick = () => {
      console.log(image.getAttribute("class")); // Log the "value" attribute of the clicked image
    };
  });

  for (let single of result.singles.contents) {
    songs.innerHTML += `<div class="flip-card">
    <div class="flip-card-inner">
      <div class="related flip-card-front">
        <img
          class="cont-img"
          src="${single.thumbnail}"
        />
      </div>
      <div class="flip-card-back">
        <h2 class="artist-name">${single.title}</h2>
      </div>
    </div>
  </div>`;
  }
};
