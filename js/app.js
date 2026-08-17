/**
 * StudyMatrix - Core Application Orchestration & State Management
 * Handles tabs, themes (Dark, Light, Monochrome Siyah-Beyaz), font sizing,
 * profile creation & career selection (Doctor, EEE, CS/AI, Mechanical, etc.),
 * course catalog enrollment, modal management, and JSON backup.
 */

class AppManager {
  constructor() {
    this.activeTab = "calendar";
    this.profile = this.loadProfile();
    this.theme = localStorage.getItem("studymatrix_theme") || "dark";
    this.fontSize = localStorage.getItem("studymatrix_fontsize") || "standard";
    this.dailyMottoInput = localStorage.getItem("studymatrix_motto_custom") || "Bugün belirlediğim hedefe doğru disiplinle ilerleyeceğim.";
  }

  init() {
    this.applyTheme(this.theme);
    this.applyFontSize(this.fontSize);
    this.initProfileUI();
    this.renderCourseCatalog();
    this.updateDashboardStats();
    this.setupEventListeners();
  }

  // Profile & Career Management
  loadProfile() {
    try {
      const data = localStorage.getItem("studymatrix_profile");
      return data ? JSON.parse(data) : {
        name: "Mühendis Adayı",
        careerKey: "eee",
        careerTitle: "Elektrik-Elektronik Mühendisi",
        target: "MIT 6.002x & Devre Analizi",
        targetDailyHours: 6,
        avatar: "⚡"
      };
    } catch (e) {
      return { 
        name: "Mühendis Adayı", 
        careerKey: "eee", 
        careerTitle: "Elektrik-Elektronik", 
        target: "MIT 6.002x", 
        targetDailyHours: 6, 
        avatar: "⚡" 
      };
    }
  }

  saveProfile(newProfile) {
    this.profile = { ...this.profile, ...newProfile };
    localStorage.setItem("studymatrix_profile", JSON.stringify(this.profile));
    this.initProfileUI();
    this.renderCourseCatalog();
    if (window.calendar) {
      window.calendar.render();
    }
    this.updateDashboardStats();
  }

  setCareerTrack(careerKey, customCareerName = "") {
    let careerTitle = "";
    let avatar = "⚡";
    let target = "";

    if (CAREER_PROFILES[careerKey]) {
      const c = CAREER_PROFILES[careerKey];
      careerTitle = c.name;
      avatar = c.icon;
      target = c.tagline;
    } else {
      careerTitle = customCareerName || "Özel Kariyer Hedefi";
      avatar = "🎯";
      target = `${careerTitle} Yol Haritası & Matematik-İngilizce`;
    }

    const updated = {
      careerKey: careerKey,
      careerTitle: careerTitle,
      avatar: avatar,
      target: target
    };

    this.saveProfile(updated);

    // Prompt user to update schedule
    const shouldLoadSchedule = confirm(`"${careerTitle}" kariyer yol haritası seçildi! Bu alana özel ders programı takviminize otomatik yerleştirilsin mi?`);
    if (shouldLoadSchedule && window.calendar) {
      window.calendar.loadDemoSchedule(careerKey);
      alert(`✅ "${careerTitle}" ders programı ve hedefleri başarıyla yüklendi!`);
      this.switchTab("calendar");
    }
  }

  initProfileUI() {
    const profileNameEl = document.getElementById("profileNameDisplay");
    const profileTargetEl = document.getElementById("profileTargetDisplay");
    const profileAvatarEl = document.getElementById("profileAvatarDisplay");

    if (profileNameEl) profileNameEl.textContent = this.profile.name || "Öğrenci";
    if (profileTargetEl) profileTargetEl.textContent = this.profile.careerTitle || this.profile.target;
    if (profileAvatarEl) profileAvatarEl.textContent = this.profile.avatar || "⚡";

    // Update settings form fields
    const nameInput = document.getElementById("settingsProfileName");
    const careerSelect = document.getElementById("settingsCareerSelect");
    const targetInput = document.getElementById("settingsProfileTarget");
    const hoursInput = document.getElementById("settingsProfileHours");
    const avatarSelect = document.getElementById("settingsProfileAvatar");

    if (nameInput) nameInput.value = this.profile.name || "";
    if (careerSelect) careerSelect.value = this.profile.careerKey || "eee";
    if (targetInput) targetInput.value = this.profile.target || "";
    if (hoursInput) hoursInput.value = this.profile.targetDailyHours || 6;
    if (avatarSelect) avatarSelect.value = this.profile.avatar || "⚡";

    // Active career highlight in profile modal
    document.querySelectorAll("[data-career-card]").forEach(card => {
      card.classList.toggle("active", card.dataset.careerCard === this.profile.careerKey);
    });

    // Motto input
    const mottoInput = document.getElementById("dailyMottoInput");
    if (mottoInput) {
      mottoInput.value = this.dailyMottoInput;
    }
  }

