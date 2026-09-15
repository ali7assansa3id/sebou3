document.addEventListener('DOMContentLoaded', () => {

    // 1. رابط Google Maps المباشر (استبدل الرابط أدناه برابط الموقع لاحقًا)
    const mapUrl = "https://maps.google.com";

    // 2. موعد الحفل: الجمعة 18 سبتمبر 2026 الساعة 7:00 مساءً
    const eventDate = new Date("2026-09-18T19:00:00+03:00");

    const splashScreen = document.getElementById('splashScreen');
    const giftBox = document.getElementById('giftBox');
    const musicPlayer = document.getElementById('musicPlayer');
    const musicToggle = document.getElementById('musicToggle');
    const mapBtn = document.getElementById('mapBtn');
    const calendarBtn = document.getElementById('calendarBtn');

    mapBtn.href = mapUrl;

    // --- حركة طيران البوكس والبالونات وتشغيل الموسيقى عند الضغط ---
    splashScreen.addEventListener('click', () => {
        giftBox.classList.add('fly-away');
        createBalloons();

        if (musicPlayer) {
            musicPlayer.play().then(() => {
                isPlaying = true;
            }).catch(err => {
                console.log("المتصفح يمنع التشغيل التلقائي للصوت:", err);
            });
        }

        setTimeout(() => {
            splashScreen.style.opacity = '0';
            setTimeout(() => {
                splashScreen.style.display = 'none';
            }, 800);
        }, 600);
    });

    // إطلاق البالونات
    function createBalloons() {
        const colors = ['#f8bbd0', '#f48fb1', '#ec407a', '#e5c158', '#ffffff'];
        for (let i = 0; i < 40; i++) {
            const balloon = document.createElement('div');
            balloon.classList.add('balloon');
            balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            balloon.style.left = Math.random() * 100 + 'vw';
            balloon.style.animationDelay = Math.random() * 0.4 + 's';
            balloon.style.animationDuration = (Math.random() * 1.5 + 2) + 's';
            splashScreen.appendChild(balloon);
        }
    }

    // زر التحكم بالموسيقى
    let isPlaying = false;
    musicToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        if (isPlaying) {
            musicPlayer.pause();
            isPlaying = false;
        } else {
            musicPlayer.play();
            isPlaying = true;
        }
    });

    // --- العداد التنازلي ---
    function pad(n) { return String(Math.max(0, n)).padStart(2, "0"); }

    function updateCountdown() {
        const diff = eventDate.getTime() - Date.now();
        if (diff <= 0) {
            ["days", "hours", "minutes", "seconds"].forEach(id => {
                document.getElementById(id).textContent = "00";
            });
            return;
        }
        const total = Math.floor(diff / 1000);
        document.getElementById("days").textContent = pad(Math.floor(total / 86400));
        document.getElementById("hours").textContent = pad(Math.floor((total % 86400) / 3600));
        document.getElementById("minutes").textContent = pad(Math.floor((total % 3600) / 60));
        document.getElementById("seconds").textContent = pad(total % 60);
    }
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // --- زر التقويم ---
    const start = "20260918T160000Z";
    const end = "20260918T180000Z";
    const icsData = 
`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Talia Sebou Invitation//AR
BEGIN:VEVENT
UID:sebou3-20260918@talia
DTSTAMP:20260915T000000Z
DTSTART:${start}
DTEND:${end}
SUMMARY:حفل سبوع تاليا سيد محمد عبدالجواد
DESCRIPTION:حفل سبوع الطفلة تاليا
LOCATION:${mapUrl}
END:VEVENT
END:VCALENDAR`;

    calendarBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "sebou3-talia.ics";
        a.click();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
    });
});
