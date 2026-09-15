document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // ⚙️ الإعدادات القابلة للتعديل
    // ==========================================
    
    // 1. ضع رابط Google Maps هنا بين القوسين
    const mapUrl = "https://maps.google.com"; 

    // 2. موعد الحفل (توقيت القاهرة GMT+3)
    const eventDate = new Date("2026-09-18T19:00:00+03:00");

    // ==========================================
    
    const splashScreen = document.getElementById('splashScreen');
    const giftBox = document.getElementById('giftBox');
    const invitationContent = document.getElementById('invitationContent');
    const bgMusic = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    const overlayEffects = document.getElementById('overlayEffects');
    const mapBtn = document.getElementById('viewLocation');
    const calendarBtn = document.getElementById('addToCalendar');

    mapBtn.href = mapUrl;

    // --- 1. تفاعل فتح العلبة ---
    splashScreen.addEventListener('click', () => {
        giftBox.classList.add('open');
        playAudioSafely();
        createConfetti();

        setTimeout(() => {
            splashScreen.classList.add('fade-out');
            invitationContent.classList.remove('hidden');
            
            setTimeout(() => {
                invitationContent.classList.add('visible');
            }, 50);

            setTimeout(() => {
                splashScreen.style.display = 'none';
            }, 800);
        }, 600);
    });

    // --- 2. إدارة الموسيقى ---
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

    // --- 3. المؤثرات الاحتفالية ---
    function createConfetti() {
        const colors = ['#c59b27', '#f8bbd0', '#d81b60', '#ffffff'];
        for (let i = 0; i < 35; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-10px';
            
            overlayEffects.appendChild(confetti);

            const animation = confetti.animate([
                { transform: 'translate3d(0, 0, 0) rotate(0deg)', opacity: 1 },
                { transform: `translate3d(${Math.random() * 80 - 40}px, ${window.innerHeight}px, 0) rotate(${Math.random() * 360}deg)`, opacity: 0 }
            ], {
                duration: Math.random() * 2500 + 1500,
                easing: 'cubic-bezier(0.25, 1, 0.5, 1)'
            });

            animation.onfinish = () => confetti.remove();
        }
    }

    // --- 4. العداد التنازلي ---
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const countdownTimer = document.getElementById('countdown');
    const startedMessage = document.getElementById('eventStartedMessage');

    function updateCountdown() {
        const now = new Date().getTime();
        const diff = eventDate.getTime() - now;

        if (diff <= 0) {
            clearInterval(timerInterval);
            countdownTimer.classList.add('hidden');
            startedMessage.classList.remove('hidden');
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        daysEl.textContent = String(days).padStart(2, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    const timerInterval = setInterval(updateCountdown, 1000);

    // --- 5. زر التقويم (ICS) ---
    calendarBtn.addEventListener('click', (e) => {
        e.preventDefault();

        // بداية الحدث بتوقيت UTC (الساعة 7 مساءً بالقاهرة = 4 مساءً UTC)
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
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.setAttribute('download', 'sebou-talia.ics');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});