  // Theme & Appearance
  applyTheme(themeName) {
    if (!["dark", "light", "monochrome"].includes(themeName)) {
      themeName = "dark";
    }

    this.theme = themeName;
    document.documentElement.setAttribute("data-theme", themeName);
    localStorage.setItem("studymatrix_theme", themeName);

    // Update all theme buttons
    document.querySelectorAll("[data-theme-select]").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.themeSelect === themeName);
    });

    const themeSelectDropdown = document.getElementById("settingsThemeSelect");
    if (themeSelectDropdown) themeSelectDropdown.value = themeName;
  }

  applyFontSize(sizeName) {
    if (!["small", "standard", "large", "xlarge"].includes(sizeName)) {
      sizeName = "standard";
    }

    this.fontSize = sizeName;
    document.documentElement.setAttribute("data-font-size", sizeName);
    localStorage.setItem("studymatrix_fontsize", sizeName);

    document.querySelectorAll("[data-fontsize-select]").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.fontsizeSelect === sizeName);
    });

    const fontSelectDropdown = document.getElementById("settingsFontSizeSelect");
    if (fontSelectDropdown) fontSelectDropdown.value = sizeName;
  }

  // Navigation Tabs
  switchTab(tabName) {
    this.activeTab = tabName;

    // Update Nav buttons
    document.querySelectorAll(".nav-link").forEach(link => {
      link.classList.toggle("active", link.dataset.tab === tabName);
    });

    // Update Tab Panes
    document.querySelectorAll(".tab-pane").forEach(pane => {
      pane.classList.toggle("active", pane.id === `tab-${tabName}`);
    });

    // Sub-triggers
    if (tabName === "calendar" && window.calendar) {
      window.calendar.render();
      window.calendar.setupEventListeners();
    }
    if (tabName === "catalog") {
      this.renderCourseCatalog();
    }
    if (tabName === "ai-copilot" && window.aiCopilot) {
      window.aiCopilot.renderChat();
    }

    this.updateDashboardStats();
  }

  // Curated Course Catalog Renderer with Career Recommendations
  renderCourseCatalog(filterCategory = "all") {
    const container = document.getElementById("coursesCatalogGrid");
    if (!container) return;

    const currentCareerKey = this.profile.careerKey || "eee";
    const recommendedIds = (CAREER_PROFILES[currentCareerKey] && CAREER_PROFILES[currentCareerKey].courseIds) || [];

    let coursesToRender = CURATED_COURSES;
    if (filterCategory === "recommended") {
      coursesToRender = CURATED_COURSES.filter(c => recommendedIds.includes(c.id));
    } else if (filterCategory !== "all") {
      coursesToRender = CURATED_COURSES.filter(c => c.category === filterCategory);
    }

    container.innerHTML = coursesToRender.map(course => {
      const isRecommended = recommendedIds.includes(course.id);

      return `
        <div class="course-card card-glass" style="border-top: 4px solid ${course.badgeColor};">
          <div class="course-card-header">
            <div class="course-code-pill" style="background: ${course.badgeColor}20; color: ${course.badgeColor};">
              ${course.code}
            </div>
            <div style="display:flex; gap:0.3rem;">
              ${isRecommended ? '<span class="postponed-badge" style="color:var(--accent-warning); font-weight:700; font-size:0.7rem;">⭐ Kariyerine Özel</span>' : ''}
              <span class="course-difficulty-badge">${course.difficulty}</span>
            </div>
          </div>
          <h3 class="course-card-title">${course.title}</h3>
          <p class="course-provider text-sm text-secondary">🏛️ ${course.provider}</p>
          <p class="course-desc text-sm">${course.description}</p>
          
          <div class="course-topics-list">
            ${course.topics.slice(0, 4).map(t => `<span class="topic-tag">${t}</span>`).join('')}
          </div>

          <div class="course-meta-row text-xs text-secondary">
            <span>⏱️ ${course.durationWeeks} Hafta (~${course.estimatedHoursPerWeek}s/hf)</span>
            <span>🏷️ ${course.cost}</span>
          </div>

          <div class="course-card-actions">
            <a href="${course.url}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">
              🔗 Kurs Sayfası
            </a>
            <button class="btn btn-primary btn-sm" onclick="window.openCourseEnrollModal('${course.id}')">
              📅 Programa Ekle
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  // Dashboard Stats
  updateDashboardStats() {
    if (!window.calendar) return;

    const today = new Date();
    const monday = window.calendar.getMonday(today);
    let totalWeeklyMinutes = 0;
    let completedCount = 0;

    for (let i = 0; i < 7; i++) {
      const day = window.calendar.addDays(monday, i);
      const evts = window.calendar.getEventsForDate(day);
      evts.forEach(e => {
        if (!e.cancelled) {
          totalWeeklyMinutes += e.durationMinutes || 0;
          if (e.isCompleted) completedCount++;
        }
      });
    }

    const weeklyHours = (totalWeeklyMinutes / 60).toFixed(1);
    const weeklyHoursEl = document.getElementById("statWeeklyHours");
    const completedCountEl = document.getElementById("statCompletedTasks");
    const activeStreakEl = document.getElementById("statStreakDays");

    if (weeklyHoursEl) weeklyHoursEl.textContent = `${weeklyHours} Saat`;
    if (completedCountEl) completedCountEl.textContent = `${completedCount} Seans`;
    if (activeStreakEl) activeStreakEl.textContent = `${Math.max(1, Math.min(14, completedCount + 2))} Gün 🔥`;
  }

  // Data Export / Import
  exportDataJSON() {
    const data = {
      profile: this.profile,
      events: window.calendar.events,
      theme: this.theme,
      fontSize: this.fontSize,
      pomodoroCount: window.pomodoro ? window.pomodoro.completedSessionsCount : 0,
      exportedAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `StudyMatrix_Backup_${window.calendar.formatDateIso(new Date())}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  importDataJSON(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.events && Array.isArray(data.events)) {
          window.calendar.events = data.events;
          window.calendar.saveEvents();
        }
        if (data.profile) {
          this.saveProfile(data.profile);
        }
        if (data.theme) {
          this.applyTheme(data.theme);
        }
        alert("✅ Veriler başarıyla içe aktarıldı ve program güncellendi!");
        window.location.reload();
      } catch (err) {
        alert("❌ Geçersiz JSON yedek dosyası!");
      }
    };
    reader.readAsText(file);
  }

  resetToDemo() {
    if (confirm("Tüm programınız sıfırlanıp mevcut kariyer hedefinize uygun demo program yüklensin mi?")) {
      window.calendar.loadDemoSchedule(this.profile.careerKey || "eee");
      alert("✅ Program başarıyla yüklendi!");
      this.switchTab("calendar");
    }
  }

  setupEventListeners() {
    // 1. Navigation Tab Switching (Sidebar buttons)
    document.querySelectorAll(".nav-link").forEach(link => {
      link.onclick = (e) => {
        e.preventDefault();
        const tab = link.dataset.tab;
        if (tab) this.switchTab(tab);
      };
    });

    // 2. Quick Theme Selector Buttons
    document.querySelectorAll("[data-theme-select]").forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault();
        this.applyTheme(btn.dataset.themeSelect);
      };
    });

    const themeDropdown = document.getElementById("settingsThemeSelect");
    if (themeDropdown) {
      themeDropdown.onchange = (e) => this.applyTheme(e.target.value);
    }

    // 3. Font Size Switchers
    document.querySelectorAll("[data-fontsize-select]").forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault();
        this.applyFontSize(btn.dataset.fontsizeSelect);
      };
    });

    const fontDropdown = document.getElementById("settingsFontSizeSelect");
    if (fontDropdown) {
      fontDropdown.onchange = (e) => this.applyFontSize(e.target.value);
    }

    // 4. Course Catalog Filter Buttons
    document.querySelectorAll("[data-course-filter]").forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault();
        document.querySelectorAll("[data-course-filter]").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.renderCourseCatalog(btn.dataset.courseFilter);
      };
    });

    // 5. Profile & Career Selection in Modal & Settings
    document.querySelectorAll("[data-career-card]").forEach(card => {
      card.onclick = () => {
        const careerKey = card.dataset.careerCard;
        this.setCareerTrack(careerKey);
        window.closeModal("profileModal");
      };
    });

    // Custom Career Target input submit
    const customCareerBtn = document.getElementById("customCareerSubmitBtn");
    const customCareerInput = document.getElementById("customCareerInput");
    if (customCareerBtn && customCareerInput) {
      customCareerBtn.onclick = () => {
        const customName = customCareerInput.value.trim();
        if (customName) {
          this.setCareerTrack("custom", customName);
          window.closeModal("profileModal");
          if (window.aiCopilot) {
            window.aiCopilot.handleUserPrompt(`Hedefim "${customName}" olmak. Bana buna uygun bir çalışma planı ve kurs önerisi hazırla.`);
          }
        }
      };
    }

    // Profile Form inside Settings Tab
    const profileForm = document.getElementById("settingsProfileForm");
    if (profileForm) {
      profileForm.onsubmit = (e) => {
        e.preventDefault();
        const careerKey = document.getElementById("settingsCareerSelect").value;
        const careerInfo = CAREER_PROFILES[careerKey] || { name: "Özel", icon: "⚡" };

        const updated = {
          name: document.getElementById("settingsProfileName").value,
          careerKey: careerKey,
          careerTitle: careerInfo.name,
          target: document.getElementById("settingsProfileTarget").value,
          targetDailyHours: parseFloat(document.getElementById("settingsProfileHours").value) || 6,
          avatar: document.getElementById("settingsProfileAvatar").value
        };
        this.saveProfile(updated);
        alert("✅ Profil ve kariyer ayarları başarıyla kaydedildi!");
      };
    }

    // Daily Motto save on change
    const mottoInput = document.getElementById("dailyMottoInput");
    if (mottoInput) {
      mottoInput.onblur = () => {
        this.dailyMottoInput = mottoInput.value;
        localStorage.setItem("studymatrix_motto_custom", this.dailyMottoInput);
      };
    }

    // Export & Import Buttons
    const exportBtn = document.getElementById("exportDataBtn");
    const importInput = document.getElementById("importDataInput");
    const resetDemoBtn = document.getElementById("resetDemoBtn");

    if (exportBtn) exportBtn.onclick = () => this.exportDataJSON();
    if (importInput) {
      importInput.onchange = (e) => {
        if (e.target.files && e.target.files[0]) {
          this.importDataJSON(e.target.files[0]);
        }
      };
    }
    if (resetDemoBtn) resetDemoBtn.onclick = () => this.resetToDemo();
  }
}

