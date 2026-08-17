/**
 * PORTFOLIO APPLICATION CONTROLLER
 * Language management (TR/EN), Theme toggle, Modal controller, Filter system
 */

const App = {
  currentLang: 'tr', // 'tr' or 'en'
  currentTheme: 'dark',
  currentCertFilter: 'all',

  init() {
    this.bindEvents();
    this.renderHeroMetrics();
    this.renderProjects();
    this.renderCertificates();
    this.renderSkillsMatrix();
    this.updateLanguageStrings();

    if (window.Simulations) {
      window.Simulations.init();
    }
  },

  bindEvents() {
    // Theme Toggle
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => this.toggleTheme());
    }

    // Language Toggle
    const langBtn = document.getElementById('lang-toggle-btn');
    if (langBtn) {
      langBtn.addEventListener('click', () => this.toggleLanguage());
    }

    // Simulation Tabs
    const tabBtns = document.querySelectorAll('.sim-tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const targetTab = btn.getAttribute('data-tab');
        this.switchSimTab(targetTab, btn);
      });
    });

    // Certificate Filters
    const certFilterBtns = document.querySelectorAll('.filter-btn');
    certFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        certFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentCertFilter = btn.getAttribute('data-filter');
        this.renderCertificates();
      });
    });

    // Modal Close
    const modalClose = document.getElementById('modal-close');
    const modalOverlay = document.getElementById('project-modal');
    if (modalClose && modalOverlay) {
      modalClose.addEventListener('click', () => this.closeModal());
      modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) this.closeModal();
      });
    }

    // Escape key closes modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.closeModal();
    });
  },

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', this.currentTheme);
    const themeIcon = document.getElementById('theme-icon');
    if (themeIcon) {
      themeIcon.textContent = this.currentTheme === 'dark' ? '🌙' : '☀️';
    }
  },

  toggleLanguage() {
    this.currentLang = this.currentLang === 'tr' ? 'en' : 'tr';
    const langBtn = document.getElementById('lang-toggle-btn');
    if (langBtn) {
      langBtn.textContent = this.currentLang === 'tr' ? '🇺🇸 EN' : '🇹🇷 TR';
    }
    this.updateLanguageStrings();
    this.renderHeroMetrics();
    this.renderProjects();
    this.renderCertificates();
    this.renderSkillsMatrix();
    if (window.Simulations) {
      window.Simulations.init();
    }
  },

  updateLanguageStrings() {
    const isTr = this.currentLang === 'tr';
    const d = PORTFOLIO_DATA.profile;

    // Header & Hero
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (key && window.I18N_STRINGS && window.I18N_STRINGS[this.currentLang] && window.I18N_STRINGS[this.currentLang][key]) {
        el.textContent = window.I18N_STRINGS[this.currentLang][key];
      }
    });

    // Dynamic Texts
    const taglineEl = document.getElementById('hero-tagline');
    if (taglineEl) taglineEl.textContent = isTr ? d.tagline_tr : d.tagline_en;

    const bioEl = document.getElementById('hero-bio');
    if (bioEl) bioEl.textContent = isTr ? d.bio_tr : d.bio_en;

    const philTitleEl = document.getElementById('philosophy-title');
    if (philTitleEl) philTitleEl.textContent = isTr ? d.philosophy_title_tr : d.philosophy_title_en;

    const philDescEl = document.getElementById('philosophy-desc');
    if (philDescEl) philDescEl.textContent = isTr ? d.philosophy_desc_tr : d.philosophy_desc_en;
  },

  renderHeroMetrics() {
    const container = document.getElementById('hero-metrics-container');
    if (!container) return;
    const isTr = this.currentLang === 'tr';

    container.innerHTML = PORTFOLIO_DATA.profile.metrics.map(m => `
      <div class="metric-card">
        <div class="metric-value">${m.value}</div>
        <div class="metric-label">${isTr ? m.label_tr : m.label_en}</div>
      </div>
    `).join('');
  },

  renderProjects() {
    const container = document.getElementById('projects-grid-container');
    if (!container) return;
    const isTr = this.currentLang === 'tr';

    container.innerHTML = PORTFOLIO_DATA.projects.map(p => `
      <div class="project-card">
        <div class="project-top">
          <div class="project-badge-row">
            <span class="project-category">${isTr ? p.category_tr : p.category_en}</span>
            <span class="project-tag-pill">${p.badge}</span>
          </div>
          <h3 class="project-title">${isTr ? p.title_tr : p.title_en}</h3>
          <p class="project-desc">${isTr ? p.short_desc_tr : p.short_desc_en}</p>

          <div class="project-metrics-row">
            ${p.metrics.slice(0, 2).map(m => `
              <div class="p-metric">
                <span class="p-metric-val">${m.value}</span>
                <span class="p-metric-lbl">${isTr ? m.label_tr : m.label_en}</span>
              </div>
            `).join('')}
          </div>

          <div class="project-tech-tags">
            ${p.hardware.slice(0, 3).map(h => `<span class="tech-pill">🔧 ${h}</span>`).join('')}
            ${p.software.slice(0, 2).map(s => `<span class="tech-pill">💻 ${s}</span>`).join('')}
          </div>
        </div>

        <div class="project-footer">
          <button class="btn btn-primary btn-sm" onclick="App.openProjectModal('${p.id}')">
            ${isTr ? '🔍 Mimari & Detaylar' : '🔍 Deep Dive & Architecture'}
          </button>
          <button class="btn btn-outline btn-sm" onclick="App.jumpToSim('${p.simulation_type}')">
            ${isTr ? '⚡ Canlı Simülasyon' : '⚡ Live Simulator'}
          </button>
          <a href="${p.github_repo}" target="_blank" rel="noreferrer" class="btn-icon" title="GitHub Repository">
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          </a>
        </div>
      </div>
    `).join('');
  },

  renderCertificates() {
    const container = document.getElementById('certificates-grid-container');
    if (!container) return;
    const isTr = this.currentLang === 'tr';

    const filtered = PORTFOLIO_DATA.certificates.filter(c => {
      if (this.currentCertFilter === 'all') return true;
      return c.category === this.currentCertFilter;
    });

    container.innerHTML = filtered.map(c => `
      <div class="cert-card">
        <div>
          <div class="cert-issuer">${c.issuer} • ${c.date}</div>
          <h4 class="cert-title">${isTr ? c.title_tr : c.title_en}</h4>
          <div class="cert-skills">
            ${(isTr ? c.skills_tr : c.skills_en).map(s => `<span class="tech-pill">${s}</span>`).join('')}
          </div>
        </div>

        <div class="cert-footer">
          <span>ID: <code>${c.credential_id}</code></span>
          <a href="${c.verify_url}" target="_blank" rel="noreferrer" class="btn-outline btn-sm" style="padding: 0.2rem 0.6rem;">
            ${isTr ? 'Doğrula ↗' : 'Verify ↗'}
          </a>
        </div>
      </div>
    `).join('');
  },

  renderSkillsMatrix() {
    const container = document.getElementById('skills-matrix-container');
    if (!container) return;

    container.innerHTML = `
      <h4 class="skills-matrix-title">Mühendislik & Teknoloji Yığını (Tech Stack)</h4>
      ${PORTFOLIO_DATA.technical_skills.map(cat => `
        <div class="skill-category-group">
          <div class="skill-cat-name">${cat.name}</div>
          <div class="skill-pills">
            ${cat.items.map(item => `<span class="skill-tag">${item}</span>`).join('')}
          </div>
        </div>
      `).join('')}
    `;
  },

  switchSimTab(tabId, clickedBtn) {
    document.querySelectorAll('.sim-tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.sim-tab-pane').forEach(p => p.classList.remove('active'));

    if (clickedBtn) clickedBtn.classList.add('active');
    const targetPane = document.getElementById(`sim-tab-${tabId}`);
    if (targetPane) targetPane.classList.add('active');
  },

  jumpToSim(simType) {
    const simSection = document.getElementById('simulations-section');
    if (simSection) {
      simSection.scrollIntoView({ behavior: 'smooth' });
    }
    const tabBtn = document.querySelector(`.sim-tab-btn[data-tab="${simType}"]`);
    if (tabBtn) {
      this.switchSimTab(simType, tabBtn);
    }
  },

  openProjectModal(projectId) {
    const project = PORTFOLIO_DATA.projects.find(p => p.id === projectId);
    if (!project) return;

    const isTr = this.currentLang === 'tr';
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-project-title');
    const modalContent = document.getElementById('modal-project-content');

    if (!modal || !modalTitle || !modalContent) return;

    modalTitle.textContent = isTr ? project.title_tr : project.title_en;

    modalContent.innerHTML = `
      <!-- Section 1: MIT Purpose -->
      <div class="deep-dive-section">
        <h4 class="deep-dive-title">🎯 ${isTr ? 'Projenin Amacı ve Çözülen Problem (MIT Focus)' : 'Problem Statement & Motivation (MIT Focus)'}</h4>
        <p class="deep-dive-text">${isTr ? project.purpose_tr : project.purpose_en}</p>
      </div>

      <!-- Section 2: Human vs AI Engineering Split -->
      <div class="deep-dive-section">
        <h4 class="deep-dive-title">🤝 ${isTr ? 'İş Bölümü: Sistem Mimarı vs. Yapay Zeka Desteği' : 'Work Division: Systems Architect vs. AI Multiplier'}</h4>
        <div class="philosophy-division-grid" style="margin-top: 0.5rem;">
          <div class="division-col">
            <div class="division-title">
              <span>👤</span>
              <span>${isTr ? 'Benim Rolüm (Sistem Mimarı)' : 'My Role (System Architect)'}</span>
            </div>
            <p class="text-sm text-muted">${isTr ? project.human_role_tr : project.human_role_en}</p>
          </div>
          <div class="division-col">
            <div class="division-title">
              <span>🤖</span>
              <span>${isTr ? 'Yapay Zeka Rolü (Hızlandırıcı & UI/Algoritma)' : 'AI Role (Accelerator & UI/Math)'}</span>
            </div>
            <p class="text-sm text-muted">${isTr ? project.ai_role_tr : project.ai_role_en}</p>
          </div>
        </div>
      </div>

      <!-- Section 3: Hardware & Sensors BOM -->
      <div class="deep-dive-section">
        <h4 class="deep-dive-title">🔧 ${isTr ? 'Donanım Bileşenleri & Sensörler' : 'Hardware BOM & Sensors'}</h4>
        <ul class="spec-list">
          ${project.hardware.map(h => `<li>• ${h}</li>`).join('')}
        </ul>
      </div>

      <!-- Section 4: Software Stack -->
      <div class="deep-dive-section">
        <h4 class="deep-dive-title">💻 ${isTr ? 'Yazılım ve Protokoller' : 'Software Stack & Protocols'}</h4>
        <ul class="spec-list">
          ${project.software.map(s => `<li>• ${s}</li>`).join('')}
        </ul>
      </div>

      <!-- Section 5: Metrics -->
      <div class="deep-dive-section">
        <h4 class="deep-dive-title">📊 ${isTr ? 'Ölçümlenen Mühendislik Metrikleri' : 'Measured Engineering Benchmarks'}</h4>
        <div class="project-metrics-row">
          ${project.metrics.map(m => `
            <div class="p-metric">
              <span class="p-metric-val">${m.value}</span>
              <span class="p-metric-lbl">${isTr ? m.label_tr : m.label_en}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div style="display: flex; flex-wrap: wrap; gap: 0.75rem; margin-top: 1.5rem; justify-content: flex-end;">
        ${project.wokwi_url ? `
          <a href="${project.wokwi_url}" target="_blank" rel="noreferrer" class="btn btn-outline btn-sm" style="border-color: #10b981; color: #10b981;">
            ⚡ ${isTr ? 'Wokwi Canlı Devre Simülasyonu ↗' : 'Wokwi Live Circuit Sim ↗'}
          </a>
        ` : ''}
        <button class="btn btn-outline btn-sm" onclick="App.closeModal(); App.jumpToSim('${project.simulation_type}');">
          ${isTr ? '🔬 Web Simülatörünü Aç' : '🔬 Open Web Simulator'}
        </button>
        <a href="${project.github_repo}" target="_blank" rel="noreferrer" class="btn btn-primary btn-sm">
          ${isTr ? '📂 GitHub Repository & Kodlar' : '📂 GitHub Repo & Source'}
        </a>
      </div>
    `;

    modal.classList.add('active');
  },

  closeModal() {
    const modal = document.getElementById('project-modal');
    if (modal) modal.classList.remove('active');
  }
};

// UI Localization Dictionary
window.I18N_STRINGS = {
  tr: {
    nav_projects: "Projeler",
    nav_sims: "Simülasyon Laboratuvarı",
    nav_certs: "Sertifikalar",
    nav_about: "Hakkımda & Vizyon",
    nav_github: "GitHub Profili",
    hero_btn_projects: "Projeleri İncele ↓",
    hero_btn_sims: "Canlı Simülatörler ⚡",
    projects_tag: "Uygulamalı Mühendislik",
    projects_title: "Öne Çıkan Mühendislik Projeleri",
    projects_subtitle: "Gerçek dünya problemlerine odaklanan, donanım ve yazılım entegrasyonu tamamlanmış 4 özgün sistem.",
    sims_tag: "İnteraktif Test Ortamı",
    sims_title: "Canlı Simülasyon Laboratuvarı",
    sims_subtitle: "Projelerin arka planında çalışan sensör füzyonu, durum makineleri ve algoritmaları doğrudan tarayıcınızda test edin.",
    certs_tag: "Sürekli Gelişim",
    certs_title: "Sertifikalar & Akademik Başarılar",
    certs_subtitle: "Dünyanın önde gelen kurumlarından alınan doğrulanabilir teknik ve akademik yetkinlikler.",
    about_tag: "Mühendislik Vizyonu",
    about_title: "Hakkımda & MIT Hedefi",
    footer_copy: "© 2026 Systems & IoT Engineering Portfolio • Designed for MIT Admissions & Global Impact"
  },
  en: {
    nav_projects: "Projects",
    nav_sims: "Simulation Lab",
    nav_certs: "Certificates",
    nav_about: "About & Vision",
    nav_github: "GitHub Profile",
    hero_btn_projects: "Explore Projects ↓",
    hero_btn_sims: "Live Simulators ⚡",
    projects_tag: "Applied Engineering",
    projects_title: "Featured Engineering Projects",
    projects_subtitle: "Four fully architected hardware-software systems targeting critical real-world challenges.",
    sims_tag: "Interactive Testbed",
    sims_title: "Live Simulation Laboratory",
    sims_subtitle: "Interact with real-time sensor fusion logic, mesh state machines, and shortest-path heuristics in your browser.",
    certs_tag: "Lifelong Learning",
    certs_title: "Certifications & Academic Honors",
    certs_subtitle: "Verified credentials from top global institutions validating technical rigour and domain mastery.",
    about_tag: "Engineering Vision",
    about_title: "About Me & MIT Ambition",
    footer_copy: "© 2026 Systems & IoT Engineering Portfolio • Designed for MIT Admissions & Global Impact"
  }
};

window.App = App;
document.addEventListener('DOMContentLoaded', () => App.init());
