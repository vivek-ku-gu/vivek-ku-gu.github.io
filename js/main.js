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

// Optional: basic client‑side validation feedback on contact form
const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
        if (!contactForm.checkValidity()) {
            e.preventDefault();
            contactForm.reportValidity();
        } else {
            // For mailto forms it is better UX to show a small message
            alert("Your details will be prepared in your email app. Please press send to complete the enquiry.");
        }
    });
}