// Global Modal & Helper Functions
window.openModal = function(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add("show");
    document.body.classList.add("modal-open");
  }
};

window.closeModal = function(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("show");
    document.body.classList.remove("modal-open");
  }
};

window.openProfileModal = function() {
  window.openModal("profileModal");
};

// Open New Event Modal with pre-fills
window.openNewEventModal = function(prefill = null, targetDate = null) {
  const modal = document.getElementById("eventEditModal");
  if (!modal) return;

  const form = document.getElementById("eventEditForm");
  form.reset();

  const titleInput = document.getElementById("eventFormTitle");
  const codeInput = document.getElementById("eventFormCode");
  const typeInput = document.getElementById("eventFormType");
  const startTimeInput = document.getElementById("eventFormStart");
  const endTimeInput = document.getElementById("eventFormEnd");
  const weeksInput = document.getElementById("eventFormWeeks");
  const colorInput = document.getElementById("eventFormColor");
  const notesInput = document.getElementById("eventFormNotes");
  const linkInput = document.getElementById("eventFormLink");

  document.querySelectorAll(".day-checkbox").forEach(cb => cb.checked = false);

  if (prefill) {
    titleInput.value = prefill.title || "";
    codeInput.value = prefill.code || "";
    typeInput.value = prefill.type || "Ağır Teori";
    startTimeInput.value = prefill.startTime || "14:00";
    endTimeInput.value = prefill.endTime || "16:30";
    weeksInput.value = prefill.weeksTotal || 10;
    colorInput.value = prefill.color || "#0284c7";
    notesInput.value = prefill.notes || "";
    linkInput.value = prefill.link || "";

    if (prefill.daysOfWeek && Array.isArray(prefill.daysOfWeek)) {
      prefill.daysOfWeek.forEach(d => {
        const cb = document.querySelector(`.day-checkbox[value="${d}"]`);
        if (cb) cb.checked = true;
      });
    }
  } else if (targetDate) {
    const d = new Date(targetDate);
    const dayOfWeek = d.getDay();
    const cb = document.querySelector(`.day-checkbox[value="${dayOfWeek}"]`);
    if (cb) cb.checked = true;
    startTimeInput.value = "14:00";
    endTimeInput.value = "16:00";
  } else {
    [1, 3, 5].forEach(d => {
      const cb = document.querySelector(`.day-checkbox[value="${d}"]`);
      if (cb) cb.checked = true;
    });
    startTimeInput.value = "14:00";
    endTimeInput.value = "16:00";
  }

  window.openModal("eventEditModal");
};

