/**
 * StudyMatrix - OptiStudy AI Copilot
 * Intelligent schedule optimization, natural language command parser,
 * smart conflict resolver, automated rescheduling, and multi-career advisor (Medicine, EEE, CS/AI, etc.).
 */

class AICopilot {
  constructor() {
    this.messages = this.loadChatHistory();
  }

  init() {
    if (!this.messages || this.messages.length === 0) {
      this.messages = [
        {
          sender: "ai",
          time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
          text: `Merhaba! Ben **StudyMatrix AI Akademik Asistanın**. 
İster **Doktor / Tıp**, ister **Elektrik-Elektronik**, ister **Yazılım & AI** hedefleyin; ders programınızı, ertelemelerinizi ve kurs seçimlerinizi optimize etmek için buradayım.

**Benden şunları isteyebilirsiniz:**
- 🕒 *"Bugün çok yoğunum, dersleri 2 saat ertele"*
- 🩺 *"Doktor olmak istiyorum, bana tıp ve sağlık kursları öner"*
- ⚡ *"MIT 6.002x ve 18.01x Türev derslerimi haftalık programa yerleştir"*
- 🔄 *"Çakışan dersleri çöz ve yükü günlere dengeli dağıt"*
- 🇬🇧 *"Medikal ve STEM İngilizcesi için çalışma planı yap"*`
        }
      ];
    }
    this.renderChat();
    this.setupEventListeners();
  }

  loadChatHistory() {
    try {
      const data = localStorage.getItem("studymatrix_ai_chat");
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  saveChatHistory() {
    try {
      localStorage.setItem("studymatrix_ai_chat", JSON.stringify(this.messages));
    } catch (e) {
      console.error(e);
    }
  }

  renderChat() {
    const chatContainer = document.getElementById("aiChatMessages");
    if (!chatContainer) return;

    chatContainer.innerHTML = (this.messages || []).map(msg => `
      <div class="chat-message ${msg.sender === 'user' ? 'user-msg' : 'ai-msg'}">
        <div class="msg-bubble">
          <div class="msg-header">
            <strong>${msg.sender === 'user' ? '👤 Siz' : '✨ OptiStudy AI'}</strong>
            <span class="msg-time">${msg.time}</span>
          </div>
          <div class="msg-content">${this.formatMarkdown(msg.text)}</div>
          ${msg.actionHtml ? `<div class="msg-action-container">${msg.actionHtml}</div>` : ''}
        </div>
      </div>
    `).join('');

    chatContainer.scrollTop = chatContainer.scrollHeight;
  }

  formatMarkdown(text) {
    if (!text) return "";
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>')
      .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');
  }

  async handleUserPrompt(inputText) {
    if (!inputText || !inputText.trim()) return;

    const userText = inputText.trim();
    const nowTime = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });

    this.messages.push({
      sender: "user",
      time: nowTime,
      text: userText
    });
    this.renderChat();

    this.showTypingIndicator();

    setTimeout(() => {
      this.hideTypingIndicator();
      const response = this.processIntent(userText);
      
      this.messages.push({
        sender: "ai",
        time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
        text: response.text,
        actionHtml: response.actionHtml
      });

      this.saveChatHistory();
      this.renderChat();

      if (response.autoExecute && typeof response.autoExecute === 'function') {
        response.autoExecute();
      }
    }, 600);
  }

