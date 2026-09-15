// توقيت القاهرة المحلي: الجمعة 18 سبتمبر 2026 الساعة 7:00 مساءً
const eventDate = new Date("2026-09-18T19:00:00+03:00");

function pad(n){return String(Math.max(0,n)).padStart(2,"0");}
function updateCountdown(){
  const diff = eventDate.getTime() - Date.now();
  if(diff <= 0){
    ["days","hours","minutes","seconds"].forEach(id => document.getElementById(id).textContent="00");
    return;
  }
  const total = Math.floor(diff/1000);
  document.getElementById("days").textContent = pad(Math.floor(total/86400));
  document.getElementById("hours").textContent = pad(Math.floor(total%86400/3600));
  document.getElementById("minutes").textContent = pad(Math.floor(total%3600/60));
  document.getElementById("seconds").textContent = pad(total%60);
}
updateCountdown(); setInterval(updateCountdown,1000);

// ملف iCalendar يمكن تنزيله من خلال زر التقويم
const start = "20260918T160000Z"; // 19:00 Cairo (UTC+3)
const end = "20260918T180000Z";   // ساعتان
const ics = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Sebou3 Invitation//AR\nBEGIN:VEVENT\nUID:sebou3-20260918@example.local\nDTSTAMP:20260915T000000Z\nDTSTART:${start}\nDTEND:${end}\nSUMMARY:حفل السبوع\nDESCRIPTION:حفل سبوع ابنة سيد محمد عبدالجواد\nLOCATION:سيتم تحديد الموقع لاحقًا\nEND:VEVENT\nEND:VCALENDAR`;
document.getElementById("calendarBtn").addEventListener("click", e=>{
  e.preventDefault();
  const blob = new Blob([ics], {type:"text/calendar;charset=utf-8"});
  const url = URL.createObjectURL(blob);
  const a=document.createElement("a"); a.href=url; a.download="sebou3.ics"; a.click();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
});

// استبدل هذا الرابط برابط Google Maps عند إرسال الموقع.
document.getElementById("mapBtn").href = "#";
document.getElementById("mapBtn").addEventListener("click", e=>{
  if(e.currentTarget.getAttribute("href")==="#"){
    e.preventDefault();
    alert("سيتم تفعيل الخريطة فور إرسال موقع الحفل.");
  }
});
