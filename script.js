document.addEventListener('DOMContentLoaded', () => {

    const mapUrl = "https://maps.app.goo.gl/bcmjquzEc4HA97F66";
    const eventDate = new Date("2026-09-18T19:00:00+03:00");

    const splashScreen = document.getElementById('splashScreen');
    const giftBox = document.getElementById('giftBox');
    const invitationContent = document.getElementById('invitationContent');
    const bgMusic = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    const mapBtn = document.getElementById('viewLocation');
    const calendarBtn = document.getElementById('addToCalendar');

    mapBtn.href = mapUrl;

    // --- تفاعل الفتح ---
    splashScreen.addEventListener('click', () => {
        giftBox.classList.add('fly-away');
        createBalloons();
        playAudioSafely();

        setTimeout(() => {
            splashScreen.style.opacity = '0';
            invitationContent.classList.remove('hidden');
            
            setTimeout(() => {
                invitationContent.classList.add('visible');
            }, 50);

            setTimeout(() => {
                splashScreen.style.display = 'none';
            }, 800);
        }, 500);
    });

    // --- إطلاق البالونات الوردي والذهبية ---
    function createBalloons() {
        const colors = ['#f8bbd0', '#f48fb1', '#e91e63', '#d4af37', '#ffffff'];
        for (let i = 0; i < 35; i++) {
            const balloon = document.createElement('div');
            balloon.classList.add('balloon');
            balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            balloon.style.left = Math.random() * 100 + 'vw';
            balloon.style.animationDelay = Math.random() * 0.4 + 's';
            balloon.style.animationDuration = (Math.random() * 1.5 + 2) + 's';
            splashScreen.appendChild(balloon);
        }
    }

    // --- التشغيل والصوت ---
    let isPlaying = false;

    function playAudioSafely() {
        bgMusic.play().then(() => {
            isPlaying = true;
            musicToggle.textContent = '🎵';
        }).catch(() => {
            isPlaying = false;
            musicToggle.textContent = '🔇';
        });
    }

    musicToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        if (isPlaying) {
            bgMusic.pause();
            musicToggle.textContent = '🔇';
        } else {
            bgMusic.play();
            musicToggle.textContent = '🎵';
        }
        isPlaying = !isPlaying;
    });

    // --- العداد التنازلي ---
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    function updateCountdown() {
        const diff = eventDate.getTime() - Date.now();

        if (diff <= 0) {
            daysEl.textContent = "00";
            hoursEl.textContent = "00";
            minutesEl.textContent = "00";
            secondsEl.textContent = "00";
            return;
        }

        const total = Math.floor(diff / 1000);
        daysEl.textContent = String(Math.floor(total / 86400)).padStart(2, '0');
        hoursEl.textContent = String(Math.floor((total % 86400) / 3600)).padStart(2, '0');
        minutesEl.textContent = String(Math.floor((total % 3600) / 60)).padStart(2, '0');
        secondsEl.textContent = String(total % 60).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    // --- زر التقويم ---
    calendarBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const startStr = "20260918T160000Z";
        const endStr = "20260918T180000Z";

        const icsData = 
`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Talia Sebou Invitation//AR
BEGIN:VEVENT
UID:talia-sebou-2026
DTSTAMP:20260915T000000Z
DTSTART:${startStr}
DTEND:${endStr}
SUMMARY:حفل سبوع تاليا سيد محمد عبدالجواد
DESCRIPTION:يسعدنا مشاركتكم فرحتنا بحفل سبوع تاليا
LOCATION:${mapUrl}
END:VEVENT
END:VCALENDAR`;

        const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'sebou-talia.ics';
        a.click();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
    });
});
