// Initialize Lenis Scroll
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Header Scroll Effect
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile Menu Logic
const menuBtn = document.querySelector('.mobile-menu-btn');
const menuOverlay = document.querySelector('.mobile-menu-overlay');
const mobileLinks = document.querySelectorAll('.mobile-link');
const mobileCta = document.querySelector('.mobile-cta');
let isMenuOpen = false;

menuBtn.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    menuBtn.classList.toggle('active');
    menuOverlay.classList.toggle('active');

    if (isMenuOpen) {
        // Lock body scroll
        document.body.style.overflow = 'hidden';
        lenis.stop();

        // Animate Links In
        gsap.to(mobileLinks, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            delay: 0.2
        });
        gsap.to(mobileCta, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            delay: 0.6
        });
    } else {
        // Unlock body scroll
        document.body.style.overflow = '';
        lenis.start();

        // Reset Links
        gsap.to([mobileLinks, mobileCta], {
            y: 20,
            opacity: 0,
            duration: 0.3,
            ease: 'power3.in'
        });
    }
});

// Close menu when clicking a link
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        isMenuOpen = false;
        menuBtn.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
        lenis.start();
    });
});

// Form Toggle Logic & WhatsApp Dynamic Message
const profileRadios = document.querySelectorAll('input[name="profile"]');
const unitsGroup = document.getElementById('units-group');
const whatsappBtn = document.getElementById('whatsapp-btn');

const whatsappNumber = '5561999999999'; // Replace with actual number
const msgSyndic = "Olá, sou síndico e gostaria de saber mais sobre o Just Go Market para meu condomínio.";
const msgResident = "Olá, sou morador e gostaria de sugerir o Just Go Market no meu condomínio.";

function updateWhatsappLink(profile) {
    const msg = profile === 'resident' ? msgResident : msgSyndic;
    whatsappBtn.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
}

// Initialize
updateWhatsappLink('syndic');

profileRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
        updateWhatsappLink(e.target.value);

        if (e.target.value === 'resident') {
            gsap.to(unitsGroup, {
                height: 0,
                opacity: 0,
                marginBottom: 0,
                duration: 0.3,
                overflow: 'hidden'
            });
        } else {
            gsap.to(unitsGroup, {
                height: 'auto',
                opacity: 1,
                marginBottom: 25,
                duration: 0.3
            });
        }
    });
});

// Magnetic Button Effect (Simple version)
const magneticBtns = document.querySelectorAll('.magnetic-btn');

magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(btn, {
            x: x * 0.2,
            y: y * 0.2,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.3)'
        });
    });
});

// Reveal Animations
const revealElements = document.querySelectorAll('.reveal-text, .reveal-card, .reveal-image');

revealElements.forEach(el => {
    gsap.fromTo(el, 
        {
            y: 50,
            opacity: 0
        },
        {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        }
    );
});

// Staggered List Items (Split List)
document.querySelectorAll('.split-list').forEach(list => {
    const items = list.querySelectorAll('li');
    gsap.fromTo(items,
        { x: -20, opacity: 0 },
        {
            x: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: list,
                start: 'top 85%'
            }
        }
    );
});
