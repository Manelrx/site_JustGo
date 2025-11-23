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
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
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
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
            }
        }
    );
});
