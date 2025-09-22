if (document.getElementById("calc-form")) {
  document.getElementById("calc-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const age = parseInt(document.getElementById("age").value);
    const gender = document.getElementById("gender").value;
    const height = parseFloat(document.getElementById("height").value);
    const weight = parseFloat(document.getElementById("weight").value);
    const activity = parseFloat(document.getElementById("activity").value);

    if (isNaN(age) || !gender || isNaN(height) || isNaN(weight) || isNaN(activity)) {
      alert("Please fill all fields correctly");
      return;
    }

    // Calculate BMR
    let bmr;
    if (gender === "male") {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    // Calculate TDEE
    const tdee = bmr * activity;

    // Macronutrients calculations
    const carbs = ((tdee * 0.50) / 4).toFixed(0);
    const protein = ((tdee * 0.20) / 4).toFixed(0);
    const fats = ((tdee * 0.30) / 9).toFixed(0);

    // Display numbers
    document.getElementById("bmr").textContent = bmr.toFixed(0);
    document.getElementById("tdee").textContent = tdee.toFixed(0);

    // Update bars width safely (ensure max bar lengths as per your design)
    document.getElementById("carbs-bar").style.width = Math.min((carbs / 400) * 100, 100) + "%";
    document.getElementById("protein-bar").style.width = Math.min((protein / 200) * 100, 100) + "%";
    document.getElementById("fats-bar").style.width = Math.min((fats / 100) * 100, 100) + "%";

    // Show results container
    document.getElementById("results").classList.remove("hidden");

    // Calorie message and color
    const messageEl = document.getElementById("calorie-message");
    if (tdee < 1800) {
      messageEl.textContent = "Your calories are LOW.";
      messageEl.style.color = "#DBA400";
    } else if (tdee <= 2500) {
      messageEl.textContent = "Your calories are MEDIUM.";
      messageEl.style.color = "#253D2C";
    } else {
      messageEl.textContent = "Your calories are HIGH.";
      messageEl.style.color = "#540808";
    }

    // Update visual gauges
    updateGauges(bmr, tdee);
  });
}

function updateGauges(bmr, tdee) {
  const bmrFill = document.getElementById('bmr-fill');
  const bmrValue = document.getElementById('bmr-value');
  const bmrLabel = document.getElementById('bmr-label');

  bmrValue.textContent = Math.round(bmr);

  let bmrColor, bmrLabelText;
  if (bmr < 1400) {
    bmrColor = '#e74c3c'; // red
    bmrLabelText = 'Low';
  } else if (bmr < 2000) {
    bmrColor = '#f39c12'; // orange
    bmrLabelText = 'Medium';
  } else {
    bmrColor = '#2ecc71'; // green
    bmrLabelText = 'High';
  }

  bmrLabel.textContent = bmrLabelText;

  const bmrPercentage = Math.min(bmr / 2500 * 100, 100);
  bmrFill.style.background = `conic-gradient(${bmrColor} 0deg ${bmrPercentage * 3.6}deg, transparent ${bmrPercentage * 3.6}deg 360deg)`;

  // TDEE gauge
  const tdeeFill = document.getElementById('tdee-fill');
  const tdeeValue = document.getElementById('tdee-value');
  const tdeeLabel = document.getElementById('tdee-label');

  tdeeValue.textContent = Math.round(tdee);

  let tdeeColor, tdeeLabelText;
  if (tdee < 1800) {
    tdeeColor = '#e74c3c'; // red
    tdeeLabelText = 'Low';
  } else if (tdee < 2600) {
    tdeeColor = '#f39c12'; // orange
    tdeeLabelText = 'Medium';
  } else {
    tdeeColor = '#2ecc71'; // green
    tdeeLabelText = 'High';
  }

  tdeeLabel.textContent = tdeeLabelText;

  const tdeePercentage = Math.min(tdee / 3500 * 100, 100);
  tdeeFill.style.background = `conic-gradient(${tdeeColor} 0deg ${tdeePercentage * 3.6}deg, transparent ${tdeePercentage * 3.6}deg 360deg)`;
}

// ///-----------------------------------------------News letter----------------------------------------------------------
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

