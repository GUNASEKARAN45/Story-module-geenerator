// ========================================
// Smooth Scrolling for Anchor Links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            const nav = document.getElementById('nav');
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
            }
        }
    });
});

// ========================================
// Mobile Navigation Toggle
// ========================================
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const nav = document.getElementById('nav');

mobileMenuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// ========================================
// Mock Search Functionality
// ========================================
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');

searchBtn.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim();
    
    if (searchTerm) {
        console.log(`Searching for: ${searchTerm}`);
        alert(`Searching for destinations matching "${searchTerm}"...\n\nThis is a visual mockup. In a real application, this would perform an actual search.`);
        
        // Visual feedback
        searchInput.style.borderColor = '#10b981';
        setTimeout(() => {
            searchInput.style.borderColor = '';
            searchInput.value = '';
        }, 2000);
    } else {
        alert('Please enter a destination to search.');
        searchInput.focus();
    }
});

// Enter key support for search
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});

// ========================================
// Mock Login Button
// ========================================
const loginBtn = document.getElementById('loginBtn');

loginBtn.addEventListener('click', () => {
    console.log('Login button clicked');
    alert('Login functionality is a visual mockup.\n\nIn a real application, this would open a login form or redirect to an authentication page.');
});

// ========================================
// Hero Section - Explore Now Button
// ========================================
const exploreBtn = document.getElementById('exploreBtn');
const destinationSelect = document.getElementById('destination');
const checkInInput = document.getElementById('checkIn');
const checkOutInput = document.getElementById('checkOut');

exploreBtn.addEventListener('click', () => {
    const destination = destinationSelect.value;
    const checkIn = checkInInput.value;
    const checkOut = checkOutInput.value;
    
    // Basic validation
    if (!destination) {
        alert('Please select a destination.');
        destinationSelect.focus();
        return;
    }
    
    if (!checkIn) {
        alert('Please select a check-in date.');
        checkInInput.focus();
        return;
    }
    
    if (!checkOut) {
        alert('Please select a check-out date.');
        checkOutInput.focus();
        return;
    }
    
    // Validate dates
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (checkInDate < today) {
        alert('Check-in date cannot be in the past.');
        checkInInput.focus();
        return;
    }
    
    if (checkOutDate <= checkInDate) {
        alert('Check-out date must be after check-in date.');
        checkOutInput.focus();
        return;
    }
    
    // Calculate duration
    const duration = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    
    // Mock success message
    const destinationText = destinationSelect.options[destinationSelect.selectedIndex].text;
    console.log('Search parameters:', { destination: destinationText, checkIn, checkOut, duration });
    
    alert(`Searching for accommodations...\n\n` +
          `Destination: ${destinationText}\n` +
          `Check-in: ${checkIn}\n` +
          `Check-out: ${checkOut}\n` +
          `Duration: ${duration} night${duration > 1 ? 's' : ''}\n\n` +
          `This is a visual mockup. In a real application, this would search for available accommodations.`);
    
    // Scroll to destinations section
    setTimeout(() => {
        document.getElementById('destinations').scrollIntoView({ behavior: 'smooth' });
    }, 500);
});

// ========================================
// Date Input Enhancements
// ========================================
// Set minimum date to today
const today = new Date().toISOString().split('T')[0];
checkInInput.setAttribute('min', today);
checkOutInput.setAttribute('min', today);

// Update check-out minimum date when check-in changes
checkInInput.addEventListener('change', () => {
    const selectedCheckIn = checkInInput.value;
    if (selectedCheckIn) {
        const nextDay = new Date(selectedCheckIn);
        nextDay.setDate(nextDay.getDate() + 1);
        checkOutInput.setAttribute('min', nextDay.toISOString().split('T')[0]);
        
        // Clear check-out if it's before new minimum
        if (checkOutInput.value && new Date(checkOutInput.value) <= new Date(selectedCheckIn)) {
            checkOutInput.value = '';
        }
    }
});

// ========================================
// Mock Book Now Buttons (Packages)
// ========================================
document.querySelectorAll('.package-card .btn-primary').forEach(button => {
    button.addEventListener('click', (e) => {
        const packageCard = e.target.closest('.package-card');
        const packageName = packageCard.querySelector('h3').textContent;
        const packagePrice = packageCard.querySelector('.price-amount').textContent;
        
        console.log(`Book Now clicked for: ${packageName}`);
        alert(`Booking ${packageName}\n` +
              `Price: ${packagePrice} per person\n\n` +
              `This is a visual mockup. In a real application, this would proceed to the booking process.`);
    });
});

// ========================================
// Mock Special Offers Buttons
// ========================================
document.querySelectorAll('.offer-card .btn-secondary').forEach(button => {
    button.addEventListener('click', (e) => {
        const offerCard = e.target.closest('.offer-card');
        const offerTitle = offerCard.querySelector('h3').textContent;
        const offerDiscount = offerCard.querySelector('.offer-discount').textContent;
        
        console.log(`Offer clicked: ${offerTitle}`);
        alert(`${offerTitle}\n` +
              `Discount: ${offerDiscount}\n\n` +
              `This is a visual mockup. In a real application, this would show detailed offer information and allow you to apply the discount.`);
    });
});

// ========================================
// Scroll Animation for Elements
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards for scroll animations
document.querySelectorAll('.destination-card, .package-card, .review-card, .offer-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
    observer.observe(card);
});

// ========================================
// Active Navigation Link Highlighting
// ========================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ========================================
// Mock Data for Dynamic Rendering (Optional)
// ========================================
const destinationsData = [
    {
        name: "Paris, France",
        image: "https://picsum.photos/400/300?random=1",
        description: "The City of Light awaits with its romantic streets, world-class museums, and iconic Eiffel Tower.",
        price: "$899",
        duration: "7 Days",
        badge: "Trending"
    },
    {
        name: "Tokyo, Japan",
        image: "https://picsum.photos/400/300?random=2",
        description: "Experience the perfect blend of ancient traditions and cutting-edge technology in Japan's vibrant capital.",
        price: "$1,299",
        duration: "10 Days",
        badge: "Hot Deal"
    }
    // Additional destinations can be added here
];

const packagesData = [
    {
        name: "European Adventure",
        image: "https://picsum.photos/500/350?random=10",
        description: "Explore 5 iconic European cities including Paris, Rome, Barcelona, Amsterdam, and London in this comprehensive tour.",
        features: [
            "14 nights accommodation",
            "Daily breakfast included",
            "Guided city tours",
            "Airport transfers"
        ],
        price: "$2,499",
        badge: "Best Seller"
    }
    // Additional packages can be added here
];

// ========================================
// Console Welcome Message
// ========================================
console.log('%c🌍 TravelWorld Travel Booking Website', 'font-size: 20px; font-weight: bold; color: #2563eb;');
console.log('%cWelcome to TravelWorld! This is a visual mockup with interactive elements.', 'font-size: 14px; color: #6b7280;');
console.log('%cAll buttons and forms provide visual feedback but do not connect to a backend.', 'font-size: 12px; color: #9ca3af;');

// ========================================
// Loading Animation Complete
// ========================================
window.addEventListener('load', () => {
    console.log('✓ Page fully loaded');
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease-in';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ========================================
// Responsive Navigation Handling
// ========================================
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        nav.classList.remove('active');
    }
});