// Course Catalog Enroll Modal
window.openCourseEnrollModal = function(courseId) {
  const course = CURATED_COURSES.find(c => c.id === courseId);
  if (!course) return;

  const dayMap = { "Monday": 1, "Tuesday": 2, "Wednesday": 3, "Thursday": 4, "Friday": 5, "Saturday": 6, "Sunday": 0, "Everyday": [0,1,2,3,4,5,6] };
  let selectedDays = [];

  if (Array.isArray(course.recommendedSchedule.days)) {
    course.recommendedSchedule.days.forEach(dayName => {
      if (dayMap[dayName] !== undefined) {
        if (Array.isArray(dayMap[dayName])) {
          selectedDays.push(...dayMap[dayName]);
        } else {
          selectedDays.push(dayMap[dayName]);
        }
      }
    });
  }

  window.openNewEventModal({
    title: course.title,
    code: course.code,
    type: course.recommendedSchedule.cognitiveLoad,
    startTime: course.recommendedSchedule.timeStart,
    endTime: course.recommendedSchedule.timeEnd,
    weeksTotal: course.durationWeeks,
    color: course.badgeColor,
    daysOfWeek: selectedDays,
    notes: `${course.provider} | Konular: ${course.topics.slice(0, 3).join(', ')}`,
    link: course.url
  });
};

