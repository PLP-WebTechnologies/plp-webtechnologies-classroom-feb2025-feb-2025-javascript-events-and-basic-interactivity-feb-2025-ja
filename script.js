// Theme configuration
const themes = {
    light: {
        '--primary-color': '#1a1a1a',
        '--secondary-color': '#c9a959',
        '--accent-color': '#d4af37',
        '--background-color': '#f8f8f8',
        '--card-bg': '#ffffff',
        '--text-color': '#333333'
    },
    dark: {
        '--primary-color': '#ffffff',
        '--secondary-color': '#d4af37',
        '--accent-color': '#c9a959',
        '--background-color': '#1a1a1a',
        '--card-bg': '#2d2d2d',
        '--text-color': '#ffffff'
    }
};

// Car details data with multiple images
const carDetails = {
    1: {
        name: "Mercedes-Benz S-Class",
        price: "$95,000",
        images: [
            "merc2.jpg",
            "merc3.jpg",
            "merc4.jpg"
        ] ,
        specs: {
            engine: "3.0L Inline-6",
            horsepower: "429 hp",
            transmission: "9-speed automatic",
            acceleration: "4.8 seconds (0-60 mph)"
        },
        features: [
            "MBUX Interior Assistant",
            "Burmester® 3D Surround Sound System",
            "Air Balance Package",
            "Panoramic Sliding Sunroof"
        ]
    },
    2: {
        name: "Chevrolet Corvette",
        price: "$65,000",
        images: [
            "camero1.jpg",
            "camero2.jpg",
            "camero3.jpg"
        ],
        specs: {
            engine: "6.2L V8",
            horsepower: "495 hp",
            transmission: "8-speed dual-clutch",
            acceleration: "2.9 seconds (0-60 mph)"
        },
        features: [
            "Magnetic Ride Control",
            "Performance Data Recorder",
            "Bose Premium Audio",
            "Carbon Fiber Interior Package"
        ]
    },
    3: {
        name: "Porsche 911",
        price: "$106,100",
        images: [
            "911.jpg",
            "912.jpg",
            "913.jpg"
        ],
        specs: {
            engine: "3.0L Twin-Turbo Flat-6",
            horsepower: "379 hp",
            transmission: "8-speed PDK",
            acceleration: "4.2 seconds (0-60 mph)"
        },
        features: [
            "Porsche Active Suspension Management",
            "Sport Chrono Package",
            "Bose Surround Sound System",
            "Sport Exhaust System"
        ]
    }
};

// DOM Elements
const modal = document.getElementById('carModal');
const modalTitle = document.getElementById('modalTitle');
const closeBtn = document.querySelector('.close');
const carCards = document.querySelectorAll('.car-card');
const testDriveForm = document.getElementById('testDriveForm');
const themeToggle = document.getElementById('themeToggle');
const loading = document.querySelector('.loading');
const slideshowContainer = document.querySelector('.slideshow-container');
const specsList = document.getElementById('specsList');
const featuresList = document.getElementById('featuresList');

// Theme Switcher
let currentTheme = 'light';
themeToggle.addEventListener('click', () => {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    themeToggle.textContent = currentTheme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode';
    applyTheme(currentTheme);
});

function applyTheme(theme) {
    const root = document.documentElement;
    Object.entries(themes[theme]).forEach(([property, value]) => {
        root.style.setProperty(property, value);
    });
}

// Slideshow functionality
let currentSlideIndex = 0;
let slideshowInterval;

function initializeSlideshow(images) {
    const slideshowImages = slideshowContainer.querySelectorAll('img');
    slideshowImages.forEach((img, index) => {
        img.src = images[index];
        img.alt = `Car Image ${index + 1}`;
    });
    showSlide(0);
    startSlideshow();
}

function showSlide(index) {
    const slides = slideshowContainer.querySelectorAll('img');
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
    currentSlideIndex = index;
}

