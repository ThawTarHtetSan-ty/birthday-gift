const modal = document.getElementById('music-modal');
const playMusicBtn = document.getElementById('play-music-btn');
const skipMusicBtn = document.getElementById('skip-music-btn');

const gift = document.getElementById('gift');
const title = document.getElementById('title');
const message = document.getElementById('message');
const gallery = document.getElementById('gallery');
const music = document.getElementById('bday-music');

function dismissModal() {
  modal.classList.add('hidden');
}

playMusicBtn.addEventListener('click', () => {
  if (music) {
    music.play().catch(err => console.log('Audio autoplay blocked:', err));
  }
  dismissModal();
});

skipMusicBtn.addEventListener('click', () => {
  dismissModal();
});

gift.addEventListener('click', () => {
  if (music && music.paused) {
    music.play().catch(err => console.log('Audio error:', err));
  }

  gift.textContent = '🎂 <span style="font-size:50px">�🎂)</span>';
  gift.textContent = '🎂';
  title.textContent = 'Happy Birthday! 🎊';
  message.classList.remove('hidden');
  gallery.classList.remove('hidden');

  confetti({
    particleCount: 120,
    spread: 70,
    origin: { y: 0.6 }
  });
});