window.enrollCourseQuick = function(courseId) {
  const course = CURATED_COURSES.find(c => c.id === courseId);
  if (!course) return;

  const dayMap = { "Monday": 1, "Tuesday": 2, "Wednesday": 3, "Thursday": 4, "Friday": 5, "Saturday": 6, "Sunday": 0, "Everyday": [0,1,2,3,4,5,6] };
  let selectedDays = [];

  if (Array.isArray(course.recommendedSchedule.days)) {
    course.recommendedSchedule.days.forEach(dayName => {
      if (dayMap[dayName] !== undefined) {
        if (Array.isArray(dayMap[dayName])) {
          selectedDays.push(...dayMap[dayName]);
        } else {
          selectedDays.push(dayMap[dayName]);
        }
      }
    });
  }

  window.calendar.addEvent({
    title: course.title,
    code: course.code,
    type: course.recommendedSchedule.cognitiveLoad,
    startTime: course.recommendedSchedule.timeStart,
    endTime: course.recommendedSchedule.timeEnd,
    weeksTotal: course.durationWeeks,
    color: course.badgeColor,
    daysOfWeek: selectedDays,
    notes: `${course.provider} | ${course.description}`,
    link: course.url
  });

  alert(`✅ "${course.code}" haftalık programınıza başarıyla eklendi!`);
  window.switchTab("calendar");
};