function nextSlide() {
    const slides = slideshowContainer.querySelectorAll('img');
    const nextIndex = (currentSlideIndex + 1) % slides.length;
    showSlide(nextIndex);
}

function prevSlide() {
    const slides = slideshowContainer.querySelectorAll('img');
    const prevIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
    showSlide(prevIndex);
}

function startSlideshow() {
    if (slideshowInterval) clearInterval(slideshowInterval);
    slideshowInterval = setInterval(nextSlide, 5000);
}

function stopSlideshow() {
    if (slideshowInterval) clearInterval(slideshowInterval);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Button click events
    carCards.forEach(card => {
        const detailsBtn = card.querySelector('.details-btn');
        detailsBtn.addEventListener('click', () => {
            loading.style.display = 'flex';
            setTimeout(() => {
                showCarDetails(card.dataset.car);
                loading.style.display = 'none';
            }, 500);
        });
        
        // Double click secret feature
        card.addEventListener('dblclick', () => {
            card.style.transform = 'scale(1.05) rotate(5deg)';
            setTimeout(() => {
                card.style.transform = '';
            }, 500);
        });
    });

    // Slideshow controls
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    prevBtn.addEventListener('click', () => {
        stopSlideshow();
        prevSlide();
        startSlideshow();
    });

    nextBtn.addEventListener('click', () => {
        stopSlideshow();
        nextSlide();
        startSlideshow();
    });

    // Modal close button
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        stopSlideshow();
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            stopSlideshow();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modal.style.display = 'none';
            stopSlideshow();
        }
    });

    // Form validation
    initializeFormValidation();
});

// Show car details in modal
function showCarDetails(carId) {
    const car = carDetails[carId];
    modalTitle.textContent = car.name;
    
    // Initialize slideshow
    initializeSlideshow(car.images);
    
    // Update specifications
    specsList.innerHTML = Object.entries(car.specs)
        .map(([key, value]) => `<li><strong>${key}:</strong> ${value}</li>`)
        .join('');
    
    // Update features
    featuresList.innerHTML = car.features
        .map(feature => `<li>${feature}</li>`)
        .join('');
    
    modal.style.display = 'block';
}

// Form validation
function initializeFormValidation() {
    const inputs = testDriveForm.querySelectorAll('input, select');
    
    inputs.forEach(input => {
        const validationMessage = input.nextElementSibling;
        
        input.addEventListener('input', () => {
            validateInput(input, validationMessage);
        });

        input.addEventListener('blur', () => {
            validateInput(input, validationMessage);
        });
    });
}

function validateInput(input, messageElement) {
    let isValid = true;
    let message = '';

    switch(input.id) {
        case 'name':
            if (input.value.length < 2) {
                isValid = false;
                message = 'Name must be at least 2 characters long';
            }
            break;
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                isValid = false;
                message = 'Please enter a valid email address';
            }
            break;
        case 'phone':
            const phoneRegex = /^\d{10}$/;
            if (!phoneRegex.test(input.value.replace(/\D/g, ''))) {
                isValid = false;
                message = 'Please enter a valid 10-digit phone number';
            }
            break;
        case 'car-select':
            if (!input.value) {
                isValid = false;
                message = 'Please select a car';
            }
            break;
    }

    messageElement.textContent = message;
    messageElement.style.color = isValid ? 'green' : 'red';
    input.style.borderColor = isValid ? 'green' : 'red';
    return isValid;
}

// Form submission
testDriveForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const inputs = testDriveForm.querySelectorAll('input, select');
    let isValid = true;

    inputs.forEach(input => {
        const validationMessage = input.nextElementSibling;
        if (!validateInput(input, validationMessage)) {
            isValid = false;
        }
    });

    if (isValid) {
        loading.style.display = 'flex';
        setTimeout(() => {
            alert('Thank you for scheduling a test drive! We will contact you shortly.');
            testDriveForm.reset();
            loading.style.display = 'none';
        }, 1000);
    }
});

// Add hover effect to car cards
carCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) rotate(1deg)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
}); 