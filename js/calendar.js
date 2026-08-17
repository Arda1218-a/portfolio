/**
 * StudyMatrix - Google Calendar Style Intelligent Timetable Engine
 * Handles recurring multi-week study sessions, color-coding, conflict detection,
 * postponement/rescheduling, session completion, and multi-view rendering.
 */

class CalendarManager {
  constructor() {
    this.eventsKey = "studymatrix_events_v1";
    this.events = this.loadEvents();
    this.currentView = "week"; // 'week', 'day', 'agenda'
    this.currentDate = new Date();
    this.dayNamesTr = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
    this.dayNamesShortTr = ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"];
    this.monthNamesTr = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
    this.startHour = 6;
    this.endHour = 24;
  }

  init() {
    if (!this.events || this.events.length === 0) {
      this.loadDemoSchedule();
    }
    this.render();
    this.setupEventListeners();
  }

  loadEvents() {
    try {
      const data = localStorage.getItem(this.eventsKey);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("Failed to load events from storage", e);
      return [];
    }
  }

  saveEvents() {
    try {
      localStorage.setItem(this.eventsKey, JSON.stringify(this.events));
      this.render();
      if (window.app && window.app.updateDashboardStats) {
        window.app.updateDashboardStats();
      }
    } catch (e) {
      console.error("Failed to save events", e);
    }
  }

  loadDemoSchedule(careerId = "eee") {
    const today = new Date();
    const mondayOffset = (today.getDay() + 6) % 7;
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - mondayOffset);
    const startDateStr = this.formatDateIso(startOfWeek);

