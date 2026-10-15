/**
 * TYPING MODULE
 * Creates animated typing and deleting effect for job roles
 */

export function initTyping() {
  const typingElement = document.getElementById('typing-text');
  if (!typingElement) return;

  const words = (window.portfolioData && window.portfolioData.personal && window.portfolioData.personal.rolesList) || [
    'Full-Stack Developer',
    'Software Engineer',
    'Frontend Specialist',
    'Creative Problem Solver'
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeEffect() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      typingElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typingElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      typingSpeed = 1800; // Pause at end of word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 400; // Pause before new word
    }

    setTimeout(typeEffect, typingSpeed);
  }

  typeEffect();
}
