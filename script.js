const gift = document.getElementById('gift');
const title = document.getElementById('title');
const message = document.getElementById('message');
const gallery = document.getElementById('gallery');

gift.addEventListener('click', () => {
  gift.textContent = '🎂';
  title.textContent = 'Happy Birthday! 🎉';
  message.classList.remove('hidden');
  gallery.classList.remove('hidden');

  confetti({
    particleCount: 120,
    spread: 70,
    origin: { y: 0.6 }
  });
});