window.startPomodoroForEvent = function(eventId, eventTitle) {
  if (window.pomodoro) {
    window.pomodoro.setLinkedCourse(eventId, eventTitle);
    window.switchTab("pomodoro");
    window.pomodoro.start();
  }
};

window.openEventDetailModal = function(event, dateStr) {
  const modal = document.getElementById("eventDetailModal");
  if (!modal) return;

  document.getElementById("detailModalTitle").textContent = event.title;
  document.getElementById("detailModalCode").textContent = event.code ? `[${event.code}]` : '';
  document.getElementById("detailModalTime").textContent = `${event.startTime} - ${event.endTime} (${event.durationMinutes} dk)`;
  document.getElementById("detailModalType").textContent = event.type;
  document.getElementById("detailModalNotes").textContent = event.notes || 'Not eklenmemiş.';

  const linkEl = document.getElementById("detailModalLink");
  if (event.link) {
    linkEl.style.display = "inline-flex";
    linkEl.href = event.link;
  } else {
    linkEl.style.display = "none";
  }

  const completeBtn = document.getElementById("detailModalCompleteBtn");
  const postponeBtn = document.getElementById("detailModalPostponeBtn");
  const pomoBtn = document.getElementById("detailModalPomoBtn");
  const deleteBtn = document.getElementById("detailModalDeleteBtn");

  completeBtn.onclick = () => {
    window.calendar.toggleInstanceCompletion(event.id, dateStr);
    window.closeModal("eventDetailModal");
  };

  postponeBtn.onclick = () => {
    window.calendar.shiftEventTime(event.id, dateStr, 60);
    window.closeModal("eventDetailModal");
  };

  pomoBtn.onclick = () => {
    window.closeModal("eventDetailModal");
    window.startPomodoroForEvent(event.id, event.title);
  };

  deleteBtn.onclick = () => {
    if (confirm(`"${event.title}" programdan tamamen silinsin mi?`)) {
      window.calendar.deleteEvent(event.id);
      window.closeModal("eventDetailModal");
    }
  };

  window.openModal("eventDetailModal");
};

window.switchTab = function(tabName) {
  if (window.app) window.app.switchTab(tabName);
};

// Safe bootstrap on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  try {
    window.app = new AppManager();
    if (window.weatherAndQuotes) window.weatherAndQuotes.init();
    if (window.calendar) window.calendar.init();
    if (window.aiCopilot) window.aiCopilot.init();
    if (window.pomodoro) window.pomodoro.init();
    window.app.init();

    // New event form submission
    const form = document.getElementById("eventEditForm");
    if (form) {
      form.onsubmit = (e) => {
        e.preventDefault();

        const selectedDays = [];
        document.querySelectorAll(".day-checkbox:checked").forEach(cb => {
          selectedDays.push(parseInt(cb.value, 10));
        });

        if (selectedDays.length === 0) {
          alert("Lütfen dersin haftanın hangi günlerinde olacağını en az 1 gün seçin!");
          return;
        }

        const eventData = {
          title: document.getElementById("eventFormTitle").value,
          code: document.getElementById("eventFormCode").value,
          type: document.getElementById("eventFormType").value,
          startTime: document.getElementById("eventFormStart").value,
          endTime: document.getElementById("eventFormEnd").value,
          weeksTotal: document.getElementById("eventFormWeeks").value,
          color: document.getElementById("eventFormColor").value,
          notes: document.getElementById("eventFormNotes").value,
          link: document.getElementById("eventFormLink").value,
          daysOfWeek: selectedDays
        };

        window.calendar.addEvent(eventData);
        window.closeModal("eventEditModal");
        alert("✅ Yeni ders başarıyla programa yerleştirildi!");
      };
    }
  } catch (err) {
    console.error("Initialization error:", err);
  }
});