  showTypingIndicator() {
    const chatContainer = document.getElementById("aiChatMessages");
    if (!chatContainer) return;

    let typingEl = document.getElementById("aiTypingEl");
    if (!typingEl) {
      typingEl = document.createElement("div");
      typingEl.id = "aiTypingEl";
      typingEl.className = "chat-message ai-msg typing-msg";
      typingEl.innerHTML = `
        <div class="msg-bubble">
          <span class="typing-dots"><span>.</span><span>.</span><span>.</span> OptiStudy AI yanıt hazırlıyor</span>
        </div>
      `;
      chatContainer.appendChild(typingEl);
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }

  hideTypingIndicator() {
    const typingEl = document.getElementById("aiTypingEl");
    if (typingEl) typingEl.remove();
  }

  processIntent(query) {
    const q = query.toLowerCase();

    // Intent 1: Reschedule / Postpone
    if (q.includes("ertele") || q.includes("kaydır") || q.includes("ileri al") || q.includes("yorgun") || q.includes("geciktim")) {
      let hours = 2;
      if (q.includes("1 saat") || q.includes("bir saat")) hours = 1;
      if (q.includes("3 saat") || q.includes("üç saat")) hours = 3;

      const shiftedCount = window.calendar.postponeTodayEvents(hours * 60);

      return {
        text: `⚡ **Program Güncellendi!**\n\nBugünkü seanslar **${hours} saat ileri** ötelendi.\n\n- Güncellenen Ders Sayısı: **${shiftedCount} ders**\n- Takvim görünümünde güncel saatleri görebilirsin.`,
        actionHtml: `<button class="btn btn-sm btn-secondary" onclick="window.calendar.render(); window.switchTab('calendar');">📅 Takvimde İncele</button>`
      };
    }

    // Intent 2: Doctor / Medicine / Healthcare recommendations
    if (q.includes("doktor") || q.includes("tıp") || q.includes("sağlık") || q.includes("biyomedikal") || q.includes("anatomi") || q.includes("biyokimya")) {
      return {
        text: `🩺 **Doktorluk & Tıp Alanı İçin Sertifikalı Kurs Yol Haritası:**

1. **Stanford Online: Clinical Anatomy (İnsan Anatomisi)**
   - Kardiyovasküler, solunum ve böbrek sistemleri klinik vaka analizleri.
2. **HarvardX: Principles of Biochemistry (Tıbbi Biyokimya)**
   - Enzim kinetiği, hücresel metabolizma ve farmakoloji altyapısı.
3. **Johns Hopkins: Biostatistics in Public Health**
   - Klinik araştırmalar, ilaç testleri ve epidemiyoloji için kritik istatistik.
4. **MIT 18.01x Calculus (Temel Matematik)**
   - Farmakokinetik ilaç dozajı ve biyofizik modelleme için türev/integral.
5. **UPenn: Medical English for Healthcare Professionals**
   - Hasta öyküsü (anamnez) ve uluslararası tıp literatürü okuma becerisi.`,
        actionHtml: `
          <div style="display:flex; gap:8px; flex-wrap:wrap; margin-top:8px;">
            <button class="btn btn-xs btn-primary" onclick="window.app.setCareerTrack('medicine')">🩺 Tıp Programını Takvime Yükle</button>
            <button class="btn btn-xs btn-secondary" onclick="window.enrollCourseQuick('stanford-anatomy')">+ Stanford Anatomi Ekle</button>
            <button class="btn btn-xs btn-secondary" onclick="window.switchTab('catalog')">📚 Kurs Kataloğunu Aç</button>
          </div>
        `
      };
    }

    // Intent 3: Resolve conflicts
    if (q.includes("çakış") || q.includes("conflict") || q.includes("çöz")) {
      const todayStr = window.calendar.formatDateIso(new Date());
      this.autoResolveConflicts(todayStr);
      return {
        text: `✨ **Çakışmalar Başarıyla Çözüldü!**\n\nAynı saat dilimine denk gelen dersler analiz edildi ve seanslar ardışık boşluklara yerleştirildi.`,
        actionHtml: `<button class="btn btn-sm btn-secondary" onclick="window.switchTab('calendar')">📅 Takvimi Aç</button>`
      };
    }

    // Intent 4: EEE / MIT 6.002x
    if (q.includes("6.002") || q.includes("devre") || q.includes("elektronik") || q.includes("elektrik")) {
      return {
        text: `⚡ **Elektrik-Elektronik & MIT 6.002x Çalışma Stratejisi:**

1. **Devre Kanunları (KVL/KCL):** Nodal ve Mesh denklemlerini sistematik kurun.
2. **Falstad / LTspice Simülasyonu:** Devreyi kurup osiloskop dalga formlarını ve geçici rejim (transient response) yanıtını görün.
3. **MIT 18.01x Matematik Desteği:** Kondansatör ($i = C \\frac{dv}{dt}$) ve Bobin ($v = L \\frac{di}{dt}$) türev denklemlerini refleks haline getirin.`,
        actionHtml: `
          <div style="display:flex; gap:8px; flex-wrap:wrap; margin-top:8px;">
            <button class="btn btn-xs btn-primary" onclick="window.app.setCareerTrack('eee')">⚡ EEE Programını Yükle</button>
            <button class="btn btn-xs btn-accent" onclick="window.switchTab('pomodoro'); window.startPomodoroForEvent(null, 'MIT 6.002x Devre Analizi');">🍅 Pomodoro Başlat</button>
          </div>
        `
      };
    }

    // Intent 5: Software & CS/AI
    if (q.includes("yazılım") || q.includes("yapay zeka") || q.includes("ai") || q.includes("python") || q.includes("cs50")) {
      return {
        text: `💻 **Yazılım & Yapay Zeka (AI / CS) Yol Haritası:**

1. **Harvard CS50x:** C ve Python ile bilgisayar bilimi ve algoritma temeli.
2. **Stanford Machine Learning (Andrew Ng):** Sinir ağları ve makine öğrenimi.
3. **MIT 6.006 Algoritmalar:** Graf algoritmaları ve dinamik programlama.
4. **Lineer Cebir & STEM İngilizce:** Vektör/matris işlemleri ve teknik dokümantasyon.`,
        actionHtml: `
          <div style="display:flex; gap:8px; flex-wrap:wrap; margin-top:8px;">
            <button class="btn btn-xs btn-primary" onclick="window.app.setCareerTrack('cs_ai')">💻 Yazılım & AI Programını Yükle</button>
            <button class="btn btn-xs btn-secondary" onclick="window.enrollCourseQuick('harvard-cs50')">+ Harvard CS50x Ekle</button>
          </div>
        `
      };
    }

    // Default smart response
    return {
      text: `Anladım! **"${query}"** konusunda sana yardımcı olmaya hazırım.\n\nİster programındaki dersleri ileri kaydırabilir, ister çakışmaları çözebilir, istersen belirlediğin hedefe göre (Tıp, EEE, Yazılım vb.) en kaliteli sertifikalı dersleri takvimine yerleştirebilirim.`,
      actionHtml: `
        <div style="display:flex; gap:8px; flex-wrap:wrap; margin-top:6px;">
          <button class="btn btn-xs btn-secondary" onclick="window.openProfileModal()">👤 Kariyer / Profil Seç</button>
          <button class="btn btn-xs btn-secondary" onclick="window.calendar.postponeTodayEvents(60)">🕒 1 Saat Ertele</button>
          <button class="btn btn-xs btn-primary" onclick="window.switchTab('calendar')">📅 Takvim</button>
        </div>
      `
    };
  }

  autoResolveConflicts(dateStr) {
    const conflicts = window.calendar.detectConflicts(dateStr);
    if (conflicts.length === 0) return;

    conflicts.forEach(conf => {
      const endA = conf.a.endTime;
      const [endH, endM] = endA.split(':').map(Number);
      
      const newStartMins = (endH * 60) + endM + 15;
      const newEndMins = newStartMins + (conf.b.durationMinutes || 90);

      if (!conf.b.overrides) conf.b.overrides = {};
      conf.b.overrides[dateStr] = {
        startTime: window.calendar.minutesToTime(newStartMins),
        endTime: window.calendar.minutesToTime(newEndMins),
        autoResolved: true
      };
    });

    window.calendar.saveEvents();
    window.calendar.render();
  }

  setupEventListeners() {
    const sendBtn = document.getElementById("aiSendBtn");
    const inputEl = document.getElementById("aiInputText");

    if (sendBtn && inputEl) {
      sendBtn.onclick = () => {
        const text = inputEl.value;
        inputEl.value = "";
        this.handleUserPrompt(text);
      };

      inputEl.onkeydown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          const text = inputEl.value;
          inputEl.value = "";
          this.handleUserPrompt(text);
        }
      };
    }

    document.querySelectorAll("[data-ai-prompt]").forEach(pill => {
      pill.onclick = () => {
        const prompt = pill.dataset.aiPrompt;
        this.handleUserPrompt(prompt);
      };
    });
  }
}

window.aiCopilot = new AICopilot();
