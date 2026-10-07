/* ==========================================================================
   Jesna & Aljith — app.js
   Invitation cover · GSAP ScrollTrigger reveals · Lightbox · RSVP · Floating UI
   ========================================================================== */
(function () {
  'use strict';

  var heroTimeline;

  /* ------------------------------------------------------------------ */
  /* 1. Invitation Cover Overlay                                        */
  /* ------------------------------------------------------------------ */
  var btnOpenInvitation = document.getElementById('btnOpenInvitation');
  var invitationCover = document.getElementById('invitationCover');

  if (invitationCover) {
    document.body.style.overflow = 'hidden';
  }

  function openInvitation() {
    if (!invitationCover) return;

    invitationCover.style.opacity = '0';
    invitationCover.style.pointerEvents = 'none';
    document.body.style.overflow = '';

    if (heroTimeline) { heroTimeline.play(); }

    if (window.BetrothalMusic && !window.BetrothalMusic.isPlaying()) {
      window.BetrothalMusic.play();
    }

    setTimeout(function () {
      invitationCover.remove();
    }, 800);
  }

  if (btnOpenInvitation) {
    btnOpenInvitation.addEventListener('click', openInvitation);
  }

  /* ------------------------------------------------------------------ */
  /* 2. GSAP ScrollTrigger Reveal Sequences                             */
  /* ------------------------------------------------------------------ */
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    heroTimeline = gsap.timeline({ paused: true, defaults: { ease: 'power2.out', duration: 0.9 } })
      .to('.hero [data-reveal]', { y: 0, opacity: 1, stagger: 0.15 });

    if (!document.getElementById('invitationCover')) {
      heroTimeline.play();
    }

    gsap.utils.toArray('main [data-reveal], .ashirwad [data-reveal]').forEach(function (el) {
      gsap.to(el, {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' }
      });
    });

    var staggerGroups = {};
    gsap.utils.toArray('[data-reveal-stagger]').forEach(function (el) {
      var parent = el.closest('section');
      var key = parent ? parent.id || parent.className : 'default';
      if (!staggerGroups[key]) staggerGroups[key] = [];
      staggerGroups[key].push(el);
    });

    Object.keys(staggerGroups).forEach(function (key) {
      var items = staggerGroups[key];
      gsap.to(items, {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: { trigger: items[0], start: 'top 85%', toggleActions: 'play none none reverse' }
      });
    });
  } else {
    document.querySelectorAll('[data-reveal], [data-reveal-stagger]').forEach(function (el) {
      el.style.opacity = 1;
      el.style.transform = 'none';
    });
  }

  /* ------------------------------------------------------------------ */
  /* 3. RSVP Form                                                       */
  /* ------------------------------------------------------------------ */
  var rsvpForm = document.getElementById('rsvpForm');
  var rsvpStatus = document.getElementById('rsvpStatus');

  // To connect this form to Google Sheets:
  // 1. Create a Google Apps Script Web App that appends form data to a Sheet.
  // 2. Replace GOOGLE_SHEET_ENDPOINT below with your deployed Web App URL.
  var GOOGLE_SHEET_ENDPOINT = '';

  if (rsvpForm) {
    rsvpForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = {
        name: document.getElementById('rsvpName').value.trim(),
        phone: document.getElementById('rsvpPhone').value.trim(),
        guests: document.getElementById('rsvpGuests').value.trim(),
        message: document.getElementById('rsvpMessage').value.trim(),
        timestamp: new Date().toISOString()
      };

      if (GOOGLE_SHEET_ENDPOINT) {
        fetch(GOOGLE_SHEET_ENDPOINT, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        }).catch(function () { /* fail silently, still show confirmation */ });
      } else {
        console.log('RSVP submitted (connect GOOGLE_SHEET_ENDPOINT to store this):', data);
      }

      if (rsvpStatus) {
        rsvpStatus.textContent = 'Thank you, ' + (data.name || 'friend') + '! Your RSVP has been received.';
      }
      rsvpForm.reset();
    });
  }

  /* ------------------------------------------------------------------ */
  /* 5. Back to Top                                                     */
  /* ------------------------------------------------------------------ */
  var backToTop = document.getElementById('backToTop');
  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();
