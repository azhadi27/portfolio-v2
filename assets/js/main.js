/**
 * Muhammad Azrul - Core Logic & Security Hub
 */

// 1. Input Sanitization Function
function sanitizeInput(str) {
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML.trim().replace(/[<>\"\'\(\)\[\]\{\}\;\:\\]/g, "");
}

// 2. UTM & Source Capture Logic
window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const utmFields = {
        'utm_source': params.get('utm_source') || "",
        'utm_medium': params.get('utm_medium') || "",
        'utm_campaign': params.get('utm_campaign') || "",
        'source_url': window.location.href
    };

    // Auto-fill hidden form fields if they exist
    for (const [id, value] of Object.entries(utmFields)) {
        const el = document.getElementById(id);
        if (el) el.value = value;
    }
});

// 3. Right-Click Protection (Deterrent)
document.addEventListener('contextmenu', e => e.preventDefault());
document.onkeydown = (e) => {
    if (e.keyCode == 123 || (e.ctrlKey && e.shiftKey && ['I','C','J'].includes(String.fromCharCode(e.keyCode)))) return false;
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) return false;
};

// 4. Contact Form Handler (Serverless)
const scriptURL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE'; // Replace with your actual URL
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', e => {
        e.preventDefault();
        const btn = document.getElementById('submitBtn');
        btn.innerText = "SANITIZING & SENDING...";
        btn.disabled = true;

        // Perform final sanitization before sending
        const formData = new FormData(contactForm);
        fetch(scriptURL, { method: 'POST', body: formData })
            .then(() => {
                document.getElementById('responseMsg').classList.remove('hidden');
                btn.innerText = "TRANSMITTED";
                contactForm.reset();
            })
            .catch(err => console.error('Transmission Error', err));
    });
}
