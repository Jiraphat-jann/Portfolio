/**
 * CONTACT FORM MODULE
 * Sends direct emails to mmuuss2547@gmail.com via FormSubmit AJAX service
 * Includes fallback to Gmail compose and status feedback
 */

export function initContact() {
  const contactForm = document.getElementById('contact-form');
  const toast = document.getElementById('toast');
  const statusBox = document.getElementById('form-status');

  function showToast(message, isError = false) {
    if (!toast) return;
    const toastMsg = document.getElementById('toast-message');
    if (toastMsg) toastMsg.textContent = message;
    
    if (isError) {
      toast.classList.remove('bg-emerald-600', 'border-purple-500/30');
      toast.classList.add('bg-red-600/90', 'border-red-400');
    } else {
      toast.classList.remove('bg-red-600/90', 'border-red-400');
      toast.classList.add('bg-emerald-600/90', 'border-emerald-400');
    }

    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 5000);
  }

  function setStatus(html, type = 'info') {
    if (!statusBox) return;
    statusBox.classList.remove('hidden', 'bg-emerald-950/60', 'border-emerald-500/40', 'text-emerald-200', 'bg-amber-950/60', 'border-amber-500/40', 'text-amber-200', 'bg-red-950/60', 'border-red-500/40', 'text-red-200');

    if (type === 'success') {
      statusBox.classList.add('bg-emerald-950/60', 'border-emerald-500/40', 'text-emerald-200');
    } else if (type === 'warning') {
      statusBox.classList.add('bg-amber-950/60', 'border-amber-500/40', 'text-amber-200');
    } else {
      statusBox.classList.add('bg-red-950/60', 'border-red-500/40', 'text-red-200');
    }

    statusBox.innerHTML = html;
  }

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('user_name');
      const emailInput = document.getElementById('user_email');
      const subjectInput = document.getElementById('user_subject');
      const messageInput = document.getElementById('user_message');
      const submitBtn = contactForm.querySelector('button[type="submit"]');

      if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
        showToast('กรุณากรอกข้อมูลให้ครบถ้วนทุกช่องที่มีเครื่องหมาย *', true);
        return;
      }

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const subject = (subjectInput && subjectInput.value.trim()) || 'ติดต่อจากเว็บไซต์ Portfolio';
      const message = messageInput.value.trim();

      // Button loading state
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg> กำลังส่งข้อความเข้าอีเมล...
      `;

      // Clear previous status
      if (statusBox) statusBox.classList.add('hidden');

      // Check if browsing directly from file system (no Origin)
      if (window.location.protocol === 'file:') {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;

        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=mmuuss2547@gmail.com&su=${encodeURIComponent(`[Portfolio] ${subject}`)}&body=${encodeURIComponent(`ชื่อผู้ติดต่อ: ${name}\nอีเมล: ${email}\n\nข้อความ:\n${message}`)}`;
        window.open(gmailUrl, '_blank');
        showToast('กำลังเปิด Gmail เพื่อส่งข้อความ...');
        return;
      }

      try {
        const response = await fetch('https://formsubmit.co/ajax/mmuuss2547@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: name,
            email: email,
            subject: subject,
            message: message,
            _captcha: 'false',
            _template: 'table',
            _subject: `[Portfolio Website] ${subject}`
          })
        });

        const data = await response.json();

        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;

        if (data.success === 'true' || data.success === true) {
          contactForm.reset();
          showToast('ส่งข้อความเข้าอีเมล mmuuss2547@gmail.com เรียบร้อยแล้ว!');
          setStatus(`
            <div class="flex items-center gap-2.5 font-semibold text-emerald-400 mb-1">
              <i class="fa-solid fa-circle-check text-base"></i>
              <span>ส่งข้อความสำเร็จแล้ว!</span>
            </div>
            <p class="text-xs text-zinc-300">ข้อความของคุณถูกส่งไปยังอีเมล <strong>mmuuss2547@gmail.com</strong> เรียบร้อยแล้ว ขอบคุณที่ติดต่อเข้ามาครับ</p>
          `, 'success');
        } else if (data.message && data.message.toLowerCase().includes('activation')) {
          showToast('กรุณากดยืนยันการรับอีเมลครั้งแรกใน Gmail ครับ', false);
          setStatus(`
            <div class="flex items-center gap-2.5 font-semibold text-amber-400 mb-1.5">
              <i class="fa-solid fa-triangle-exclamation text-base"></i>
              <span>ระบบต้องการการกดยืนยันครั้งแรก (One-time Activation)</span>
            </div>
            <p class="text-xs text-zinc-200 leading-relaxed mb-2">
              FormSubmit ได้ส่งอีเมลยืนยันไปยัง <strong>mmuuss2547@gmail.com</strong> เรียบร้อยแล้วครับ กรุณาเปิดกล่องจดหมายของคุณ และกดปุ่ม <strong class="text-white underline">"Activate Form"</strong> เพียง 1 ครั้ง หลังจากนั้นระบบจะส่งข้อความเข้าอีเมลของคุณโดยอัตโนมัติตลอดไป
            </p>
            <div class="flex gap-2">
              <a href="https://mail.google.com" target="_blank" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-medium transition-colors">
                <i class="fa-solid fa-envelope-open text-xs"></i>
                <span>เปิดดูกล่องจดหมาย Gmail</span>
              </a>
            </div>
          `, 'warning');
        } else {
          throw new Error(data.message || 'เกิดข้อผิดพลาดในการส่งข้อความ');
        }
      } catch (error) {
        console.error('Form submission error:', error);
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;

        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=mmuuss2547@gmail.com&su=${encodeURIComponent(`[Portfolio] ${subject}`)}&body=${encodeURIComponent(`ชื่อผู้ติดต่อ: ${name}\nอีเมล: ${email}\n\nข้อความ:\n${message}`)}`;
        
        showToast('ไม่สามารถส่งผ่านระบบอัตโนมัติได้ กรุณาส่งผ่าน Gmail', true);
        setStatus(`
          <div class="flex items-center gap-2.5 font-semibold text-red-400 mb-1.5">
            <i class="fa-solid fa-circle-exclamation text-base"></i>
            <span>ไม่สามารถส่งผ่านระบบฟอร์มอัตโนมัติได้</span>
          </div>
          <p class="text-xs text-zinc-300 leading-relaxed mb-2.5">
            คุณสามารถส่งข้อความนี้ผ่าน Gmail โดยตรงได้ทันที โดยข้อมูลที่คุณกรอกจะถูกนำไปใส่ไว้ให้พร้อมส่ง:
          </p>
          <a href="${gmailUrl}" target="_blank" class="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-medium transition-colors shadow-md">
            <i class="fa-brands fa-google text-xs"></i>
            <span>เปิดเขียนใน Gmail พร้อมข้อความนี้</span>
          </a>
        `, 'error');
      }
    });
  }
}