    if (careerId === "medicine") {
      this.events = [
        {
          id: "med-1",
          title: "Stanford Med: Anatomy & Cardiovascular Systems",
          code: "ANAT-101",
          type: "Tıp Teorisi & Anatomi",
          color: "#ef4444",
          daysOfWeek: [1, 3, 5], // Pzt, Çar, Cum
          startTime: "14:00",
          endTime: "16:30",
          durationMinutes: 150,
          startDate: startDateStr,
          weeksTotal: 8,
          notes: "Kardiyovasküler sistem anatomisi, kalp kapakçıkları ve hemodinamik.",
          link: "https://www.coursera.org/learn/anatomy",
          completedInstances: []
        },
        {
          id: "med-2",
          title: "HarvardX: Principles of Biochemistry & Metabolism",
          code: "BIOCHEM",
          type: "Tıp & Biyokimya",
          color: "#dc2626",
          daysOfWeek: [2, 4], // Sal, Per
          startTime: "15:00",
          endTime: "17:30",
          durationMinutes: 150,
          startDate: startDateStr,
          weeksTotal: 10,
          notes: "Enzim kinetiği, hücresel solunum ve Krebs döngüsü.",
          link: "https://www.edx.org/learn/biochemistry/harvard-university-principles-of-biochemistry",
          completedInstances: []
        },
        {
          id: "med-3",
          title: "MIT 18.01x: Calculus & Biyofiziksel Dozaj",
          code: "18.01x",
          type: "Matematik & Problem Set",
          color: "#10b981",
          daysOfWeek: [2, 6], // Sal, Cmt
          startTime: "10:00",
          endTime: "12:00",
          durationMinutes: 120,
          startDate: startDateStr,
          weeksTotal: 12,
          notes: "Farmakokinetik ilaç konsantrasyonu türev hesapları ve diferansiyel modelleme.",
          link: "https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/",
          completedInstances: []
        },
        {
          id: "med-4",
          title: "UPenn: English for Healthcare & Medical Terms",
          code: "MED-ENG",
          type: "Tıbbi İngilizce",
          color: "#06b6d4",
          daysOfWeek: [1, 3, 5],
          startTime: "08:30",
          endTime: "09:15",
          durationMinutes: 45,
          startDate: startDateStr,
          weeksTotal: 6,
          notes: "Anamnez (hasta öyküsü) alma, klinik terminoloji ve medikal yayın okuma.",
          link: "https://www.coursera.org/learn/medical-english",
          completedInstances: []
        }
      ];
    } else if (careerId === "cs_ai") {
      this.events = [
        {
          id: "cs-1",
          title: "Harvard CS50x: Introduction to Computer Science",
          code: "CS50x",
          type: "Yazılım & Problem Çözümü",
          color: "#e11d48",
          daysOfWeek: [1, 3, 5],
          startTime: "14:00",
          endTime: "16:30",
          durationMinutes: 150,
          startDate: startDateStr,
          weeksTotal: 11,
          notes: "Bellek yönetimi, işaretçiler (pointers) ve veri yapıları.",
          link: "https://cs50.harvard.edu/x/",
          completedInstances: []
        },
        {
          id: "cs-2",
          title: "Stanford Online: Machine Learning Specialization",
          code: "STANFORD-ML",
          type: "Yapay Zeka & ML",
          color: "#6366f1",
          daysOfWeek: [2, 4, 6],
          startTime: "15:00",
          endTime: "17:00",
          durationMinutes: 120,
          startDate: startDateStr,
          weeksTotal: 9,
          notes: "Derin Sinir Ağları ve Geri Yayılım (Backpropagation) algoritması.",
          link: "https://www.coursera.org/specializations/machine-learning-introduction",
          completedInstances: []
        },
        {
          id: "cs-3",
          title: "Stanford / DeepLearning: Linear Algebra for ML",
          code: "LIN-ALG",
          type: "Matematik & Lineer Cebir",
          color: "#14b8a6",
          daysOfWeek: [0], // Pazar
          startTime: "10:00",
          endTime: "13:00",
          durationMinutes: 180,
          startDate: startDateStr,
          weeksTotal: 6,
          notes: "Özvektörler, matris çarpımları ve SVD ayrışımı.",
          link: "https://www.coursera.org/learn/linear-algebra-machine-learning",
          completedInstances: []
        },
        {
          id: "cs-4",
          title: "STEM Technical English & BBC 6-Min",
          code: "ENG-TECH",
          type: "Teknik İngilizce & Dinleme",
          color: "#06b6d4",
          daysOfWeek: [1, 2, 3, 4, 5],
          startTime: "08:30",
          endTime: "09:15",
          durationMinutes: 45,
          startDate: startDateStr,
          weeksTotal: 8,
          notes: "GitHub reposu dokümantasyonu ve teknik makale okuma.",
          link: "https://www.coursera.org/learn/stem",
          completedInstances: []
        }
      ];
    } else {
      // Default: Elektrik-Elektronik Mühendisliği (MIT 6.002x)
      this.events = [
        {
          id: "demo-1",
          title: "MIT 6.002x: Circuits & Electronics",
          code: "6.002x",
          type: "Ağır Teori & Devre Analizi",
          color: "#0284c7",
          daysOfWeek: [1, 3, 5], // Pzt, Çar, Cum
          startTime: "14:00",
          endTime: "16:30",
          durationMinutes: 150,
          startDate: startDateStr,
          weeksTotal: 10,
          notes: "Kirchhoff Kanunları (KVL/KCL), Nodal Analiz ve Thevenin Eşdeğeri.",
          link: "https://www.edx.org/learn/circuits/massachusetts-institute-of-technology-circuits-and-electronics-1-basic-circuit-analysis",
          completedInstances: []
        },
        {
          id: "demo-2",
          title: "MIT 18.01x: Single Variable Calculus",
          code: "18.01x",
          type: "Matematik & Problem Set",
          color: "#10b981",
          daysOfWeek: [2, 4, 6], // Sal, Per, Cmt
          startTime: "10:00",
          endTime: "12:00",
          durationMinutes: 120,
          startDate: startDateStr,
          weeksTotal: 12,
          notes: "Türev kuralları, Zincir Kuralı ve Devre Diferansiyel Denklemleri Altyapısı.",
          link: "https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/",
          completedInstances: []
        },
        {
          id: "demo-3",
          title: "STEM Technical English & BBC 6-Min",
          code: "ENG-TECH",
          type: "İngilizce & Dinleme",
          color: "#06b6d4",
          daysOfWeek: [1, 2, 3, 4, 5], // Hafta içi her gün
          startTime: "08:30",
          endTime: "09:15",
          durationMinutes: 45,
          startDate: startDateStr,
          weeksTotal: 8,
          notes: "Mühendislik terimleri, IEEE makale okuma egzersizleri ve telaffuz.",
          link: "https://www.coursera.org/learn/stem",
          completedInstances: []
        },
        {
          id: "demo-4",
          title: "MIT 6.002x Lab: Falstad Circuit Simülasyonu",
          code: "6.002x Lab",
          type: "Laboratuvar & Simülasyon",
          color: "#8b5cf6",
          daysOfWeek: [6], // Cumartesi
          startTime: "15:00",
          endTime: "17:30",
          durationMinutes: 150,
          startDate: startDateStr,
          weeksTotal: 10,
          notes: "RC devresi basamak yanıtı (step response) zaman sabiti τ=RC ölçümü.",
          link: "https://www.falstad.com/circuit/",
          completedInstances: []
        }
      ];
    }

