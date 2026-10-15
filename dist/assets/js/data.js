/**
 * ========================================================
 * PORTFOLIO DATA FILE (✏️ แก้ไขข้อมูลของคุณได้ที่ไฟล์นี้!)
 * ========================================================
 * คุณสามารถเปลี่ยนชื่อ, ข้อมูลติดต่อ, สถิติ, ทักษะ และผลงานได้ที่นี่
 */

const portfolioData = {
  // ข้อมูลส่วนตัว
  personal: {
    name: "นายจิรพัส จันทรเมธา",
    role: "Frontend & IT Support",
    rolesList: [
      "Frontend Developer",
      "IT Support / Helpdesk",
      "CCTV & Network Engineer",
      "ICT Student (SPU)"
    ],
    bio: "นักศึกษาปริญญาตรี สาขาเทคโนโลยีสารสนเทศและการสื่อสาร (ICT) ม.ศรีปทุม (เทียบโอน ปวส. เกียรตินิยม) มีประสบการณ์ทำงานจริงด้าน IT Support และ CCTV/Network มุ่งมั่นพัฒนาทักษะด้าน Frontend และพร้อมเรียนรู้สิ่งใหม่เพื่อร่วมงานกับทีม",
    location: "นนทบุรี, ประเทศไทย",
    education: "เทคโนโลยีสารสนเทศและการสื่อสาร (ICT) ม.ศรีปทุม",
    languages: "ไทย (Native), อังกฤษ (Basic)",
    status: "เปิดรับโอกาสฝึกงาน & ทำงาน",
    resumeUrl: "#contact",
    profileImage: "assets/images/ตัวเอง.jpg"
  },

  // สถิติตัวเลข
  stats: {
    gpa: "3.84",
    experienceYears: 2,
    certificatesCount: 6,
    learningReadiness: 100
  },

  // ข้อมูลติดต่อ
  contact: {
    email: "mmuuss2547@gmail.com",
    phone: "+66 0630367892",
    lineId: "superhero0202",
    github: "https://github.com",
    linkedin: "https://linkedin.com"
  }
};

// Export หรือใส่ใน window object สำหรับใช้งานใน Browser
window.portfolioData = portfolioData;
