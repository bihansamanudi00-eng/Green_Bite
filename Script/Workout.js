// Exercise database
const exercises = {
    "full-body": {
        "none": [
            { name: "Burpees", duration: 45, rest: 15 },
            { name: "Jumping Jacks", duration: 30, rest: 15 },
            { name: "Push-ups", duration: 30, rest: 15 },
            { name: "Squats", duration: 30, rest: 15 },
            { name: "Plank", duration: 30, rest: 15 },
            { name: "Mountain Climbers", duration: 30, rest: 15 },
            { name: "Lunges", duration: 30, rest: 15 },
            { name: "High Knees", duration: 30, rest: 15 }
        ],
        "dumbbells": [
            { name: "Dumbbell Squats", duration: 45, rest: 15 },
            { name: "Dumbbell Lunges", duration: 45, rest: 15 },
            { name: "Dumbbell Shoulder Press", duration: 45, rest: 15 },
            { name: "Dumbbell Bicep Curls", duration: 45, rest: 15 },
            { name: "Dumbbell Rows", duration: 45, rest: 15 },
            { name: "Dumbbell Deadlifts", duration: 45, rest: 15 },
            { name: "Dumbbell Chest Press", duration: 45, rest: 15 },
            { name: "Dumbbell Side Bends", duration: 45, rest: 15 }
        ],
        "machine": [
            { name: "Leg Press", duration: 45, rest: 15 },
            { name: "Chest Press", duration: 45, rest: 15 },
            { name: "Lat Pulldown", duration: 45, rest: 15 },
            { name: "Shoulder Press", duration: 45, rest: 15 },
            { name: "Leg Curl", duration: 45, rest: 15 },
            { name: "Leg Extension", duration: 45, rest: 15 },
            { name: "Seated Row", duration: 45, rest: 15 },
            { name: "Calf Raise", duration: 45, rest: 15 }
        ],
        "bands": [
            { name: "Band Squats", duration: 45, rest: 15 },
            { name: "Band Chest Press", duration: 45, rest: 15 },
            { name: "Band Rows", duration: 45, rest: 15 },
            { name: "Band Shoulder Press", duration: 45, rest: 15 },
            { name: "Band Bicep Curls", duration: 45, rest: 15 },
            { name: "Band Tricep Extensions", duration: 45, rest: 15 },
            { name: "Band Lateral Walks", duration: 45, rest: 15 },
            { name: "Band Glute Bridges", duration: 45, rest: 15 }
        ]
    },
    "arms": {
        "none": [
            { name: "Push-ups", duration: 30, rest: 15 },
            { name: "Tricep Dips", duration: 30, rest: 15 },
            { name: "Plank to Push-up", duration: 30, rest: 15 },
            { name: "Diamond Push-ups", duration: 30, rest: 15 },
            { name: "Arm Circles", duration: 30, rest: 15 }
        ],
        "dumbbells": [
            { name: "Dumbbell Bicep Curls", duration: 45, rest: 15 },
            { name: "Dumbbell Tricep Extensions", duration: 45, rest: 15 },
            { name: "Dumbbell Hammer Curls", duration: 45, rest: 15 },
            { name: "Dumbbell Overhead Tricep Extension", duration: 45, rest: 15 },
            { name: "Dumbbell Concentration Curls", duration: 45, rest: 15 }
        ],
        "machine": [
            { name: "Tricep Pushdown", duration: 45, rest: 15 },
            { name: "Bicep Curl Machine", duration: 45, rest: 15 },
            { name: "Cable Tricep Extensions", duration: 45, rest: 15 },
            { name: "Cable Bicep Curls", duration: 45, rest: 15 },
            { name: "Cable Hammer Curls", duration: 45, rest: 15 }
        ],
        "bands": [
            { name: "Band Bicep Curls", duration: 45, rest: 15 },
            { name: "Band Tricep Extensions", duration: 45, rest: 15 },
            { name: "Band Hammer Curls", duration: 45, rest: 15 },
            { name: "Band Overhead Tricep Extension", duration: 45, rest: 15 },
            { name: "Band Concentration Curls", duration: 45, rest: 15 }
        ]
    },
    "legs": {
        "none": [
            { name: "Squats", duration: 30, rest: 15 },
            { name: "Lunges", duration: 30, rest: 15 },
            { name: "Jump Squats", duration: 30, rest: 15 },
            { name: "Wall Sit", duration: 30, rest: 15 },
            { name: "Calf Raises", duration: 30, rest: 15 }
        ],
        "dumbbells": [
            { name: "Dumbbell Squats", duration: 45, rest: 15 },
            { name: "Dumbbell Lunges", duration: 45, rest: 15 },
            { name: "Dumbbell Deadlifts", duration: 45, rest: 15 },
            { name: "Dumbbell Step-ups", duration: 45, rest: 15 },
            { name: "Dumbbell Calf Raises", duration: 45, rest: 15 }
        ],
        "machine": [
            { name: "Leg Press", duration: 45, rest: 15 },
            { name: "Leg Extension", duration: 45, rest: 15 },
            { name: "Leg Curl", duration: 45, rest: 15 },
            { name: "Calf Raise Machine", duration: 45, rest: 15 },
            { name: "Hip Abductor Machine", duration: 45, rest: 15 }
        ],
        "bands": [
            { name: "Band Squats", duration: 45, rest: 15 },
            { name: "Band Lunges", duration: 45, rest: 15 },
            { name: "Band Glute Bridges", duration: 45, rest: 15 },
            { name: "Band Lateral Walks", duration: 45, rest: 15 },
            { name: "Band Calf Raises", duration: 45, rest: 15 }
        ]
    },
    "core": {
        "none": [
            { name: "Plank", duration: 30, rest: 15 },
            { name: "Crunches", duration: 30, rest: 15 },
            { name: "Leg Raises", duration: 30, rest: 15 },
            { name: "Russian Twists", duration: 30, rest: 15 },
            { name: "Mountain Climbers", duration: 30, rest: 15 }
        ],
        "dumbbells": [
            { name: "Dumbbell Side Bends", duration: 45, rest: 15 },
            { name: "Dumbbell Russian Twists", duration: 45, rest: 15 },
            { name: "Dumbbell Wood Chops", duration: 45, rest: 15 },
            { name: "Dumbbell Sit-ups", duration: 45, rest: 15 },
            { name: "Dumbbell Plank Row", duration: 45, rest: 15 }
        ],
        "machine": [
            { name: "Cable Crunches", duration: 45, rest: 15 },
            { name: "Cable Wood Chops", duration: 45, rest: 15 },
            { name: "Cable Russian Twists", duration: 45, rest: 15 },
            { name: "Ab Machine", duration: 45, rest: 15 },
            { name: "Cable Side Bends", duration: 45, rest: 15 }
        ],
        "bands": [
            { name: "Band Crunches", duration: 45, rest: 15 },
            { name: "Band Russian Twists", duration: 45, rest: 15 },
            { name: "Band Wood Chops", duration: 45, rest: 15 },
            { name: "Band Side Bends", duration: 45, rest: 15 },
            { name: "Band Plank", duration: 45, rest: 15 }
        ]
    }
};

