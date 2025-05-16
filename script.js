// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.querySelector('.menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeBtn = document.querySelector('.mobile-menu-close');
    const mobileMenuLinks = document.querySelectorAll('.mobile-nav-item');
    
    // Open mobile menu
    menuBtn.addEventListener('click', function() {
        mobileMenu.classList.add('open');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    });
    
    // Close mobile menu
    closeBtn.addEventListener('click', function() {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = ''; // Re-enable scrolling
    });
    
    // Close menu when clicking a link
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });
});

// Navigation Active State
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-item');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
});

// Project Filtering
document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                } else {
                    if (card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });
});

// Typing Effect for Terminal
document.addEventListener('DOMContentLoaded', function() {
    const commandLines = document.querySelectorAll('.command-line');
    const responses = document.querySelectorAll('.response');
    
    // Hide all responses initially
    responses.forEach(response => {
        response.style.display = 'none';
    });
    
    // Display responses one by one with a delay
    let delay = 0;
    commandLines.forEach((cmd, index) => {
        // Skip the last command line (prompt with cursor)
        if (index < commandLines.length - 1) {
            setTimeout(() => {
                // Show response after a delay
                if (responses[index]) {
                    responses[index].style.display = 'block';
                }
            }, delay + 1000); // Wait a second after command
            
            delay += 2000; // Increase delay for next command
        }
    });
});

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Account for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Contact Form Validation
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        const securityChallenge = document.getElementById('securityChallenge').value.toLowerCase();
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Security challenge validation (accepting common port scanning commands)
        const validAnswers = ['nmap', 'netstat', 'masscan', 'netcat', 'nc', 'port scan'];
        let isValidAnswer = false;
        
        for (const answer of validAnswers) {
            if (securityChallenge.includes(answer)) {
                isValidAnswer = true;
                break;
            }
        }
        
        if (!isValidAnswer) {
            alert('Incorrect security answer. Hint: Try a common port scanning tool.');
            return;
        }
        
        // If all validation passes, show success message
        alert('Message sent successfully! Thank you for reaching out.');
        contactForm.reset();
    });
});

// Animation for skill bars
document.addEventListener('DOMContentLoaded', function() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    // Initial state - set width to 0
    skillBars.forEach(bar => {
        bar.style.width = '0';
    });
    
    // Function to animate skill bars when they come into view
    function animateSkillBars() {
        const skillsSection = document.querySelector('.skills-section');
        const sectionPosition = skillsSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (sectionPosition < screenPosition) {
            // Animate skill bars to their full width
            skillBars.forEach(bar => {
                const fullWidth = bar.parentElement.getAttribute('data-value') || bar.style.width;
                bar.style.width = fullWidth;
            });
            
            // Remove scroll event once animation is triggered
            window.removeEventListener('scroll', animateSkillBars);
        }
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', animateSkillBars);
    
    // Check on page load
    animateSkillBars();
});

// Add data values to skill progress bars based on percentage text
document.addEventListener('DOMContentLoaded', function() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    skillBars.forEach(bar => {
        const percentageText = bar.querySelector('.skill-percentage').textContent;
        const percentage = percentageText.replace('%', '');
        bar.querySelector('.skill-progress-bg').setAttribute('data-value', percentage + '%');
    });
});
