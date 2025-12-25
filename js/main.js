// Mobile navigation toggle
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
        navToggle.classList.toggle("open");
        navMenu.classList.toggle("open");
    });

    // close menu when clicking a link (mobile)
    navMenu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navToggle.classList.remove("open");
            navMenu.classList.remove("open");
        });
    });
}

// Dynamic footer year
const yearSpan = document.getElementById("year");
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// Client-side submission to a Formspree endpoint (no mail client required)
// IMPORTANT: Replace the placeholder below with your Formspree endpoint, e.g. 'https://formspree.io/f/abcd1234'
const FORMSPREE_URL = 'https://formsubmit.co/ajax/prayaschessacademy@gmail.com';

const contactForm = document.getElementById("contactForm");

if (contactForm) {
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const statusDiv = document.getElementById('formStatus');

    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        submitBtn.disabled = true;
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        statusDiv.textContent = '';
        statusDiv.className = 'form-status';

        const formData = new FormData(contactForm);

        try {
            const resp = await fetch(FORMSPREE_URL, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (resp.ok) {
                statusDiv.className = 'form-status success';
                statusDiv.textContent = '✅ Thank you — your details were submitted. We will contact you soon.';
                contactForm.reset();
            } else {
                const data = await resp.json().catch(() => ({}));
                throw new Error(data.error || 'Form submission failed');
            }
            } catch (err) {
                statusDiv.className = 'form-status error';
                statusDiv.innerHTML = '⚠️ There was a problem submitting the form. Please try again later or email us at <a href="mailto:youremail@example.com">youremail@example.com</a>.';
                console.error('Form submit error:', err);
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
}
