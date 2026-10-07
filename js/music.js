/* ==========================================================================
   Floating Audio Player — Jesna & Aljith
   Note: place your MP3 file at music/betrothal-music.mp3 to enable playback.
   ========================================================================== */
(function () {
  'use strict';

  var audioToggle = document.getElementById('audioToggle');
  var bgAudio = document.getElementById('bgAudio');
  if (!audioToggle || !bgAudio) return;

  var isPlaying = false;
  var fadeInterval = null;
  var TARGET_VOLUME = 0.6;

  bgAudio.volume = 0;

  function clearFade() {
    if (fadeInterval) {
      clearInterval(fadeInterval);
      fadeInterval = null;
    }
  }

  function fadeAudio(direction) {
    clearFade();
    var step = 0.05;
    fadeInterval = setInterval(function () {
      if (direction === 'in') {
        bgAudio.volume = Math.min(TARGET_VOLUME, bgAudio.volume + step);
        if (bgAudio.volume >= TARGET_VOLUME) clearFade();
      } else {
        bgAudio.volume = Math.max(0, bgAudio.volume - step);
        if (bgAudio.volume <= 0) {
          bgAudio.pause();
          clearFade();
        }
      }
    }, 80);
  }

  function playMusic() {
    bgAudio.play().catch(function () {
      /* Autoplay blocked or asset missing — fail silently */
    });
    fadeAudio('in');
    audioToggle.classList.add('playing');
    audioToggle.setAttribute('aria-pressed', 'true');
    audioToggle.setAttribute('aria-label', 'Pause betrothal music');
    audioToggle.innerHTML = '<i class="fa-solid fa-pause"></i>';
    isPlaying = true;
  }

  function pauseMusic() {
    fadeAudio('out');
    audioToggle.classList.remove('playing');
    audioToggle.setAttribute('aria-pressed', 'false');
    audioToggle.setAttribute('aria-label', 'Play betrothal music');
    audioToggle.innerHTML = '<i class="fa-solid fa-music"></i>';
    isPlaying = false;
  }

  audioToggle.addEventListener('click', function () {
    if (!isPlaying) { playMusic(); } else { pauseMusic(); }
  });

  var musicController = { play: playMusic, pause: pauseMusic, isPlaying: function () { return isPlaying; } };
  window.BetrothalMusic = musicController;
})();
