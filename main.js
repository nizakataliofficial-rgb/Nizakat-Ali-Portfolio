const topNavbar = document.getElementById('topNavbar');
const menuToggleBtn = document.getElementById('menuToggleBtn');
const sideDrawer = document.getElementById('sideDrawer');
const closeDrawerBtn = document.getElementById('closeDrawerBtn');
const drawerOverlay = document.getElementById('drawerOverlay');
const drawerLinks = document.querySelectorAll('.drawer-link');

// Scroll Logic for Navbar (auto-hide only on larger screens; stays pinned on mobile/tablet)
window.addEventListener('scroll', () => {
    if (window.innerWidth > 991 && window.scrollY > 100) {
        topNavbar.classList.add('hidden');
    } else {
        topNavbar.classList.remove('hidden');
        if (window.scrollY <= 100) closeMenu();
    }
});

// Open Side Drawer
menuToggleBtn.addEventListener('click', () => {
    sideDrawer.classList.add('open');
    drawerOverlay.classList.add('active');
});

// Close Side Drawer
function closeMenu() {
    sideDrawer.classList.remove('open');
    drawerOverlay.classList.remove('active');
}

closeDrawerBtn.addEventListener('click', closeMenu);
drawerOverlay.addEventListener('click', closeMenu);

// Close Drawer when clicking any link
drawerLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});


// Dynamic Custom Cursor Glow Effect
const cursorGlow = document.createElement('div');
cursorGlow.classList.add('cursor-glow');
document.body.appendChild(cursorGlow);

document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

const stats = document.querySelectorAll('.stat-box h3');
let animated = false;

window.addEventListener('scroll', () => {
    const aboutSection = document.getElementById('about');
    if (!aboutSection) return;

    const sectionPos = aboutSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight / 1.3;

    if (sectionPos < screenPos && !animated) {
        stats.forEach(stat => {
            const target = parseInt(stat.innerText);
            let count = 0;
            const speed = 2000 / target; 

            const updateCount = () => {
                count++;
                if (count <= target) {
                    stat.innerText = count + (stat.innerText.includes('%') ? '%' : '+');
                    setTimeout(updateCount, speed);
                }
            };
            updateCount();
        });
        animated = true;
    }
});

const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault(); 
        const nameInput = contactForm.querySelector('input[type="text"]');
        const emailInput = contactForm.querySelector('input[type="email"]');
        const messageInput = contactForm.querySelector('textarea');

        const senderName = nameInput ? nameInput.value.trim() : 'Friend';

        Swal.fire({
            title: `Thank You, ${senderName}! 🎉`,
            html: `
                <p style="color: #cbd5e1; font-size: 15px; margin-top: 10px; line-height: 1.6;">
                    Your message has been received successfully. I appreciate you taking the time to reach out!
                </p>
                <div style="background: rgba(56, 189, 248, 0.1); border: 1px solid rgba(56, 189, 248, 0.3); border-radius: 10px; padding: 12px; margin-top: 15px;">
                    <span style="color: #38bdf8; font-size: 13px; font-weight: 500;">
                        ⚡ Direct response will be sent to your email shortly.
                    </span>
                </div>
            `,
            icon: 'success',
            iconColor: '#38bdf8',
            background: '#081B28',
            color: '#ffffff',
            confirmButtonText: 'Great, Thanks!',
            confirmButtonColor: '#38bdf8',
            customClass: {
                popup: 'swal-custom-popup',
                confirmButton: 'swal-custom-btn'
            },
            showClass: {
                popup: 'animate__animated animate__fadeInUp'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutDown'
            }
        });

        contactForm.reset();
    });
}

// Contact section Connect with my Mail 

const form = document.getElementById('form');
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    formData.append("access_key", "14d9ec3e-3f37-49e8-b66d-bc0dbf2ee7f8");

    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            alert("Success! Your message has been sent.");
            form.reset();
        } else {
            alert("Error: " + data.message);
        }

    } catch (error) {
        alert("Something went wrong. Please try again.");
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});
const formData = new FormData(contactForm);
formData.append("access_key", "14d9ec3e-3f37-49e8-b66d-bc0dbf2ee7f8");