// --- LENIS SMOOTH SCROLL ---
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true
});
function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);

// --- GSAP ANIMATIONS ---
gsap.registerPlugin(ScrollTrigger);

// Header Scroll Effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
});

// Reveal Elements (Fade Up)
const revealElements = document.querySelectorAll('.reveal-text, .reveal-card');
revealElements.forEach(el => {
    gsap.fromTo(el,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%' } }
    );
});

// Hero Stagger Animation (Entrance)
gsap.fromTo('.hero-stagger',
    { y: 60, opacity: 0 },
    { y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: 'power3.out', delay: 0.2 }
);

// Accordion Logic
function toggleAccordion(header) {
    const item = header.parentElement;
    const isActive = item.classList.contains('active');

    document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));

    if (!isActive) item.classList.add('active');
}

// FAQ Tab Logic
function switchFaq(type) {
    // Buttons
    document.querySelectorAll('.faq-tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Find the button that was clicked (approximate match based on text or order is hard, so we rely on the onclick event context if passed, but here we are passing a string. 
    // Better approach: The button that called this function should be active. 
    // Since we can't easily pass 'this' in the inline onclick without changing HTML, let's select by index or text.
    // Actually, let's just use the type to find the button index.
    // Syndic = 0, Resident = 1
    const buttons = document.querySelectorAll('.faq-tab-btn');
    if (type === 'syndic') buttons[0].classList.add('active');
    else buttons[1].classList.add('active');

    // Content
    const syndicGroup = document.getElementById('faq-syndic');
    const residentGroup = document.getElementById('faq-resident');

    if (type === 'syndic') {
        syndicGroup.style.display = 'block';
        residentGroup.style.display = 'none';

        // Reset animation
        syndicGroup.style.animation = 'none';
        syndicGroup.offsetHeight; /* trigger reflow */
        syndicGroup.style.animation = 'fadeIn 0.5s ease';
    } else {
        syndicGroup.style.display = 'none';
        residentGroup.style.display = 'block';

        // Reset animation
        residentGroup.style.animation = 'none';
        residentGroup.offsetHeight; /* trigger reflow */
        residentGroup.style.animation = 'fadeIn 0.5s ease';
    }
}

// Form Toggle Logic
function toggleFields() {
    const radios = document.getElementsByName('perfil');
    const syndicFields = document.getElementById('fields-syndic');
    const residentFields = document.getElementById('fields-resident');
    let val = '';

    for (let r of radios) if (r.checked) val = r.value;

    if (val === 'sindico') {
        syndicFields.style.display = 'block';
        residentFields.style.display = 'none';
        gsap.fromTo(syndicFields, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.3 });
    } else {
        syndicFields.style.display = 'none';
        residentFields.style.display = 'block';
        gsap.fromTo(residentFields, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.3 });
    }
}

// Mobile Menu Logic
document.addEventListener('DOMContentLoaded', () => {
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const mobileCta = document.querySelector('.mobile-cta a'); // Select the CTA button in the menu

    if (mobileBtn && mobileMenu) {
        // Toggle Menu
        mobileBtn.addEventListener('click', () => {
            mobileBtn.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : ''; // Prevent background scroll
        });

        // Close on Link Click
        const closeMenu = () => {
            mobileBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        };

        mobileLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        if (mobileCta) {
            mobileCta.addEventListener('click', closeMenu);
        }
    }
});

// Expose functions to global scope for HTML onclick attributes
window.toggleAccordion = toggleAccordion;
window.toggleFields = toggleFields;
window.switchFaq = switchFaq;
