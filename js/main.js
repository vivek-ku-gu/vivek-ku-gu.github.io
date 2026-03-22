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

// Client-side submission to a FormSubmit endpoint (no mail client required).
// IMPORTANT: Update the form's action attribute to use the FormSubmit activation token you received by email.
// Example action: https://formsubmit.co/ajax/abcd1234
const DEFAULT_FORMSUBMIT_ENDPOINT = 'https://formsubmit.co/ajax/76794377953d50485b51595a6f55bb71 ';

const contactForm = document.getElementById("contactForm");

if (contactForm) {
    // Prefer the action attribute (so you can edit the token directly in HTML). If missing, use the placeholder.
    const FORMSPREE_URL = contactForm.getAttribute('action') || DEFAULT_FORMSUBMIT_ENDPOINT;
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
                const contentType = resp.headers.get('content-type') || '';
                if (contentType.includes('application/json')) {
                    const data = await resp.json().catch(() => ({}));
                    throw new Error(data.error || 'Form submission failed');
                } else {
                    const text = await resp.text().catch(() => '');
                    if (/Activate Form|one step away/i.test(text)) {
                        throw new Error('ACTIVATE_FORM_SUBMIT');
                    }
                    throw new Error('Form submission failed');
                }
            }
        } catch (err) {
            statusDiv.className = 'form-status error';
            if (err.message === 'ACTIVATE_FORM_SUBMIT') {
                statusDiv.innerHTML = '⚠️ FormSubmit requires activation. Please check your email for the activation link from FormSubmit or visit <a href="https://formsubmit.co" target="_blank">FormSubmit</a> to activate the form.';
            } else {
                statusDiv.innerHTML = '⚠️ There was a problem submitting the form. Please try again later or contact us at <a href="tel:+919938011913">+91 99380 11913</a>.';
                console.error('Form submit error:', err);
            }
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
}
