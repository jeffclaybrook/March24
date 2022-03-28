const audio = document.querySelector('audio');
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

let currentSong = Math.floor((Math.random() * songs.length) + 1);

window.addEventListener('load', () => {
   setSong(currentSong);
})

function setSong(i) {
   seekBar.value = 0;
   let song = songs[i];
   currentSong = i;
   audio.src = song.path;
   songName.innerHTML = song.name;
   songImage.src = song.cover;
   songArtist.innerHTML = currentSong >= 12 ? 'Chance the Rapper' : 'Kendrick Lamar';
   songAlbum.innerHTML = currentSong >= 12 ? 'Coloring Book' : 'good kid, m.A.A.d city';
   songTimer.innerHTML = '00:00';
   songDuration.innerHTML = song.duration;
   setTimeout(() => {
      seekBar.max = Math.floor(audio.duration);
   }, 300);
}

function formatTime(time) {
   let min = Math.floor(time / 60);
   let sec = Math.floor(time % 60);
   let minutes = min < 10 ? `0${min}` : `${min}`;
   let seconds = sec < 10 ? `0${sec}` : `${sec}`;
   return `${minutes}:${seconds}`;
}

setInterval(() => {
   seekBar.value = Math.floor(audio.currentTime);
   songTimer.innerHTML = formatTime(audio.currentTime);
}, 500);

function seekSong() {
   audio.currentTime = seekBar.value;
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
   currentSong <= 0 ? currentSong = songs.length - 1 : currentSong--;
   setSong(currentSong);
   playSong();
}

function nextSong() {
   currentSong >= songs.length - 1 ? currentSong = 0 : currentSong++;
   setSong(currentSong);
   playSong();
}

playBtn.addEventListener('click', toggleSong);
seekBar.addEventListener('change', seekSong);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('ended', nextSong);