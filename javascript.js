function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

const buttons = document.querySelectorAll('.play-button');

buttons.forEach(button => {
    let isActive = false;

    button.addEventListener('click', () => {
        isActive = !isActive;
        const imageBox = button.closest('.image-box');
        const image = imageBox.querySelector('img');
        const checkmark = imageBox.querySelector('.checkmark');

        if (isActive) {
            button.classList.add('active');
            image.style.opacity = '0.25';  // จางรูปภาพ
            checkmark.style.display = 'block';  // แสดงรูปเครื่องหมายถูก
        } else {
            button.classList.remove('active');
            image.style.opacity = '1';  // คืนความชัดของรูปภาพ
            checkmark.style.display = 'none';  // ซ่อนรูปเครื่องหมายถูก
        }
    });
});

let countdownIntervals = {}; // เก็บ reference ของ countdown

function startTask(gameId) {
    const timeInput = document.getElementById(`timeInput-${gameId}`).value;
    const countdownDisplay = document.getElementById(`countdownDisplay-${gameId}`);
    const playButton = document.querySelector(`.image-box[data-game-id="${gameId}"] .play-button`);
    const imageBox = document.querySelector(`.image-box[data-game-id="${gameId}"]`);
    const image = imageBox.querySelector('img');
    const checkmark = imageBox.querySelector('.checkmark');

    let timeInSeconds = timeInput * 60;

    // ถ้ามีการเก็บเวลาที่เหลือใน localStorage ให้ใช้ค่านั้น
    const storedTime = localStorage.getItem(`timeRemaining-${gameId}`);
    if (storedTime) {
        timeInSeconds = parseInt(storedTime);
    }

    // เริ่มนับถอยหลัง
    clearInterval(countdownIntervals[gameId]); // เคลียร์ interval ที่มีอยู่แล้ว
    countdownIntervals[gameId] = setInterval(() => {
        if (timeInSeconds <= 0) {
            clearInterval(countdownIntervals[gameId]);
            countdownDisplay.textContent = "หมดเวลา!";
            localStorage.removeItem(`timeRemaining-${gameId}`);
            playButton.disabled = false; // เปิดใช้งานปุ่มอีกครั้งเมื่อหมดเวลา
            
            // คืนค่ารูปภาพและปุ่ม
            image.style.opacity = '1';  // คืนความชัดของรูปภาพ
            playButton.classList.remove('active'); // ลบสถานะ active
            playButton.disabled = false; // คืนสถานะให้ปุ่ม
        } else {
            const minutes = Math.floor(timeInSeconds / 60);
            const seconds = timeInSeconds % 60;
            countdownDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            timeInSeconds--;
            localStorage.setItem(`timeRemaining-${gameId}`, timeInSeconds); // เก็บเวลาเหลือใน localStorage
        }
    }, 1000);
    
    // ปิดการใช้งานปุ่มเมื่อเริ่มนับถอยหลัง
    playButton.disabled = true;
    image.style.opacity = '0.25';  // จางรูปภาพ
    checkmark.style.display = 'block';  // แสดงรูปเครื่องหมายถูก
}

function resumeTask(gameId, remainingTime) {
    const countdownDisplay = document.getElementById(`countdownDisplay-${gameId}`);
    countdownDisplay.textContent = `${Math.floor(remainingTime / 60)}:${remainingTime % 60 < 10 ? '0' : ''}${remainingTime % 60}`;
    startTask(gameId); // เริ่มนับถอยหลังจากเวลาที่เหลือ
}

window.onload = function() {
    // ตรวจสอบเวลาที่เหลือสำหรับแต่ละเกมเมื่อโหลดหน้า
    const numberOfGames = 2; // จำนวนบอร์ดเกม (ปรับตามที่ต้องการ)
    for (let i = 1; i <= numberOfGames; i++) {
        const timeRemaining = localStorage.getItem(`timeRemaining-${i}`);
        if (timeRemaining) {
            resumeTask(i, parseInt(timeRemaining)); // เรียกใช้ resumeTask ถ้ามีเวลาเหลือ
        }
    }
};
