// Button click action
// Image Gallery
const images = ['image1.jpg', 'image2.jpg', 'image3.jpg'];
let currentIndex = 0;
const galleryImg = document.getElementById('galleryImg');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  galleryImg.src = images[currentIndex];
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % images.length;
  galleryImg.src = images[currentIndex];
});

// Button Click Change
const actionBtn = document.getElementById('actionBtn');
actionBtn.addEventListener('click', () => {
  actionBtn.textContent = 'Clicked!';
  actionBtn.style.backgroundColor = '#A0522D';
});

// Tabs
const tabButtons = document.querySelectorAll('.tabBtn');
const tabContents = document.querySelectorAll('.tabContent');

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const tabId = btn.getAttribute('data-tab');
    tabContents.forEach(content => {
      content.classList.remove('active');
    });
    document.getElementById(tabId).classList.add('active');
  });
});

// Form Validation
const form = document.getElementById('userForm');
const email = document.getElementById('email');
const password = document.getElementById('password');

form.addEventListener('submit', (e) => {
  let valid = true;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email.value)) {
    alert('Please enter a valid email.');
    valid = false;
  }

  if (password.value.length < 8) {
    alert('Password must be at least 8 characters.');
    valid = false;
  }

  if (!valid) e.preventDefault();
});

// Keypress detection
window.addEventListener('keypress', (e) => {
  console.log(`Key pressed: ${e.key}`);
});

// Bonus: Double-click secret
actionBtn.addEventListener('dblclick', () => {
  alert('You found the secret action! 🎉');
});
