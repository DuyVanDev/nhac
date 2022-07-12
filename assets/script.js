const playBtn = document.querySelector(".play-toggle-btn");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const randomBtn = document.querySelector(".bi-shuffle");
const repeatBtn = document.querySelector(".bi-arrow-repeat");
const audio = document.querySelector(".audio");
const nameSong = document.querySelector(".left-desc .title");
const nameSinger = document.querySelector(".left-desc .text");
const imageSong = document.querySelector(".image-controls-left");
const seekBar = document.querySelector(".seek-bar");
let timeCurrent = document.querySelector(".time-current");
const timeEnd = document.querySelector(".time-end");
const volume = document.querySelector(".volume");
const disk = document.querySelector(".disk");
const playerControl = document.querySelector(".player-control");
const btnlogin = document.querySelector(".btn-login");
const closeTicked = document.querySelector(".close-ticked");
const bars = document.querySelector(".bars");

btnlogin.onclick = () => {
  document.querySelector(".modal-login").classList.add("active");
};

closeTicked.onclick = () => {
  document.querySelector(".modal-login").classList.remove("active");
};
let lengthMusic;
let isPlaying = false;
let currentMusic = 0;
let isRepeat = false;
let isRandom = false;

repeatBtn.onclick = () => {
  if (isRepeat == true) {
    repeatBtn.style.color = "#fff";
    isRepeat = false;
  } else {
    repeatBtn.style.color = "red";
    isRepeat = true;
  }
};

randomBtn.onclick = () => {
  if (isRandom == true) {
    randomBtn.style.color = "#fff";
    isRandom = false;
  } else {
    randomBtn.style.color = "red";
    isRandom = true;
  }
};

const renderItemSong = () => {
  let htmls = songs.map((item) => {
    return `
        <div class="item-music" onclick={handleClick(${item.id})}>
        <i class="bi bi-music-note-beamed"></i>
        <div class="info-song">
          <div class="img-song">
            <img src="${item.links.images[0].url}" alt="">
          </div>
          <div class="desc">
            <p class="title-song">${item.name}</p>
            <p class="singer-song">${item.author}</p>
          </div>
        </div>
        <div class="name-song">${item.name}</div>
        <div class="download-icon"><a href="${item.url} download"><i class="fa-solid fa-download"></a></i></div>
      </div>`;
  });
  let html = htmls.join("");
  document.querySelector(".list-music").innerHTML += html;
};

// // formatTime

const formatTime = (time) => {
  let min = Math.floor(time / 60);
  if (min < 10) {
    min = `0${min}`;
  }
  let sec = Math.floor(time % 60);
  if (sec < 10) {
    sec = `0${sec}`;
  }
  return `${min}:${sec}`;
};

const handleClick = (id) => {
  currentMusic = id;
  loadCurrentSong();
  audio.play();
};

const nextSong = () => {
  if (currentMusic >= songs.length) {
    currentMusic = 0;
  }
  currentMusic++;

  loadCurrentSong();
};

const prevSong = () => {
  if (currentMusic == 0) {
    currentMusic = songs.length;
  }
  currentMusic--;

  loadCurrentSong();
};

playBtn.onClick = () => {};

const handleEvent = () => {
  playBtn.onclick = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
  };

  audio.onplay = () => {
    isPlaying = true;
    playBtn.innerHTML = `<i class="bi bi-pause-circle icon-play"></i>`;
    disk.classList.add("active");
  };

  audio.onpause = () => {
    isPlaying = false;
    playBtn.innerHTML = `<i class="bi bi-play-circle icon-play"></i>`;
    disk.classList.remove("active");
  };

  nextBtn.onclick = () => {
    nextSong();
    audio.play();
  };

  prevBtn.onclick = () => {
    prevSong();
    audio.play();
  };

  seekBar.oninput = () => {
    let time = (seekBar.value * audio.duration) / 100;
    audio.currentTime = time;
  };

  audio.onended = function () {
    if (isRepeat) {
      audio.play();
    } else if (isRandom) {
      let newMusic = Math.floor(Math.random() * songs.length);
      currentMusic = newMusic;
      loadCurrentSong();
      audio.play();
    } else {
      nextSong();
      audio.play();
    }
  };

  audio.ontimeupdate = () => {
    seekBar.value = (audio.currentTime * 100) / audio.duration;
    timeCurrent.innerHTML = formatTime(audio.currentTime);

    setTimeout(() => {
      timeEnd.innerHTML = formatTime(audio.duration);
    }, 300);
  };
  volume.oninput = () => {
    audio.volume = volume.value / 100;
  };
};

const loadCurrentSong = () => {
  const ms = document.querySelectorAll(".item-music");
  seekBar.value = 0;
  nameSong.innerHTML = songs[currentMusic].name;
  nameSinger.innerHTML = songs[currentMusic].author;
  imageSong.src = songs[currentMusic].links.images[0].url;
  timeCurrent.innerHTML = "00:00";
  audio.src = songs[currentMusic].url;
  disk.src = songs[currentMusic].links.images[1].url;
  ms.forEach((item) => {
    item.classList.remove("active");
    ms[currentMusic].classList.add("active");
  });
};

const start = () => {
  renderItemSong();
  loadCurrentSong();
  handleEvent();
};

start();