// Timer variables
let timerInterval;
let secondsRemaining = 0;
let isTimerRunning = false;
let currentExerciseName = "";

// DOM elements
const workoutForm = document.getElementById('rwg-workout-form');
const workoutPlan = document.getElementById('rwg-workout-plan');
const timerCircle = document.getElementById('rwg-timer-circle');
const timerText = document.getElementById('rwg-timer-text');
const currentExercise = document.getElementById('rwg-current-exercise');
const startTimerBtn = document.getElementById('rwg-start-timer');
const pauseTimerBtn = document.getElementById('rwg-pause-timer');
const resetTimerBtn = document.getElementById('rwg-reset-timer');
const notification = document.getElementById('rwg-notification');
const notificationText = document.getElementById('rwg-notification-text');

// Check if all elements exist
if (!workoutForm || !workoutPlan || !timerCircle || !timerText || !currentExercise || 
    !startTimerBtn || !pauseTimerBtn || !resetTimerBtn || !notification || !notificationText) {
    console.error('One or more required DOM elements not found');
} else {
    // Event listeners
    workoutForm.addEventListener('submit', function(e) {
        e.preventDefault();
        generateWorkout();
    });
    
    startTimerBtn.addEventListener('click', function() {
        startTimer();
    });
    
    pauseTimerBtn.addEventListener('click', function() {
        pauseTimer();
    });
    
    resetTimerBtn.addEventListener('click', function() {
        resetTimer();
    });
    
    // Initialize timer display
    updateTimerDisplay();
}

// Generate workout function
function generateWorkout() {
    try {
        const bodyPart = document.getElementById('rwg-body-part').value;
        const equipment = document.getElementById('rwg-equipment').value;
        
        if (!bodyPart || !equipment) {
            showNotification('Please select both body part and equipment');
            return;
        }
        
        // Get exercises for selected body part and equipment
        const selectedExercises = exercises[bodyPart][equipment];
        
        if (!selectedExercises || selectedExercises.length === 0) {
            showNotification('No exercises found for selected options');
            return;
        }
        
        // Randomly select 5 exercises
        const workoutExercises = [];
        const exerciseIndices = [];
        
        while (workoutExercises.length < 5) {
            const randomIndex = Math.floor(Math.random() * selectedExercises.length);
            if (!exerciseIndices.includes(randomIndex)) {
                exerciseIndices.push(randomIndex);
                workoutExercises.push(selectedExercises[randomIndex]);
            }
        }
        
        // Display workout plan
        displayWorkoutPlan(workoutExercises);
        
        // Show notification
        showNotification("Workout plan generated successfully!");
    } catch (error) {
        console.error('Error generating workout:', error);
        showNotification('Error generating workout plan');
    }
}

