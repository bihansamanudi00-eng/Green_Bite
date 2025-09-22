document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact-form form");
  const messageEl = document.createElement("p");
  messageEl.classList.add("form-message");
  messageEl.style.display = "none";
  form.parentNode.appendChild(messageEl); // Add message container below form

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const firstName = this.querySelector("input[placeholder='Your first name']").value.trim();
    const lastName = this.querySelector("input[placeholder='Your last name']").value.trim();
    const email = this.querySelector("input[type='email']").value.trim();
    const mobile = this.querySelector("input[placeholder='+94 712345678']").value.trim();
    const message = this.querySelector("textarea").value.trim();

    // Basic validation
    if (!firstName || !lastName || !email || !mobile || !message) {
      messageEl.textContent = "Please fill all fields before submitting.";
      messageEl.style.color = "red";
      messageEl.style.display = "block";
      return;
    }

    // Create a submission object
    const submission = {
      firstName,
      lastName,
      email,
      mobile,
      message,
      submittedAt: new Date().toISOString(),
    };

    // Retrieve existing submissions or create new array
    let submissions = JSON.parse(localStorage.getItem("contactSubmissions")) || [];

    // Add new submission
    submissions.push(submission);

    // Save updated array to localStorage
    localStorage.setItem("contactSubmissions", JSON.stringify(submissions));

    // Show thank you message
    messageEl.textContent = "Thank you for reaching out! We have received your message and will respond shortly.";
    messageEl.style.color = "green";
    messageEl.style.display = "block";

    // Reset the form
    this.reset();
  });
});



document.addEventListener('DOMContentLoaded', () => {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all active items
      faqItems.forEach(i => {
        i.classList.remove('active');
        i.querySelector('.faq-answer').style.maxHeight = null;
      });

      // Toggle current FAQ item
      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
});





//------------------------------------------------------------------------------------News Letter-------------------------------------------------------------
if (document.getElementById("newsletterForm")) {
    const form = document.getElementById("newsletterForm");
    const message = document.getElementById("newsletterMessage");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = document.getElementById("newsletterEmail").value.trim();

      if (email && email.includes("@") && email.includes(".")) {
        let subscribers = JSON.parse(localStorage.getItem("subscribers")) || [];
        subscribers.push(email);
        localStorage.setItem("subscribers", JSON.stringify(subscribers));

        message.textContent = "Thank you for subscribing!";
        message.className = "success";
        message.style.display = "block";

        form.reset();
      } else {
        message.textContent = "Please enter a valid email address.";
        message.className = "error";
        message.style.display = "block";
      }
    });
  }

  if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js")
    .then(reg => console.log("Service Worker registered:", reg))
    .catch(err => console.log("Service Worker failed:", err));
}
