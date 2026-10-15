# 🚀 Web Portfolio (Modular & Production-Ready)

เว็บไซต์ Portfolio ส่วนตัวสไตล์โมเดิร์น ได้รับการ **แยกโค้ดออกเป็นสัดส่วน (Modular Architecture)** ชัดเจน เพื่อให้แก้ไขง่าย บำรุงรักษาสะดวก และพร้อมนำขึ้นเซิร์ฟเวอร์ได้ทันที!

---

## 📁 โครงสร้างโปรเจกต์ที่แยกเป็นสัดส่วน (Project Structure)

```text
portfolio/
├── index.html                   # โครงสร้างหลัก (สั้น กระชับ รวมทุกคอมโพเนนต์เข้าด้วยกัน)
├── start-server.bat             # ⚡ ดับเบิลคลิกเพื่อรัน Web Server ทดสอบในเครื่องทันที
├── build.bat                    # 📦 ดับเบิลคลิกเพื่อรวม components ทั้งหมดเป็น dist/ สำหรับรันแบบ offline
│
├── components/                  # 🧩 แยกชิ้นส่วนหน้าเว็บ (HTML Components)
│   ├── navbar.html              # เมนูด้านบน, โลโก้, ปุ่มสลับธีม
│   ├── hero.html                # ส่วนทักทายหน้าแรก, รูปโปรไฟล์, ปุ่ม CTA, โซเชียลมีเดีย
│   ├── about.html               # เกี่ยวกับฉัน, ประวัติย่อ, ข้อมูลทั่วไป
│   ├── skills.html              # ทักษะความเชี่ยวชาญ (Frontend, Backend, Cloud, Tools)
│   ├── projects.html            # ผลงานและปุ่มคัดกรองหมวดหมู่
│   ├── experience.html          # ไทม์ไลน์ประวัติการทำงานและการศึกษา
│   ├── contact.html             # ข้อมูลติดต่อ และแบบฟอร์มส่งข้อความ
│   └── footer.html              # ส่วนท้ายเว็บ ลิขสิทธิ์ และลิงก์ลัด
│
├── assets/
│   ├── css/                     # 🎨 สไตล์การตกแต่ง (แยกเป็นโมดูล)
│   │   ├── style.css            # ไฟล์หลักที่เชื่อมโยง CSS ทุกไฟล์
│   │   ├── variables.css        # ตัวแปรสี, ฟอนต์, Base Layout, Custom Scrollbar
│   │   ├── components.css       # สไตล์การ์ด Glassmorphism, แท็กทักษะ, ไทม์ไลน์, Toast
│   │   └── animations.css       # เอฟเฟกต์แสงเรืองรอง (Glow), เคอร์เซอร์พิมพ์, ซูมภาพ
│   │
│   ├── js/                      # ⚡ ฟังก์ชันการทำงาน (แยกเป็นโมดูล)
│   │   ├── data.js              # ✏️ ไฟล์รวมข้อมูลส่วนตัว (ชื่อ, ประวัติ, ข้อมูลติดต่อ) แก้ที่นี่ได้ทันที!
│   │   ├── main.js              # ตัวควบคุมหลัก (Main Controller) และตัวโหลด Component
│   │   └── modules/             # ฟังก์ชันเฉพาะด้าน
│   │       ├── theme.js         # จัดการสลับ Dark / Light Mode
│   │       ├── typing.js        # แอนิเมชันพิมพ์ข้อความอัตโนมัติ (Typing Effect)
│   │       ├── filter.js        # ตัวกรองผลงานตามหมวดหมู่ (Project Filter)
│   │       ├── counter.js       # ตัวเลขนับสถิติอัตโนมัติ (Stats Counter)
│   │       └── contact.js       # ระบบฟอร์มติดต่อและข้อความแจ้งเตือน Toast
│   │
│   └── images/                  # โฟลเดอร์สำหรับใส่รูปภาพของคุณเอง
│
└── dist/                        # 🌐 โฟลเดอร์ผลลัพธ์ที่รวมไฟล์สำเร็จแล้ว พร้อมใช้งานทันที
```

---

## ✏️ คู่มือการเข้าไปแก้ไขข้อมูลด้วยตัวเอง

คุณสามารถเลือกวิธีแก้ไขข้อมูลได้ 2 ทางตามความสะดวก:

