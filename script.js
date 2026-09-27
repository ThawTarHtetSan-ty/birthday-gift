// Modal Elements
const modal = document.getElementById('music-modal');
const playMusicBtn = document.getElementById('play-music-btn');
const skipMusicBtn = document.getElementById('skip-music-btn');

// Screens & Buttons
const welcomeScreen = document.getElementById('welcome-screen');
const giftScreen = document.getElementById('gift-screen');
const openGiftBtn = document.getElementById('open-gift-btn');
const music = document.getElementById('bday-music');

// Letter & Envelope Elements
const envelopeWrapper = document.getElementById('envelope-wrapper');
const letterPaper = document.getElementById('letter-paper');

// Final Celebration Box & Music Widget
const finalBoxBtn = document.getElementById('final-box-btn');
const finalScreen = document.getElementById('final-screen');
const musicWidget = document.getElementById('music-player-widget');
const playPauseToggle = document.getElementById('play-pause-toggle');
const widgetProgress = document.getElementById('widget-progress');

function dismissModal() {
  modal.classList.add('hidden');
}

// 1. Music Modal Controls
playMusicBtn.addEventListener('click', () => {
  if (music) {
    music.play().catch(err => console.log('Audio blocked:', err));
  }
  dismissModal();
});

skipMusicBtn.addEventListener('click', () => {
  dismissModal();
});

// 2. Open Gift Button (Reveals Gallery, Reasons, and Envelope)
openGiftBtn.addEventListener('click', () => {
  welcomeScreen.classList.add('hidden');
  giftScreen.classList.remove('hidden');

  if (music && music.paused) {
    music.play().catch(err => console.log('Audio error:', err));
  }

  confetti({
    particleCount: 160,
    spread: 80,
    origin: { y: 0.6 }
  });
});

// 3. Reasons You're Awesome Cards
const revealCards = document.querySelectorAll('.reveal-card');

revealCards.forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('revealed');

    if (card.classList.contains('revealed')) {
      confetti({
        particleCount: 30,
        spread: 45,
        origin: { y: 0.8 }
      });
    }
  });
});

// 4. Click Envelope to Open Letter
envelopeWrapper.addEventListener('click', () => {
  letterPaper.classList.remove('hidden');
  envelopeWrapper.classList.add('hidden');

  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.7 }
  });

  letterPaper.scrollIntoView({ behavior: 'smooth' });
});

// 5. Click "ONE LAST THING" Button
finalBoxBtn.addEventListener('click', () => {
  finalScreen.classList.remove('hidden');
  musicWidget.classList.remove('hidden');
  finalBoxBtn.parentElement.classList.add('hidden');

  // Trigger grand finale confetti
  confetti({
    particleCount: 200,
    spread: 100,
    origin: { y: 0.6 }
  });

  finalScreen.scrollIntoView({ behavior: 'smooth' });
});

// 6. Floating Music Player Controls
if (music) {
  music.addEventListener('timeupdate', () => {
    if (music.duration) {
      const percentage = (music.currentTime / music.duration) * 100;
      widgetProgress.style.width = percentage + '%';
    }
  });

  playPauseToggle.addEventListener('click', () => {
    if (music.paused) {
      music.play();
      playPauseToggle.textContent = '❚❚';
    } else {
      music.pause();
      playPauseToggle.textContent = '▶';
    }
  });

  music.addEventListener('play', () => {
    playPauseToggle.textContent = '❚❚';
  });

  music.addEventListener('pause', () => {
    playPauseToggle.textContent = '▶';
  });
}