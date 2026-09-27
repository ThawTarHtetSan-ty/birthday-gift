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

// Photo Lightbox Elements
const lightboxModal = document.getElementById('lightbox-modal');
const lightboxImg = document.getElementById('lightbox-img');
const closeLightbox = document.getElementById('close-lightbox');

function playSongSafely() {
  if (!music) {
    console.error("Audio element #bday-music not found in index.html!");
    return;
  }

  // Force sound on: un-mute and set full volume
  music.muted = false;
  music.volume = 1.0;

  const playPromise = music.play();

  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        console.log("Audio is actively playing at volume:", music.volume);
      })
      .catch((err) => {
        console.error("hbd.mp3 could not play. Make sure the file 'hbd.mp3' is uploaded in the same folder as index.html.", err);
      });
  }
}

// Surface a clear signal in the console if the file itself is missing/broken,
// instead of failing silently.
if (music) {
  music.addEventListener('error', () => {
    console.error("Could not load hbd.mp3 — check that it's named exactly 'hbd.mp3' and sits in the same folder as index.html, index.js and style.css.");
  });
}

function dismissModal() {
  if (modal) modal.classList.add('hidden');
}

// 1. Music Modal Controls
if (playMusicBtn) {
  playMusicBtn.addEventListener('click', () => {
    playSongSafely();
    dismissModal();
  });
}

if (skipMusicBtn) {
  skipMusicBtn.addEventListener('click', () => {
    dismissModal();
  });
}

// 2. Open Gift Button
if (openGiftBtn) {
  openGiftBtn.addEventListener('click', () => {
    if (welcomeScreen) welcomeScreen.classList.add('hidden');
    if (giftScreen) giftScreen.classList.remove('hidden');

    if (music && music.paused) {
      playSongSafely();
    }

    if (typeof confetti === 'function') {
      confetti({
        particleCount: 160,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  });
}

// 3. Photo Zoom Lightbox Modal
const photos = document.querySelectorAll('.photo');
photos.forEach(img => {
  img.addEventListener('click', () => {
    if (lightboxImg && lightboxModal) {
      lightboxImg.src = img.src;
      lightboxModal.classList.remove('hidden');
    }
  });
});

if (lightboxModal) {
  lightboxModal.addEventListener('click', (e) => {
    if (e.target !== lightboxImg) {
      lightboxModal.classList.add('hidden');
    }
  });
}

if (closeLightbox) {
  closeLightbox.addEventListener('click', () => {
    if (lightboxModal) lightboxModal.classList.add('hidden');
  });
}

// 4. Reasons Flip Cards
const revealCards = document.querySelectorAll('.reveal-card');
revealCards.forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('revealed');

    if (card.classList.contains('revealed') && typeof confetti === 'function') {
      confetti({
        particleCount: 30,
        spread: 45,
        origin: { y: 0.8 }
      });
    }
  });
});

// 5. Letter Envelope Click
if (envelopeWrapper && letterPaper) {
  envelopeWrapper.addEventListener('click', () => {
    letterPaper.classList.remove('hidden');
    envelopeWrapper.classList.add('hidden');

    if (typeof confetti === 'function') {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.7 }
      });
    }

    letterPaper.scrollIntoView({ behavior: 'smooth' });
  });
}

// 6. Click "ONE LAST THING" Button
if (finalBoxBtn) {
  finalBoxBtn.addEventListener('click', () => {
    if (finalScreen) finalScreen.classList.remove('hidden');
    if (musicWidget) musicWidget.classList.remove('hidden');
    if (finalBoxBtn.parentElement) finalBoxBtn.parentElement.classList.add('hidden');

    if (typeof confetti === 'function') {
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 }
      });
    }

    if (finalScreen) {
      finalScreen.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// 7. Floating Music Player Controls
if (music) {
  music.addEventListener('timeupdate', () => {
    if (music.duration && widgetProgress) {
      const percentage = (music.currentTime / music.duration) * 100;
      widgetProgress.style.width = percentage + '%';
    }
  });

  if (playPauseToggle) {
    playPauseToggle.addEventListener('click', () => {
      if (music.paused) {
        playSongSafely();
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
}