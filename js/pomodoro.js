/**
 * StudyMatrix - Pomodoro Deep Work Hub & Web Audio Sound Synthesizer
 * Built-in focus timer linked to calendar courses, complete with pure browser Web Audio API
 * ambient generators (White Noise, Binaural Beats, Rain, Lab Ambience).
 */

class PomodoroManager {
  constructor() {
    this.focusDuration = 25 * 60; // default 25m
    this.shortBreakDuration = 5 * 60;
    this.longBreakDuration = 15 * 60;
    this.timeLeft = this.focusDuration;
    this.timerState = "idle"; // 'running', 'paused', 'idle'
    this.currentMode = "focus"; // 'focus', 'shortBreak', 'longBreak'
    this.activeCourseTitle = "Genel Çalışma & Problem Set";
    this.activeCourseId = null;
    this.completedSessionsCount = parseInt(localStorage.getItem("studymatrix_pomo_count") || "0", 10);
    this.timerInterval = null;

    // Web Audio Sound Engine
    this.audioCtx = null;
    this.activeSoundType = "none";
    this.soundNodes = [];
    this.gainNode = null;
  }

  init() {
    this.updateDisplay();
    this.setupEventListeners();
  }

  setMode(mode) {
    this.pause();
    this.currentMode = mode;

    if (mode === "focus") {
      this.timeLeft = this.focusDuration;
    } else if (mode === "shortBreak") {
      this.timeLeft = this.shortBreakDuration;
    } else if (mode === "longBreak") {
      this.timeLeft = this.longBreakDuration;
    }

    this.timerState = "idle";
    this.updateDisplay();

    document.querySelectorAll("[data-pomo-mode]").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.pomoMode === mode);
    });
  }

  setPresetDuration(focusMins, breakMins) {
    this.focusDuration = focusMins * 60;
    this.shortBreakDuration = breakMins * 60;
    this.setMode(this.currentMode);
  }

  start() {
    if (this.timerState === "running") return;

    this.timerState = "running";
    this.updateControls();

    if (this.activeSoundType !== "none") {
      this.playAmbientSound(this.activeSoundType);
    }

    this.timerInterval = setInterval(() => {
      this.timeLeft--;

      if (this.timeLeft <= 0) {
        this.onTimerComplete();
      }

      this.updateDisplay();
    }, 1000);
  }

  pause() {
    this.timerState = "paused";
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    this.stopAmbientSound();
    this.updateControls();
  }

  reset() {
    this.pause();
    this.setMode(this.currentMode);
    this.timerState = "idle";
    this.updateControls();
    this.updateDisplay();
  }

  onTimerComplete() {
    this.pause();
    this.playBeepAlert();

    if (this.currentMode === "focus") {
      this.completedSessionsCount++;
      localStorage.setItem("studymatrix_pomo_count", this.completedSessionsCount.toString());
      this.updateCompletedStats();

      // Show notification / message
      if (window.calendar && this.activeCourseId) {
        const todayStr = window.calendar.formatDateIso(new Date());
        window.calendar.toggleInstanceCompletion(this.activeCourseId, todayStr);
      }

      alert(`🎉 Tebrikler! "${this.activeCourseTitle}" odaklanma seansı tamamlandı. Şimdi hak ettiğin bir mola ver!`);
      this.setMode("shortBreak");
    } else {
      alert("☕ Mola bitti! Yeni bir odak seansına hazırsan başlayalım.");
      this.setMode("focus");
    }
  }

  setLinkedCourse(courseId, courseTitle) {
    this.activeCourseId = courseId;
    this.activeCourseTitle = courseTitle || "Seçili Kurs";
    const courseEl = document.getElementById("pomoActiveCourseName");
    if (courseEl) courseEl.textContent = this.activeCourseTitle;
  }

  updateDisplay() {
    const minutes = Math.floor(this.timeLeft / 60);
    const seconds = this.timeLeft % 60;
    const timeFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    const timerDisplayEl = document.getElementById("pomoTimerDisplay");
    if (timerDisplayEl) timerDisplayEl.textContent = timeFormatted;

    // Update document title if running
    if (this.timerState === "running") {
      document.title = `(${timeFormatted}) StudyMatrix | ${this.activeCourseTitle}`;
    } else {
      document.title = "StudyMatrix | Mühendislik & Kurs Planlama";
    }

    // Circular or Bar Progress calculation
    const totalCurrentDuration = this.currentMode === "focus" ? this.focusDuration : 
      (this.currentMode === "shortBreak" ? this.shortBreakDuration : this.longBreakDuration);
    const progressPercent = ((totalCurrentDuration - this.timeLeft) / totalCurrentDuration) * 100;

    const progressBarEl = document.getElementById("pomoProgressBar");
    if (progressBarEl) progressBarEl.style.width = `${progressPercent}%`;
  }

  updateControls() {
    const startBtn = document.getElementById("pomoStartBtn");
    const pauseBtn = document.getElementById("pomoPauseBtn");

    if (startBtn && pauseBtn) {
      if (this.timerState === "running") {
        startBtn.style.display = "none";
        pauseBtn.style.display = "inline-flex";
      } else {
        startBtn.style.display = "inline-flex";
        pauseBtn.style.display = "none";
      }
    }
  }

  updateCompletedStats() {
    const countEl = document.getElementById("pomoCompletedCount");
    if (countEl) countEl.textContent = this.completedSessionsCount;
  }

  // --- Pure Browser Web Audio API Sound Synthesizer ---
  initAudioContext() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContext();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  playAmbientSound(type) {
    this.stopAmbientSound();
    this.activeSoundType = type;

    if (type === "none") return;

    try {
      this.initAudioContext();
      this.gainNode = this.audioCtx.createGain();
      this.gainNode.gain.setValueAtTime(0.18, this.audioCtx.currentTime);
      this.gainNode.connect(this.audioCtx.destination);

      if (type === "white_noise" || type === "rain") {
        // Generate buffer noise
        const bufferSize = 2 * this.audioCtx.sampleRate;
        const noiseBuffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let lastOut = 0.0;

        for (let i = 0; i < bufferSize; i++) {
          if (type === "white_noise") {
            output[i] = Math.random() * 2 - 1;
          } else {
            // Pink noise / rain simulation
            const white = Math.random() * 2 - 1;
            output[i] = (lastOut + (0.02 * white)) / 1.02;
            lastOut = output[i];
            output[i] *= 3.5;
          }
        }

        const whiteNoise = this.audioCtx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        // Filter for comfortable ambient feeling
        const filter = this.audioCtx.createBiquadFilter();
        filter.type = type === "rain" ? "lowpass" : "bandpass";
        filter.frequency.value = type === "rain" ? 800 : 1200;

        whiteNoise.connect(filter);
        filter.connect(this.gainNode);
        whiteNoise.start();
        this.soundNodes.push(whiteNoise);

      } else if (type === "binaural_alpha") {
        // 200Hz in Left, 210Hz in Right -> 10Hz Alpha Brainwave State
        const merger = this.audioCtx.createChannelMerger(2);

        const oscL = this.audioCtx.createOscillator();
        oscL.type = "sine";
        oscL.frequency.value = 200;

        const oscR = this.audioCtx.createOscillator();
        oscR.type = "sine";
        oscR.frequency.value = 210;

        oscL.connect(merger, 0, 0);
        oscR.connect(merger, 0, 1);
        merger.connect(this.gainNode);

        oscL.start();
        oscR.start();
        this.soundNodes.push(oscL, oscR);

      } else if (type === "lab_hum") {
        // Quantum lab transformer hum (60Hz + 120Hz harmonic)
        const osc1 = this.audioCtx.createOscillator();
        osc1.type = "sine";
        osc1.frequency.value = 60;

        const osc2 = this.audioCtx.createOscillator();
        osc2.type = "sine";
        osc2.frequency.value = 120;

        osc1.connect(this.gainNode);
        osc2.connect(this.gainNode);

        osc1.start();
        osc2.start();
        this.soundNodes.push(osc1, osc2);
      }
    } catch (e) {
      console.warn("Web Audio generation error", e);
    }
  }

  stopAmbientSound() {
    this.soundNodes.forEach(node => {
      try {
        node.stop();
        node.disconnect();
      } catch (e) {}
    });
    this.soundNodes = [];
  }

  playBeepAlert() {
    try {
      this.initAudioContext();
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, this.audioCtx.currentTime); // D5
      osc.frequency.setValueAtTime(880, this.audioCtx.currentTime + 0.15); // A5

      gain.gain.setValueAtTime(0.3, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.6);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.6);
    } catch (e) {}
  }

  setupEventListeners() {
    const startBtn = document.getElementById("pomoStartBtn");
    const pauseBtn = document.getElementById("pomoPauseBtn");
    const resetBtn = document.getElementById("pomoResetBtn");

    if (startBtn) startBtn.addEventListener("click", () => this.start());
    if (pauseBtn) pauseBtn.addEventListener("click", () => this.pause());
    if (resetBtn) resetBtn.addEventListener("click", () => this.reset());

    // Mode Buttons
    document.querySelectorAll("[data-pomo-mode]").forEach(btn => {
      btn.addEventListener("click", () => {
        this.setMode(btn.dataset.pomoMode);
      });
    });

    // Preset Rhythm Buttons (25/5 vs 50/10)
    document.querySelectorAll("[data-pomo-preset]").forEach(btn => {
      btn.addEventListener("click", () => {
        const preset = btn.dataset.pomoPreset;
        document.querySelectorAll("[data-pomo-preset]").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        if (preset === "25-5") {
          this.setPresetDuration(25, 5);
        } else if (preset === "50-10") {
          this.setPresetDuration(50, 10);
        } else if (preset === "90-20") {
          this.setPresetDuration(90, 20);
        }
      });
    });

    // Sound Selector
    const soundSelect = document.getElementById("pomoSoundSelect");
    if (soundSelect) {
      soundSelect.addEventListener("change", (e) => {
        const soundType = e.target.value;
        this.activeSoundType = soundType;
        if (this.timerState === "running") {
          this.playAmbientSound(soundType);
        }
      });
    }

    this.updateCompletedStats();
  }
}

window.pomodoro = new PomodoroManager();