    this.saveEvents();
  }

  // Date Utilities
  formatDateIso(d) {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  getMonday(d) {
    const date = new Date(d);
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    date.setHours(0, 0, 0, 0);
    return new Date(date.setDate(diff));
  }

  addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  timeToMinutes(timeStr) {
    if (!timeStr) return 0;
    const [h, m] = timeStr.split(':').map(Number);
    return (h * 60) + (m || 0);
  }

  minutesToTime(mins) {
    const h = Math.floor(mins / 60) % 24;
    const m = mins % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  }

  getEventsForDate(targetDate) {
    const dateStr = this.formatDateIso(targetDate);
    const dayOfWeek = targetDate.getDay();

    const dailyOccurrences = [];

    (this.events || []).forEach(event => {
      const eventStart = new Date(event.startDate || "2026-01-01");
      eventStart.setHours(0, 0, 0, 0);
      
      const targetTime = new Date(targetDate);
      targetTime.setHours(0, 0, 0, 0);

      if (targetTime < eventStart) return;

      const weeksLimit = event.weeksTotal || 52;
      const diffTime = targetTime.getTime() - eventStart.getTime();
      const diffWeeks = diffTime / (1000 * 3600 * 24 * 7);

      if (diffWeeks > weeksLimit) return;

      const matchesDay = Array.isArray(event.daysOfWeek) && event.daysOfWeek.includes(dayOfWeek);
      const isSpecificDate = event.specificDate === dateStr;

      if (matchesDay || isSpecificDate) {
        const instanceId = `${event.id}_${dateStr}`;
        const isCompleted = Array.isArray(event.completedInstances) && event.completedInstances.includes(dateStr);
        
        const override = event.overrides && event.overrides[dateStr];
        const startTime = override ? override.startTime : event.startTime;
        const endTime = override ? override.endTime : event.endTime;

        dailyOccurrences.push({
          ...event,
          instanceId,
          occurrenceDate: dateStr,
          isCompleted,
          startTime,
          endTime,
          isOverridden: !!override
        });
      }
    });

    dailyOccurrences.sort((a, b) => this.timeToMinutes(a.startTime) - this.timeToMinutes(b.startTime));
    return dailyOccurrences;
  }

  addEvent(eventData) {
    const newId = "evt_" + Date.now() + "_" + Math.random().toString(36).substr(2, 5);
    const startMins = this.timeToMinutes(eventData.startTime);
    const endMins = this.timeToMinutes(eventData.endTime);
    const durationMinutes = endMins > startMins ? endMins - startMins : 60;

    const newEvent = {
      id: newId,
      title: eventData.title || "Yeni Çalışma Seansı",
      code: eventData.code || "",
      type: eventData.type || "Ders Çalışma",
      color: eventData.color || "#0284c7",
      daysOfWeek: eventData.daysOfWeek || [1],
      startTime: eventData.startTime || "14:00",
      endTime: eventData.endTime || "16:00",
      durationMinutes,
      startDate: eventData.startDate || this.formatDateIso(new Date()),
      weeksTotal: parseInt(eventData.weeksTotal, 10) || 12,
      notes: eventData.notes || "",
      link: eventData.link || "",
      completedInstances: [],
      overrides: {}
    };

    this.events.push(newEvent);
    this.saveEvents();
    return newEvent;
  }

  updateEvent(eventId, updatedData) {
    const idx = this.events.findIndex(e => e.id === eventId);
    if (idx !== -1) {
      this.events[idx] = { ...this.events[idx], ...updatedData };
      this.saveEvents();
    }
  }

  deleteEvent(eventId) {
    this.events = this.events.filter(e => e.id !== eventId);
    this.saveEvents();
  }

  toggleInstanceCompletion(eventId, dateStr) {
    const event = this.events.find(e => e.id === eventId);
    if (!event) return;

    if (!Array.isArray(event.completedInstances)) {
      event.completedInstances = [];
    }

    const index = event.completedInstances.indexOf(dateStr);
    if (index === -1) {
      event.completedInstances.push(dateStr);
    } else {
      event.completedInstances.splice(index, 1);
    }

    this.saveEvents();
  }

  postponeTodayEvents(shiftMinutes = 60) {
    const todayStr = this.formatDateIso(this.currentDate);
    let updatedCount = 0;

    this.events.forEach(event => {
      const occurrences = this.getEventsForDate(this.currentDate);
      const isToday = occurrences.some(occ => occ.id === event.id);

      if (isToday) {
        if (!event.overrides) event.overrides = {};
        
        const currentStart = event.overrides[todayStr] ? event.overrides[todayStr].startTime : event.startTime;
        const currentEnd = event.overrides[todayStr] ? event.overrides[todayStr].endTime : event.endTime;

        const newStartMins = Math.min(23 * 60 + 30, this.timeToMinutes(currentStart) + shiftMinutes);
        const duration = this.timeToMinutes(currentEnd) - this.timeToMinutes(currentStart);
        const newEndMins = Math.min(23 * 60 + 59, newStartMins + duration);

        event.overrides[todayStr] = {
          startTime: this.minutesToTime(newStartMins),
          endTime: this.minutesToTime(newEndMins),
          postponedMinutes: shiftMinutes
        };
        updatedCount++;
      }
    });

    if (updatedCount > 0) {
      this.saveEvents();
    }
    return updatedCount;
  }

  shiftEventTime(eventId, dateStr, shiftMinutes) {
    const event = this.events.find(e => e.id === eventId);
    if (!event) return false;

    if (!event.overrides) event.overrides = {};
    const currentStart = event.overrides[dateStr] ? event.overrides[dateStr].startTime : event.startTime;
    const currentEnd = event.overrides[dateStr] ? event.overrides[dateStr].endTime : event.endTime;

    const newStartMins = Math.min(23 * 60 + 30, Math.max(6 * 60, this.timeToMinutes(currentStart) + shiftMinutes));
    const duration = this.timeToMinutes(currentEnd) - this.timeToMinutes(currentStart);
    const newEndMins = Math.min(23 * 60 + 59, newStartMins + duration);

    event.overrides[dateStr] = {
      startTime: this.minutesToTime(newStartMins),
      endTime: this.minutesToTime(newEndMins),
      shifted: shiftMinutes
    };

    this.saveEvents();
    return true;
  }

  moveEventToTomorrow(eventId, fromDateStr) {
    const event = this.events.find(e => e.id === eventId);
    if (!event) return false;

    const fromDate = new Date(fromDateStr);
    const toDate = this.addDays(fromDate, 1);
    const toDateStr = this.formatDateIso(toDate);

    const movedEvent = {
      id: "moved_" + Date.now(),
      title: `[Ertelenen] ${event.title}`,
      code: event.code,
      type: event.type,
      color: event.color,
      daysOfWeek: [],
      specificDate: toDateStr,
      startTime: event.startTime,
      endTime: event.endTime,
      durationMinutes: event.durationMinutes,
      startDate: toDateStr,
      weeksTotal: 1,
      notes: `Aslında ${fromDateStr} tarihinde planlanmıştı. Yarın için ertelendi.\n${event.notes || ''}`,
      link: event.link,
      completedInstances: []
    };

    if (!event.overrides) event.overrides = {};
    event.overrides[fromDateStr] = { cancelled: true, startTime: "00:00", endTime: "00:00" };

    this.events.push(movedEvent);
    this.saveEvents();
    return true;
  }

  prevPeriod() {
    if (this.currentView === "week") {
      this.currentDate = this.addDays(this.currentDate, -7);
    } else {
      this.currentDate = this.addDays(this.currentDate, -1);
    }
    this.render();
  }

  nextPeriod() {
    if (this.currentView === "week") {
      this.currentDate = this.addDays(this.currentDate, 7);
    } else {
      this.currentDate = this.addDays(this.currentDate, 1);
    }
    this.render();
  }

  goToToday() {
    this.currentDate = new Date();
    this.render();
  }

  setView(viewName) {
    if (["week", "day", "agenda"].includes(viewName)) {
      this.currentView = viewName;
      document.querySelectorAll("[data-calendar-view]").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.calendarView === viewName);
      });
      this.render();
    }
  }

  detectConflicts(dateStr) {
    const targetDate = new Date(dateStr);
    const eventsOnDay = this.getEventsForDate(targetDate).filter(e => !e.isOverridden || !e.cancelled);
    const conflicts = [];

    for (let i = 0; i < eventsOnDay.length; i++) {
      for (let j = i + 1; j < eventsOnDay.length; j++) {
        const a = eventsOnDay[i];
        const b = eventsOnDay[j];

        const aStart = this.timeToMinutes(a.startTime);
        const aEnd = this.timeToMinutes(a.endTime);
        const bStart = this.timeToMinutes(b.startTime);
        const bEnd = this.timeToMinutes(b.endTime);

        if (Math.max(aStart, bStart) < Math.min(aEnd, bEnd)) {
          conflicts.push({ a, b, dateStr });
        }
      }
    }
    return conflicts;
  }

  render() {
    this.updateHeaderDates();

    const calendarContainer = document.getElementById("calendarGridContainer");
    if (!calendarContainer) return;

    if (this.currentView === "week") {
      this.renderWeekView(calendarContainer);
    } else if (this.currentView === "day") {
      this.renderDayView(calendarContainer);
    } else if (this.currentView === "agenda") {
      this.renderAgendaView(calendarContainer);
    }

    this.checkAndRenderConflictWarnings();
  }

  updateHeaderDates() {
    const titleEl = document.getElementById("calendarPeriodTitle");
    if (!titleEl) return;

    if (this.currentView === "week") {
      const monday = this.getMonday(this.currentDate);
      const sunday = this.addDays(monday, 6);
      
      const monMonth = this.monthNamesTr[monday.getMonth()];
      const sunMonth = this.monthNamesTr[sunday.getMonth()];
      
      if (monMonth === sunMonth) {
        titleEl.textContent = `${monday.getDate()} - ${sunday.getDate()} ${monMonth} ${monday.getFullYear()}`;
      } else {
        titleEl.textContent = `${monday.getDate()} ${monMonth} - ${sunday.getDate()} ${sunMonth} ${sunday.getFullYear()}`;
      }
    } else if (this.currentView === "day") {
      const dayName = this.dayNamesTr[this.currentDate.getDay()];
      const month = this.monthNamesTr[this.currentDate.getMonth()];
      titleEl.textContent = `${this.currentDate.getDate()} ${month} ${this.currentDate.getFullYear()}, ${dayName}`;
    } else {
      titleEl.textContent = `Tüm Çalışma Ajandası (${(this.events || []).length} Aktif Kurs)`;
    }
  }

  renderWeekView(container) {
    const monday = this.getMonday(this.currentDate);
    const todayStr = this.formatDateIso(new Date());

    let html = `
      <div class="calendar-week-grid">
        <div class="time-column-header">
          <span class="text-xs text-secondary">GMT+3</span>
        </div>
    `;

    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const dayDate = this.addDays(monday, i);
      const dateStr = this.formatDateIso(dayDate);
      const isToday = dateStr === todayStr;
      const dayOfWeekIdx = dayDate.getDay();
      
      weekDays.push({ date: dayDate, dateStr, isToday, dayOfWeekIdx });

      html += `
        <div class="day-column-header ${isToday ? 'current-today-header' : ''}">
          <div class="day-header-name">${this.dayNamesShortTr[dayOfWeekIdx]}</div>
          <div class="day-header-num ${isToday ? 'today-pill' : ''}">${dayDate.getDate()}</div>
        </div>
      `;
    }

    html += `</div><div class="calendar-time-body">`;

    html += `<div class="time-labels-col">`;
    for (let h = this.startHour; h <= this.endHour; h++) {
      const hourStr = `${String(h).padStart(2, '0')}:00`;
      html += `
        <div class="time-slot-label">
          <span>${hourStr}</span>
        </div>
      `;
    }
    html += `</div>`;

    html += `<div class="week-days-columns">`;
    weekDays.forEach((d) => {
      const dailyEvents = this.getEventsForDate(d.date).filter(e => !(e.overrides && e.overrides[d.dateStr] && e.overrides[d.dateStr].cancelled));

      html += `
        <div class="week-day-col ${d.isToday ? 'is-today-col' : ''}" data-date="${d.dateStr}">
      `;

      for (let h = this.startHour; h <= this.endHour; h++) {
        html += `<div class="grid-hour-cell" data-hour="${h}"></div>`;
      }

      dailyEvents.forEach(evt => {
        const startMins = this.timeToMinutes(evt.startTime);
        const endMins = this.timeToMinutes(evt.endTime);
        const topPx = ((startMins - (this.startHour * 60)) / 60) * 64;
        const heightPx = Math.max(34, ((endMins - startMins) / 60) * 64 - 3);

        const cardStyle = `top: ${topPx}px; height: ${heightPx}px; --event-color: ${evt.color}; border-left-color: ${evt.color};`;
        const completedClass = evt.isCompleted ? 'is-completed' : '';
        const overriddenClass = evt.isOverridden ? 'is-postponed' : '';

        html += `
          <div class="calendar-event-card ${completedClass} ${overriddenClass}" style="${cardStyle}" data-event-id="${evt.id}" data-date="${d.dateStr}">
            <div class="event-card-top">
              <span class="event-time-badge">${evt.startTime} - ${evt.endTime}</span>
              <button class="event-check-btn" title="Tamamlandı olarak işaretle" onclick="window.calendar.toggleInstanceCompletion('${evt.id}', '${d.dateStr}'); event.stopPropagation();">
                ${evt.isCompleted ? '✓' : '○'}
              </button>
            </div>
            <div class="event-title" title="${evt.title}">
              <strong>${evt.code ? `[${evt.code}] ` : ''}</strong>${evt.title}
            </div>
            <div class="event-meta">
              <span class="event-badge">${evt.type}</span>
              ${evt.isOverridden ? '<span class="postponed-badge" title="Ertelendi">🕒 Ertelendi</span>' : ''}
            </div>
            <div class="event-actions-hover">
              <button class="action-mini-btn" title="1 Saat Ertele" onclick="window.calendar.shiftEventTime('${evt.id}', '${d.dateStr}', 60); event.stopPropagation();">+1h</button>
              <button class="action-mini-btn" title="Yarına Kaydır" onclick="window.calendar.moveEventToTomorrow('${evt.id}', '${d.dateStr}'); event.stopPropagation();">➡️ Yarın</button>
              <button class="action-mini-btn" title="Pomodoro ile Başla" onclick="window.startPomodoroForEvent('${evt.id}', '${evt.title}'); event.stopPropagation();">🍅</button>
            </div>
          </div>
        `;
      });

      html += `</div>`;
    });

    html += `</div></div>`;
    container.innerHTML = html;
    this.attachCardClickHandlers();
  }

  renderDayView(container) {
    const dateStr = this.formatDateIso(this.currentDate);
    const dayEvents = this.getEventsForDate(this.currentDate).filter(e => !(e.overrides && e.overrides[dateStr] && e.overrides[dateStr].cancelled));

    let html = `
      <div class="day-focus-container">
        <div class="day-focus-header card-glass">
          <div>
            <h3>${this.dayNamesTr[this.currentDate.getDay()]}, ${this.currentDate.getDate()} ${this.monthNamesTr[this.currentDate.getMonth()]}</h3>
            <p class="text-sm text-secondary">${dayEvents.length} Çalışma Seansı Planlandı</p>
          </div>
          <div class="day-quick-actions">
            <button class="btn btn-secondary btn-sm" onclick="window.calendar.postponeTodayEvents(60)">
              🕒 Tüm Dersleri 1 Saat Ertele
            </button>
            <button class="btn btn-primary btn-sm" onclick="window.openNewEventModal(null, '${dateStr}')">
              + Yeni Seans Ekle
            </button>
          </div>
        </div>

        <div class="day-timeline-list">
    `;

    if (dayEvents.length === 0) {
      html += `
        <div class="empty-state card-glass">
          <div class="empty-icon">☕</div>
          <h4>Bugün için planlanmış ders bulunmuyor</h4>
          <p class="text-secondary text-sm">Dinlenme günü yapabilir veya yeni bir çalışma seansı ekleyebilirsiniz.</p>
          <button class="btn btn-primary" onclick="window.openNewEventModal(null, '${dateStr}')">+ Ders Ekle</button>
        </div>
      `;
    } else {
      dayEvents.forEach(evt => {
        html += `
          <div class="day-session-card card-glass ${evt.isCompleted ? 'is-completed' : ''}" style="border-left: 5px solid ${evt.color};">
            <div class="session-time-col">
              <span class="session-start">${evt.startTime}</span>
              <span class="session-duration">${evt.durationMinutes} dk</span>
              <span class="session-end">${evt.endTime}</span>
            </div>
            <div class="session-content-col">
              <div class="session-header-row">
                <span class="session-tag" style="background: ${evt.color}22; color: ${evt.color};">${evt.type}</span>
                <span class="session-code">${evt.code || ''}</span>
              </div>
              <h4 class="session-title">${evt.title}</h4>
              <p class="session-notes text-sm text-secondary">${evt.notes || 'Detaylı çalışma notu eklenmedi.'}</p>
              ${evt.link ? `<a href="${evt.link}" target="_blank" rel="noopener noreferrer" class="session-link-btn">🔗 Kurs / Not Bağlantısı</a>` : ''}
            </div>
            <div class="session-actions-col">
              <button class="btn btn-sm ${evt.isCompleted ? 'btn-success' : 'btn-secondary'}" onclick="window.calendar.toggleInstanceCompletion('${evt.id}', '${dateStr}')">
                ${evt.isCompleted ? '✓ Tamamlandı' : 'Tamamla'}
              </button>
              <button class="btn btn-sm btn-accent" onclick="window.startPomodoroForEvent('${evt.id}', '${evt.title}')">
                🍅 Pomodoro Odak
              </button>
              <div class="session-postpone-dropdown">
                <button class="btn btn-sm btn-ghost" onclick="window.calendar.shiftEventTime('${evt.id}', '${dateStr}', 60)">+1 Saat Ertele</button>
                <button class="btn btn-sm btn-ghost" onclick="window.calendar.moveEventToTomorrow('${evt.id}', '${dateStr}')">Yarına Kaydır</button>
              </div>
            </div>
          </div>
        `;
      });
    }

    html += `</div></div>`;
    container.innerHTML = html;
  }

  renderAgendaView(container) {
    let html = `
      <div class="agenda-view-container card-glass" style="padding:1.5rem;">
        <div class="agenda-header" style="margin-bottom:1.25rem;">
          <h3>Aktif Kurslar ve Tekrarlı Programlar</h3>
          <p class="text-sm text-secondary">Tüm kayıtlı haftalık seanslarınız ve toplam çalışma yükünüz.</p>
        </div>
        <div class="courses-grid">
    `;

    if (!this.events || this.events.length === 0) {
      html += `<div class="empty-state"><p>Henüz kayıtlı ders bulunamadı.</p></div>`;
    } else {
      this.events.forEach(evt => {
        const daysLabels = (evt.daysOfWeek || []).map(d => this.dayNamesShortTr[d]).join(', ') || 'Özel Gün';

        html += `
          <div class="course-card card-glass" style="border-top: 4px solid ${evt.color};">
            <div class="course-card-header">
              <span class="course-code-pill" style="background:${evt.color}20; color:${evt.color};">${evt.code || 'KURS'}</span>
              <span class="course-difficulty-badge">${evt.weeksTotal} Hafta</span>
            </div>
            <h4 class="course-card-title">${evt.title}</h4>
            <div class="text-sm" style="display:flex; flex-direction:column; gap:0.35rem;">
              <div><strong>📅 Günler:</strong> <span>${daysLabels}</span></div>
              <div><strong>🕒 Saat:</strong> <span>${evt.startTime} - ${evt.endTime} (${evt.durationMinutes} dk)</span></div>
              <div><strong>🏷️ Tür:</strong> <span>${evt.type}</span></div>
              <div><strong>📝 Not:</strong> <span>${evt.notes || '-'}</span></div>
            </div>
            <div class="course-card-actions" style="margin-top:auto; padding-top:0.75rem;">
              ${evt.link ? `<a href="${evt.link}" target="_blank" class="btn btn-xs btn-secondary">🔗 Kursa Git</a>` : ''}
              <button class="btn btn-xs btn-danger" onclick="window.calendar.deleteEvent('${evt.id}')">Sil</button>
            </div>
          </div>
        `;
      });
    }

    html += `</div></div>`;
    container.innerHTML = html;
  }

  attachCardClickHandlers() {
    document.querySelectorAll(".calendar-event-card").forEach(card => {
      card.addEventListener("click", () => {
        const eventId = card.dataset.eventId;
        const dateStr = card.dataset.date;
        const event = (this.events || []).find(e => e.id === eventId);
        if (event && window.openEventDetailModal) {
          window.openEventDetailModal(event, dateStr);
        }
      });
    });
  }

  checkAndRenderConflictWarnings() {
    const warningContainer = document.getElementById("conflictWarningBox");
    if (!warningContainer) return;

    const todayStr = this.formatDateIso(this.currentDate);
    const conflicts = this.detectConflicts(todayStr);

    if (conflicts.length > 0) {
      warningContainer.style.display = "flex";
      warningContainer.innerHTML = `
        <div class="warning-badge">⚠️ Çakışma Tespit Edildi</div>
        <div class="warning-text">
          <strong>${conflicts[0].a.title}</strong> ile <strong>${conflicts[0].b.title}</strong> aynı saat aralığına denk geliyor.
        </div>
        <button class="btn btn-warning btn-xs" onclick="window.aiCopilot.autoResolveConflicts('${todayStr}')">
          ✨ AI ile Çakışmayı Çöz
        </button>
      `;
    } else {
      warningContainer.style.display = "none";
    }
  }

  setupEventListeners() {
    // Delegated click handler for calendar view buttons
    document.querySelectorAll("[data-calendar-view]").forEach(btn => {
      btn.onclick = () => {
        this.setView(btn.dataset.calendarView);
      };
    });

    const prevBtn = document.getElementById("calPrevBtn");
    const nextBtn = document.getElementById("calNextBtn");
    const todayBtn = document.getElementById("calTodayBtn");

    if (prevBtn) prevBtn.onclick = () => this.prevPeriod();
    if (nextBtn) nextBtn.onclick = () => this.nextPeriod();
    if (todayBtn) todayBtn.onclick = () => this.goToToday();
  }
}

window.calendar = new CalendarManager();
