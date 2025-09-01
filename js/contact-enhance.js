// Contact page enhancements: form validation, animation

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contactForm');
  const successMsg = document.getElementById('form-success');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      // Simple validation
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      if (!name || !email || !message) {
        successMsg.style.display = 'block';
        successMsg.style.color = '#d32f2f';
        successMsg.textContent = 'Please fill out all fields.';
        return;
      }
      // Simulate success
      successMsg.style.display = 'block';
      successMsg.style.color = '#6c47ff';
      successMsg.textContent = 'Thank you for contacting us! We will get back to you soon.';
      form.reset();
      setTimeout(() => {
        successMsg.style.display = 'none';
      }, 3500);
    });
  }

  // Animate contact section on load
  const contactSection = document.querySelector('.pro-contact');
  if (contactSection) {
    contactSection.style.opacity = 0;
    contactSection.style.transform = 'translateY(40px)';
    setTimeout(() => {
      contactSection.style.transition = 'all 0.7s cubic-bezier(.77,0,.18,1)';
      contactSection.style.opacity = 1;
      contactSection.style.transform = 'translateY(0)';
    }, 100);
  }
});
