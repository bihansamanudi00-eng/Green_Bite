// Mindfulness App JavaScript
class MindfulnessApp {
  constructor() {
    this.isTimerActive = false;
    this.timeLeft = 25 * 60; // 25 minutes in seconds
    this.timerMode = 'pomodoro';
    this.timerInterval = null;

    this.isBreathingActive = false;
    this.breathingPhase = 'inhale';
    this.breathingInterval = null;

    this.activeSounds = new Set();
    this.masterVolume = 0.3;
    this.audioElements = {};

    this.sessions = [];

    this.init();
  }

  init() {
    this.loadSessions();
    this.setupEventListeners();
    this.setupSounds();
    this.updateDisplay();
    this.updateStats();
    this.renderSessions();
  }

  // Session Management
  loadSessions() {
    const savedSessions = localStorage.getItem('mindfulness-sessions');
    if (savedSessions) {
      this.sessions = JSON.parse(savedSessions).map(session => ({
        ...session,
        completedAt: session.completedAt ? new Date(session.completedAt) : undefined
      }));
    } else {
      this.sessions = [
        { id: '1', name: 'Morning Meditation', completed: false },
        { id: '2', name: 'Midday Break', completed: false },
        { id: '3', name: 'Evening Reflection', completed: false },
        { id: '4', name: 'Night Wind-down', completed: false }
      ];
      this.saveSessions();
    }
  }

  saveSessions() {
    localStorage.setItem('mindfulness-sessions', JSON.stringify(this.sessions));
    this.updateStats();
  }

  toggleSession(sessionId) {
    const session = this.sessions.find(s => s.id === sessionId);
    if (session) {
      session.completed = !session.completed;
      session.completedAt = session.completed ? new Date() : undefined;
      this.saveSessions();
      this.renderSessions();

      // Show success message
      if (session.completed) {
        this.showNotification(`✅ ${session.name} completed!`, 'success');
      }
    }
  }

  // Timer Functions
  setupEventListeners() {
    // Timer controls
    document.getElementById('timerToggle').addEventListener('click', () => this.toggleTimer());
    document.getElementById('timerReset').addEventListener('click', () => this.resetTimer());

    // Timer mode selection
    document.querySelectorAll('.mode-btn').forEach(btn => {
      btn.addEventListener('click', (e) => this.setTimerMode(e.target.dataset.mode));
    });

    // Breathing controls
    document.getElementById('breathingToggle').addEventListener('click', () => this.toggleBreathing());

    // Volume control
    document.getElementById('volumeSlider').addEventListener('input', (e) => {
      this.setMasterVolume(parseFloat(e.target.value));
    });
  }

