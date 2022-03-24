const audio = document.createElement('audio');
const player = document.querySelector('.player');
const songName = document.querySelector('.song-name');
const songArtist = document.querySelector('.song-artist');
const songImage = document.querySelector('.song-cover');
const songAlbum = document.querySelector('.song-album');
const playBtn = document.querySelector('.play-btn');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const seekWrapper = document.querySelector('.seek');
const seekBar = document.querySelector('.seek-bar');
const songTimer = document.querySelector('.timer');
const songDuration = document.querySelector('.duration');

let songIndex = 0;

function loadSong(song) {
   songTimer.innerText = '00:00';
   songDuration.innerText = '00:00';
   audio.src = song.path;
   songImage.src = song.cover;
   seekBar.value = 0;
   songName.innerText = song.name;
   songArtist.innerText = song.artist;
   songAlbum.innerText = songIndex >= 12 ? 'Coloring Book' : 'good kid, m.A.A.d city';
   setTimeout(() => {
      let duration = Math.floor(audio.duration);
      seekBar.max = audio.duration;
      songDuration.innerText = formatTime(duration);
   }, 1000);
   setInterval(() => {
      let timer = Math.floor(audio.currentTime);
      seekBar.value = audio.currentTime;
      songTimer.innerText = formatTime(timer);
   }, 1000);
}

function formatTime(time) {
   let min = Math.floor(time / 60);
   let sec = Math.floor(time % 60);
   let minutes = min < 10 ? `0${min}` : `${min}`;
   let seconds = sec < 10 ? `0${sec}` : `${sec}`;
   return `${minutes}:${seconds}`;
}

function playSong() {
   player.classList.add('playing');
   playBtn.querySelector('span').classList.remove('play-icon');
   playBtn.querySelector('span').classList.add('pause-icon');
   audio.play();
}

function pauseSong() {
   player.classList.remove('playing');
   playBtn.querySelector('span').classList.add('play-icon');
   playBtn.querySelector('span').classList.remove('pause-icon');
   audio.pause();
}

function toggleSong() {
   const isPlaying = player.classList.contains('playing');
   isPlaying ? pauseSong() : playSong();
}

function prevSong() {
   songIndex <= 0 ? songIndex = songs.length - 1 : songIndex--;
   loadSong(songs[songIndex]);
   playSong();
}

function nextSong() {
   songIndex >= songs.length - 1 ? songIndex = 0 : songIndex++;
   loadSong(songs[songIndex]);
   playSong();
}

function setProgress() {
   let timer = seekBar.value;
   let duration = audio.duration;
   let progress = (timer / duration) * 100;
   seekBar.max = duration;
   seekBar.style.background = `linear-gradient(to right, rgba(255,255,255,1) ${progress}%, rgba(255,255,255,.15) ${progress}%)`;
}

playBtn.addEventListener('click', toggleSong);
audio.addEventListener('timeupdate', setProgress);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('ended', nextSong);

loadSong(songs[songIndex]);