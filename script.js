// วันที่เลือกตั้ง
const electionDate = new Date('05/11/2025');

// ฟังก์ชันดึงเวลาไทยจาก API
async function fetchThaiTime() {
    try {
        const response = await fetch('https://timeapi.io/api/time/current/zone?timeZone=Asia/Bangkok');
        const data = await response.json();
        const serverTime = new Date(data.date); // เวลาที่ได้รับจาก API
        updateCountdown(serverTime);
    } catch (error) {
        console.error('Error fetching time: ', error);
    }
}

// ฟังก์ชันคำนวณวันถอยหลัง
function updateCountdown(serverTime) {
    const timeDiff = electionDate - serverTime; 
    const daysLeft = Math.floor(timeDiff / (1000 * 3600 * 24)); 

    // แสดงผลการนับถอยหลัง
    document.getElementById('countdown-number').textContent = daysLeft >= 0 ? daysLeft : "เลือกตั้งแล้ว!";
}

// เรียกฟังก์ชันเพื่อดึงเวลาไทยและอัพเดตการนับถอยหลัง
fetchThaiTime();

// ตั้งเวลาให้อัพเดตทุก 1 ชั่วโมง
setInterval(fetchThaiTime, 3600000); 

// ตั้งเวลาให้อัพเดตการนับถอยหลังทุกๆ 1 วัน
setInterval(() => {
    fetchThaiTime();
}, 86400000); 
