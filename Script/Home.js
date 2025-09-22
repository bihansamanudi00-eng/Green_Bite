// ---------------------------------------------------------- HERO SLIDER (Home Page)----------------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
  if (document.querySelectorAll(".slide").length) {
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;

    function showNextSlide() {
      slides.forEach(slide => slide.classList.remove("active"));
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add("active");
      document.querySelector(".slides").style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    setInterval(showNextSlide, 4000);
  }
});


//--------------------------------------------------------------Daily Healthy Tip (Home Page)----------------------------------------
if (document.getElementById("dailyTip")) {
  const tips = [
    "DRINK AT LEAST 8 GLASSES OF WATER DAILY",
    "TAKE A 20 MINUTE WALK TO REFRESH YOUR MIND",
    "MEDITATE FOR 10 MINUTES TO REDUCE STRESS",
    "INCLUDE MORE VEGETABLES IN YOUR MEALS",
    "GET AT LEAST 7-8 HOURS OF SLEEP"
  ];

  const date = new Date();
  const tipIndex = date.getDate() % tips.length;
  document.getElementById("dailyTip").textContent = tips[tipIndex];

  // Format today's date (e.g., September 17, 2025)
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = date.toLocaleDateString(undefined, options);

  // Set the formatted date in an element with id "dailyDate"
  if (document.getElementById("dailyDate")) {
    document.getElementById("dailyDate").textContent = formattedDate;
  }
}







///--------------------------------------------------------------------------News letter----------------------------------------------------------
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
