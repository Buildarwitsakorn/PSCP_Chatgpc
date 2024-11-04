function startTask() {
    const taskButton = document.getElementById('taskButton');
    const timeInput = parseInt(document.getElementById('timeInput').value);  // ใช้ parseInt เพื่อให้ได้ค่าที่เป็นตัวเลขจำนวนเต็ม
    
    // ตรวจสอบว่าผู้ใช้กรอกเวลาเป็นตัวเลขที่มากกว่า 0 หรือไม่
    if (isNaN(timeInput) || timeInput <= 0) {
        alert("กรุณากรอกเวลาที่เป็นตัวเลขและมากกว่า 0 วินาที");
        return;
    }

    // เปลี่ยนสีปุ่มเป็นสีแดงและปิดการใช้งาน
    taskButton.classList.add('working');
    taskButton.disabled = true;

    // เริ่มนับเวลาถอยหลัง
    setTimeout(() => {
        // เมื่อเวลาสิ้นสุด เปลี่ยนสีปุ่มกลับและเปิดใช้งานปุ่ม
        taskButton.classList.remove('working');
        taskButton.disabled = false;
    }, timeInput * 1000); // แปลงเวลาจากวินาทีเป็นมิลลิวินาที
}