  toggleTimer() {
    this.isTimerActive = !this.isTimerActive;

    if (this.isTimerActive) {
      this.startTimer();
    } else {
      this.pauseTimer();
    }

    this.updateTimerButton();
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      this.timeLeft--;
      this.updateDisplay();

      if (this.timeLeft <= 0) {
        this.completeTimer();
      }
    }, 1000);
  }

  pauseTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  resetTimer() {
    this.pauseTimer();
    this.isTimerActive = false;
    this.timeLeft = this.timerMode === 'pomodoro' ? 25 * 60 : 10 * 60;
    this.updateDisplay();
    this.updateTimerButton();
  }

  completeTimer() {
    this.pauseTimer();
    this.isTimerActive = false;
    this.updateTimerButton();

    // Mark next incomplete session as complete
    const nextSession = this.sessions.find(s => !s.completed);
    if (nextSession) {
      this.toggleSession(nextSession.id);
    }

    this.showNotification('🎉 Timer completed! Great job!', 'success');
    this.playCompletionSound();
  }

  setTimerMode(mode) {
    this.timerMode = mode;
    this.resetTimer();

    // Update mode buttons
    document.querySelectorAll('.mode-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mode === mode);
    });
  }

  updateTimerButton() {
    const button = document.getElementById('timerToggle');
    const icon = button.querySelector('i');
    const text = button.querySelector('span');

    if (this.isTimerActive) {
      icon.className = 'fas fa-pause';
      text.textContent = 'Pause';
    } else {
      icon.className = 'fas fa-play';
      text.textContent = 'Start';
    }
  }

  // Breathing Animation
  toggleBreathing() {
    this.isBreathingActive = !this.isBreathingActive;

    const button = document.getElementById('breathingToggle');
    const circle = document.getElementById('breathingCircle');

    if (this.isBreathingActive) {
      button.textContent = 'Pause Breathing';
      button.classList.add('active');
      this.startBreathing();
    } else {
      button.textContent = 'Start Breathing';
      button.classList.remove('active');
      this.stopBreathing();
      circle.className = 'breathing-circle';
      document.getElementById('breathingText').textContent = 'Press Start';
    }
  }

  startBreathing() {
    const phases = [
      { phase: 'inhale', duration: 4000, text: 'Breathe In...' },
      { phase: 'hold', duration: 2000, text: 'Hold...' },
      { phase: 'exhale', duration: 6000, text: 'Breathe Out...' },
      { phase: 'pause', duration: 1000, text: 'Relax...' }
    ];

    let currentIndex = 0;

    const cyclePhases = () => {
      if (!this.isBreathingActive) return;

      const currentPhase = phases[currentIndex];
      this.breathingPhase = currentPhase.phase;

      const circle = document.getElementById('breathingCircle');
      const text = document.getElementById('breathingText');

      // Update visual state
      circle.className = `breathing-circle ${currentPhase.phase}`;
      text.textContent = currentPhase.text;

      // Schedule next phase
      setTimeout(() => {
        currentIndex = (currentIndex + 1) % phases.length;
        if (this.isBreathingActive) {
          cyclePhases();
        }
      }, currentPhase.duration);
    };

    cyclePhases();
  }

  stopBreathing() {
    this.isBreathingActive = false;
  }

  // Sound Management
  setupSounds() {
    const sounds = [
      { name: 'Rain', icon: '🌧️', file:'Audio/calming-rain-257596.mp3' },
      { name: 'Forest', icon: '🌲', file: 'Audio/forest-ambience-296528.mp3' },
      { name: 'Ocean', icon: '🌊', file: 'Audio/ocean-waves-266187.mp3' },
      { name: 'White Noise', icon: '⚪', file: 'Audio/wind-blowing-sfx-12809.mp3' }
    ];

    const soundGrid = document.getElementById('soundGrid');
    soundGrid.innerHTML = '';

    sounds.forEach(sound => {
      // Create audio element
      const audio = new Audio();
      audio.src = sound.file;
      audio.loop = true;
      audio.volume = this.masterVolume;

      // Handle loading errors gracefully
      audio.addEventListener('error', () => {
        console.warn(`Could not load audio file: ${sound.file}`);
      });

      this.audioElements[sound.name] = audio;

      // Create button
      const button = document.createElement('button');
      button.className = 'sound-btn';
      button.innerHTML = `
        <span class="sound-icon">${sound.icon}</span>
        <div class="sound-name">${sound.name}</div>
        <div class="sound-status" style="display: none;">Playing</div>
      `;

      button.addEventListener('click', () => this.toggleSound(sound.name));
      soundGrid.appendChild(button);
    });
  }

  toggleSound(soundName) {
    const audio = this.audioElements[soundName];
    const button = Array.from(document.querySelectorAll('.sound-btn')).find(btn => 
      btn.querySelector('.sound-name').textContent === soundName
    );

    if (!audio || !button) return;

    if (this.activeSounds.has(soundName)) {
      // Stop sound
      this.activeSounds.delete(soundName);
      audio.pause();
      button.classList.remove('active');
      button.querySelector('.sound-status').style.display = 'none';
    } else {
      // Start sound
      this.activeSounds.add(soundName);
      audio.play().catch(e => {
        console.warn(`Could not play ${soundName}:`, e);
        this.activeSounds.delete(soundName);
      });
      button.classList.add('active');
      button.querySelector('.sound-status').style.display = 'block';
    }

    this.updateStats();
  }

  setMasterVolume(volume) {
    this.masterVolume = volume;
    Object.values(this.audioElements).forEach(audio => {
      audio.volume = volume;
    });
  }

  // Display Updates
  updateDisplay() {
    const minutes = Math.floor(this.timeLeft / 60);
    const seconds = this.timeLeft % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    document.getElementById('timerDisplay').textContent = timeString;
    document.getElementById('timeDisplay').textContent = timeString;

    // Update progress bar
    const totalTime = this.timerMode === 'pomodoro' ? 25 * 60 : 10 * 60;
    const progress = ((totalTime - this.timeLeft) / totalTime) * 100;
    document.getElementById('progressBar').style.width = `${progress}%`;
  }

  updateStats() {
    const today = new Date().toDateString();
    const todayCount = this.sessions.filter(session => 
      session.completed && 
      session.completedAt && 
      session.completedAt.toDateString() === today
    ).length;

    const totalCompleted = this.sessions.filter(s => s.completed).length;

    document.getElementById('todaySessions').textContent = todayCount;
    document.getElementById('totalCompleted').textContent = totalCompleted;
    document.getElementById('activeSounds').textContent = this.activeSounds.size;
  }

  renderSessions() {
    const sessionsGrid = document.getElementById('sessionsGrid');
    sessionsGrid.innerHTML = '';

    this.sessions.forEach(session => {
      const sessionElement = document.createElement('label');
      sessionElement.className = `session-item ${session.completed ? 'completed' : ''}`;

      sessionElement.innerHTML = `
        <input type="checkbox" class="session-checkbox" ${session.completed ? 'checked' : ''}>
        <div class="session-info">
          <div class="session-name">${session.name}</div>
          ${session.completed && session.completedAt ? 
            `<div class="session-time">Completed at ${session.completedAt.toLocaleTimeString()}</div>` : 
            ''
          }
        </div>
      `;

      sessionElement.addEventListener('click', (e) => {
        if (e.target.type !== 'checkbox') {
          e.preventDefault();
          const checkbox = sessionElement.querySelector('.session-checkbox');
          checkbox.checked = !checkbox.checked;
        }
        this.toggleSession(session.id);
      });

      sessionsGrid.appendChild(sessionElement);
    });
  }

  // Utility Functions
  showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'success' ? '#22c55e' : type === 'error' ? '#ef4444' : '#3b82f6'};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 0.5rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 1000;
      animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }

  playCompletionSound() {
    // Create a simple completion sound using Web Audio API
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.2);

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (e) {
      console.warn('Could not play completion sound:', e);
    }
  }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new MindfulnessApp();
});

// Export for potential use in other scripts
window.MindfulnessApp = MindfulnessApp;

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

// Example: mindfulness activities
const activities = ["Deep Breathing", "ambient sounds", "session", "Gratitude Practice"];

// Pick random activity using the same function
let sum = addNumbers(5, 10);
    console.log(sum);


if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js")
    .then(reg => console.log("Service Worker registered:", reg))
    .catch(err => console.log("Service Worker failed:", err));
}

