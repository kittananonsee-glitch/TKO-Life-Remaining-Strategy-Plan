# 🧭 TKO Life Remaining Strategy Plan

แผนยุทธศาสตร์ชีวิต 50 → 65 ปี (2024 - 2039) ในรูปแบบ Dashboard บนเว็บ
ติดตามเป้าหมาย 4 ด้าน คือ การเงิน, การงาน & AI/IoT, สุขภาพกาย/จิต และครอบครัว

## ความสามารถ

- **การ์ดเป้าหมายหลัก** วัยปัจจุบัน, หนี้ผ่อนบ้าน, สุขภาพ, ธุรกิจ AI/IoT + โคกหนองนา
- **กราฟเรดาร์ 4 Pillars** คำนวณอัตโนมัติจากค่าเฉลี่ยความคืบหน้าของ OKR แต่ละด้าน
- **กราฟติดตามน้ำหนักและน้ำตาลรายสัปดาห์** กดปุ่ม "บันทึกค่าสัปดาห์ใหม่" เพื่อเพิ่มข้อมูล (ใส่ยอดหนี้คงเหลือเพิ่มได้ จะแสดงเป็นเส้นที่ 3)
- **5-Year Master OKRs** กรองตามหมวด และลากแถบเพื่อปรับความคืบหน้าได้
- **IoT Simulator** ตัวอย่าง Smart Building / Smart Farm / Predictive Maintenance
- **เส้นเวลาครอบครัว / เวลาเรียนรู้** ซ่อนไว้ก่อน กดที่ชื่อในคำอธิบายกราฟเพื่อแสดง
- **สำรองและนำเข้าข้อมูล** เป็นไฟล์ `.json` (นำเข้าไฟล์สำรองจากเวอร์ชัน Gemini เดิมได้ด้วย)
- ข้อมูลที่ปรับจะถูกบันทึกใน `localStorage` ของเบราว์เซอร์ (ไม่มี server)

## โครงสร้างไฟล์

```
tko-life-plan/
├── index.html      # โครงหน้าเว็บ
├── css/
│   └── style.css   # สไตล์ทั้งหมด (ธีมมืด)
├── js/
│   ├── data.js     # ⭐ เนื้อหาทั้งหมด แก้ไขที่นี่
│   └── app.js      # การทำงานของหน้าเว็บและกราฟ
└── README.md
```

## แก้ไขเนื้อหา

เปิด `js/data.js` แล้วแก้ข้อความ ตัวเลข หรือเพิ่ม/ลบ OKR ได้เลย
หมวด (`category`) ที่ใช้ได้: `financial`, `career`, `health`, `family`

> ถ้าเคยปรับค่าในหน้าเว็บไว้แล้ว เบราว์เซอร์จะใช้ค่าที่เก็บไว้ก่อน
> กด **"รีเซ็ตเป็นค่าเริ่มต้น"** ท้ายหน้าเพื่อโหลดค่าใหม่จาก `data.js`

## เปิดดูในเครื่อง

ดับเบิลคลิก `index.html` เปิดในเบราว์เซอร์ได้ทันที (ต้องต่ออินเทอร์เน็ตเพื่อโหลดฟอนต์และ Chart.js)

หรือรันเซิร์ฟเวอร์เล็ก ๆ:

```bash
python3 -m http.server 8000
# เปิด http://localhost:8000
```

## อัปขึ้น GitHub และเปิดเป็นเว็บด้วย GitHub Pages

```bash
cd tko-life-plan
git init
git add .
git commit -m "Initial commit: TKO Life Remaining Strategy Plan"
git branch -M main
git remote add origin https://github.com/<username>/tko-life-plan.git
git push -u origin main
```

จากนั้นไปที่ repo บน GitHub → **Settings → Pages** → Source เลือก **Deploy from a branch** → Branch `main` โฟลเดอร์ `/ (root)` → **Save**
รอ 1-2 นาที เว็บจะอยู่ที่ `https://<username>.github.io/tko-life-plan/`

> ⚠️ ถ้า repo เป็น Public ทุกคนจะเห็นเนื้อหาใน `data.js` ถ้าเป็นข้อมูลส่วนตัว แนะนำให้ตั้ง repo เป็น Private
> (ค่าที่บันทึกผ่านหน้าเว็บอยู่ในเบราว์เซอร์ของคุณเท่านั้น ไม่ถูกส่งขึ้น GitHub)

## เทคโนโลยี

HTML + CSS + JavaScript ล้วน ไม่ต้อง build
[Chart.js 4.4.1](https://www.chartjs.org/) · ฟอนต์ [Prompt](https://fonts.google.com/specimen/Prompt)