### วิธีที่ 1: แก้ไขที่ไฟล์ข้อมูล `assets/js/data.js` (ง่ายที่สุด)
เปิดไฟล์ [`assets/js/data.js`](file:///C:/Users/MMUUSS/.gemini/antigravity/scratch/portfolio/assets/js/data.js) แล้วเปลี่ยนค่าต่างๆ ได้เลย:
- ชื่อ, คำบรรยาย, สถานะการรับงาน
- สถิติตัวเลข (ปีประสบการณ์, โปรเจกต์ที่สำเร็จ)
- ช่องทางติดต่อ (อีเมล, เบอร์โทร, LINE ID, ลิงก์ GitHub, LinkedIn)

### วิธีที่ 2: แก้ไขเฉพาะส่วนในโฟลเดอร์ `components/`
อยากแก้ส่วนไหน เข้าไปที่ไฟล์นั้นได้โดยตรง ไม่ต้องเลื่อนหาในไฟล์ยาวๆ อีกต่อไป:
- **อยากแก้ผลงาน/เพิ่มการ์ดโปรเจกต์** ➡️ เข้าไปแก้ที่ [`components/projects.html`](file:///C:/Users/MMUUSS/.gemini/antigravity/scratch/portfolio/components/projects.html)
- **อยากแก้ทักษะความเชี่ยวชาญ** ➡️ เข้าไปแก้ที่ [`components/skills.html`](file:///C:/Users/MMUUSS/.gemini/antigravity/scratch/portfolio/components/skills.html)
- **อยากแก้หน้าแรก/รูปโปรไฟล์/ปุ่มลิงก์** ➡️ เข้าไปแก้ที่ [`components/hero.html`](file:///C:/Users/MMUUSS/.gemini/antigravity/scratch/portfolio/components/hero.html)
- **อยากแก้ประวัติการทำงาน/การศึกษา** ➡️ เข้าไปแก้ที่ [`components/experience.html`](file:///C:/Users/MMUUSS/.gemini/antigravity/scratch/portfolio/components/experience.html)

---

## 🖥️ วิธีทดสอบเปิดดูในเครื่อง (Local Testing)

เนื่องจากโปรเจกต์มีการแยกชิ้นส่วน HTML (Component-based) บราวเซอร์จะต้องการให้เปิดผ่าน Web Server เพื่อโหลดชิ้นส่วนต่างๆ ได้อย่างราบรื่น:

1. **วิธีที่ง่ายที่สุด (แนะนำ):**
   - ดับเบิลคลิกที่ไฟล์ **`start-server.bat`**
   - หน้าเว็บจะเปิดขึ้นมาที่ `http://localhost:8080` บนเบราว์เซอร์ของคุณทันที
2. **หากต้องการเปิดดูแบบดับเบิลคลิกไฟล์ตรงๆ โดยไม่ต้องรันเซิร์ฟเวอร์:**
   - ดับเบิลคลิกที่ไฟล์ **`build.bat`** (จะรวมทุกชิ้นส่วนเป็นไฟล์เดียวไว้ในโฟลเดอร์ `dist/`)
   - จากนั้นสามารถดับเบิลคลิกเปิดไฟล์ `dist/index.html` ดูได้ทันที

---

## 🌐 วิธีนำขึ้นเซิร์ฟเวอร์ (Deploy to Server)

เมื่อต้องการนำขึ้นเซิร์ฟเวอร์ สามารถเลือกอัปโหลดโฟลเดอร์หลัก หรือโฟลเดอร์ `dist/` ขึ้นโฮสติ้งได้ทันที:

### 1. Vercel หรือ Netlify
- นำโฟลเดอร์นี้ หรือโฟลเดอร์ `dist/` ลากและวางบนหน้าเว็บ [Vercel](https://vercel.com) หรือ [Netlify Drop](https://app.netlify.com/drop) เว็บจะออนไลน์ทันทีใน 10 วินาที

### 2. GitHub Pages
- Push ไฟล์ขึ้น GitHub Repository แล้วเปิดใช้งาน GitHub Pages ใน Settings > Pages

### 3. โฮสติ้งทั่วไป (cPanel / Apache / Nginx / DirectAdmin)
- อัปโหลดไฟล์ทั้งหมดขึ้นไปยังโฟลเดอร์ `public_html/` ผ่าน FTP ได้ทันที
