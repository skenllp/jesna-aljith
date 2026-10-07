/* ==========================================================================
   Countdown Engine — Jesna & Aljith
   Betrothal Mass: 18th April, 4:30 PM IST. The year was not specified, so the
   countdown targets the NEXT 18th April. To pin an exact year, set
   FIXED_DATE, e.g.  var FIXED_DATE = '2027-04-18T16:30:00+05:30';
   ========================================================================== */
(function () {
  'use strict';

  var FIXED_DATE = '';   // optional: exact ISO date/time with +05:30

  function nextApril18() {
    var now = new Date();
    var y = now.getUTCFullYear();
    // 18 April, 4:30 PM IST = 11:00 UTC
    var t = Date.UTC(y, 3, 18, 11, 0, 0);
    if (t <= now.getTime()) t = Date.UTC(y + 1, 3, 18, 11, 0, 0);
    return t;
  }

  var target = FIXED_DATE ? new Date(FIXED_DATE).getTime() : nextApril18();

  var section = document.getElementById('countdown');
  var elDays = document.getElementById('cd-days');
  var elHours = document.getElementById('cd-hours');
  var elMins = document.getElementById('cd-mins');
  var elSecs = document.getElementById('cd-secs');
  if (!elDays || isNaN(target)) return;

  function pad(n) { return String(n).padStart(2, '0'); }

  function updateCountdown() {
    var diff = target - Date.now();
    if (diff <= 0) {
      elDays.textContent = elHours.textContent = elMins.textContent = elSecs.textContent = '00';
      clearInterval(countdownTimer);
      return;
    }
    elDays.textContent = pad(Math.floor(diff / 86400000));
    elHours.textContent = pad(Math.floor((diff / 3600000) % 24));
    elMins.textContent = pad(Math.floor((diff / 60000) % 60));
    elSecs.textContent = pad(Math.floor((diff / 1000) % 60));
  }

  updateCountdown();
  var countdownTimer = setInterval(updateCountdown, 1000);
})();