// Display workout plan
function displayWorkoutPlan(exercises) {
    try {
        workoutPlan.innerHTML = '';
        
        exercises.forEach((exercise, index) => {
            const workoutItem = document.createElement('div');
            workoutItem.className = 'rwg-workout-item';
            
            workoutItem.innerHTML = `
                <div>
                    <div class="rwg-workout-name">${index + 1}. ${exercise.name}</div>
                    <div class="rwg-workout-details">${exercise.duration}s work, ${exercise.rest}s rest</div>
                </div>
                <button class="rwg-start-btn" data-exercise="${exercise.name}" data-duration="${exercise.duration}">Start</button>
            `;
            
            workoutPlan.appendChild(workoutItem);
        });
        
        // Add event listeners to start buttons
        const startButtons = document.querySelectorAll('.rwg-start-btn');
        startButtons.forEach(button => {
            button.addEventListener('click', function() {
                const exerciseName = this.getAttribute('data-exercise');
                const duration = parseInt(this.getAttribute('data-duration'));
                
                if (exerciseName && duration) {
                    currentExerciseName = exerciseName;
                    currentExercise.textContent = `Current Exercise: ${exerciseName}`;
                    
                    resetTimer();
                    secondsRemaining = duration;
                    updateTimerDisplay();
                    
                    // Scroll to timer
                    const timerContainer = document.querySelector('.rwg-timer-container');
                    if (timerContainer) {
                        timerContainer.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });
    } catch (error) {
        console.error('Error displaying workout plan:', error);
        showNotification('Error displaying workout plan');
    }
}

// Timer functions
function startTimer() {
    try {
        if (!isTimerRunning && secondsRemaining > 0) {
            isTimerRunning = true;
            timerCircle.classList.add('rwg-active');
            
            timerInterval = setInterval(() => {
                secondsRemaining--;
                updateTimerDisplay();
                
                if (secondsRemaining <= 0) {
                    pauseTimer();
                    playSound();
                    showNotification(`Time's up! Rest for ${getRestTime()} seconds.`);
                }
            }, 1000);
        }
    } catch (error) {
        console.error('Error starting timer:', error);
        showNotification('Error starting timer');
    }
}

function pauseTimer() {
    try {
        isTimerRunning = false;
        timerCircle.classList.remove('rwg-active');
        clearInterval(timerInterval);
    } catch (error) {
        console.error('Error pausing timer:', error);
    }
}

function resetTimer() {
    try {
        pauseTimer();
        secondsRemaining = 0;
        updateTimerDisplay();
    } catch (error) {
        console.error('Error resetting timer:', error);
    }
}

function updateTimerDisplay() {
    try {
        const minutes = Math.floor(secondsRemaining / 60);
        const seconds = secondsRemaining % 60;
        
        timerText.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } catch (error) {
        console.error('Error updating timer display:', error);
    }
}

function getRestTime() {
    try {
        const bodyPart = document.getElementById('rwg-body-part').value;
        const equipment = document.getElementById('rwg-equipment').value;
        
        if (bodyPart && equipment && exercises[bodyPart] && exercises[bodyPart][equipment]) {
            const selectedExercises = exercises[bodyPart][equipment];
            const exercise = selectedExercises.find(ex => ex.name === currentExerciseName);
            
            return exercise ? exercise.rest : 15;
        }
        return 15;
    } catch (error) {
        console.error('Error getting rest time:', error);
        return 15;
    }
}

// Sound function
function playSound() {
    try {
        // Create audio context for beep sound
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.type = 'sine';
        oscillator.frequency.value = 800;
        gainNode.gain.value = 0.3;
        
        oscillator.start();
        
        // Stop after 0.3 seconds
        setTimeout(() => {
            oscillator.stop();
        }, 300);
    } catch (error) {
        console.error('Error playing sound:', error);
    }
}

// Notification function
function showNotification(message) {
    try {
        notificationText.textContent = message;
        notification.classList.add('rwg-show');
        
        setTimeout(() => {
            notification.classList.remove('rwg-show');
        }, 3000);
    } catch (error) {
        console.error('Error showing notification:', error);
    }
}
///-----------------------------------------------News letter----------------------------------------------------------
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

// Example: workout generator
const workouts = ["Push-ups", "Squats", "Plank", "Burpees", "Lunges"];

// Pick random workout using reusable function
let sum = addNumbers(5, 10);
    console.log(sum);

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js")
    .then(reg => console.log("Service Worker registered:", reg))
    .catch(err => console.log("Service Worker failed:", err));
}

