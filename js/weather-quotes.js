/**
 * StudyMatrix - Weather, Live Clock & Daily Quotes Module
 * Inspiring wisdom from Richard Feynman, Nikola Tesla, Claude Shannon, Cal Newport, Andrei Kolmogorov, etc.
 */

const MOTIVATIONAL_QUOTES = [
  {
    quote: "Bir şeyi basitçe açıklayamıyorsanız, onu yeterince iyi anlamamışsınızdır.",
    author: "Richard Feynman",
    role: "Teorik Fizikçi & Nobel Ödülü Sahibi",
    tag: "Feynman Tekniği & Derin Öğrenme"
  },
  {
    quote: "Geleceğin dünyasını inşa etmek istiyorsanız, bugün temel denklemlerin içine gömülmelisiniz.",
    author: "Nikola Tesla",
    role: "Elektrik Mühendisi & Mucit",
    tag: "Elektrik-Elektronik Vizyonu"
  },
  {
    quote: "Derin çalışma (Deep Work), dikkatin bölünmediği bir ortamda bilişsel kapasitenin sınırlarını zorlama becerisidir.",
    author: "Cal Newport",
    role: "Bilgisayar Bilimcisi & Yazar",
    tag: "Odaklanma & Verimlilik"
  },
  {
    quote: "Bilgi teorisi, karmaşıklığın içindeki saf düzeni ve sinyali bulma sanatıdır.",
    author: "Claude Shannon",
    role: "Bilgi Teorisinin ve Sayısal Devrenin Babası",
    tag: "Sayısal Devreler & Sinyal"
  },
  {
    quote: "Matematik, doğanın konuştuğu dildir. Bir mühendis için türev ve integral, dünyanın hareketini görme gözlüğüdür.",
    author: "Paul Dirac",
    role: "Kuantum Mekaniğinin Öncüsü",
    tag: "Mühendislik Matematiği"
  },
  {
    quote: "Bugünü nasıl değiştirebilirim sorusunun tek bir cevabı vardır: Şu an önündeki problem setine tam odaklanarak.",
    author: "StudyMatrix Motto",
    role: "Günlük Odak Prensibi",
    tag: "Eyleme Geçiş"
  },
  {
    quote: "Büyük başarılar, haftalarca üst üste konan sessiz ve disiplinli 2 saatlik blokların kümülatif sonucudur.",
    author: "Richard Hamming",
    role: "Turing Ödüllü Matematikçi",
    tag: "Mühendislik Disiplini"
  },
  {
    quote: "Sert bir dersle karşılaştığında pes etme. Beynin tam o anda yeni nöral bağlantılar kuruyor.",
    author: "MIT 6.002x Çalışma Prensibi",
    role: "Devre Analizi Metodolojisi",
    tag: "Zorlukları Aşma"
  }
];

const WEATHER_PRESETS = {
  "istanbul": { city: "İstanbul", temp: 22, condition: "Güneşli / Berrak", icon: "☀️", note: "Çalışma odasını havalandırmak için harika bir hava." },
  "ankara": { city: "Ankara", temp: 19, condition: "Parçalı Bulutlu", icon: "⛅", note: "Serin ve odaklanmaya elverişli bir gün." },
  "izmir": { city: "İzmir", temp: 26, condition: "Açık & Ilık", icon: "🌤️", note: "Bol su için ve sabah saatlerinde derin çalışın." },
  "eskisehir": { city: "Eskişehir", temp: 18, condition: "Hafif Rüzgarlı", icon: "🍃", note: "Kütüphane veya masa başı seansı için ideal." },
  "boston": { city: "Cambridge / MIT", temp: 16, condition: "Bulutlu & Serin", icon: "☁️", note: "MIT kampüs havası: 6.002x laboratuvar zamanı!" },
  "london": { city: "Londra", temp: 15, condition: "Hafif Yağmurlu", icon: "🌧️", note: "Yağmur sesi eşliğinde Pomodoro ve İngilizce çalışması." }
};

class WeatherAndQuotesManager {
  constructor() {
    this.currentCityKey = localStorage.getItem("studymatrix_city") || "istanbul";
    this.clockInterval = null;
    this.quoteIndex = 0;
  }

  init() {
    this.startLiveClock();
    this.renderWeather();
    this.renderRandomQuote();
    this.setupEventListeners();
  }

  startLiveClock() {
    const updateTime = () => {
      const now = new Date();
      
      const timeEl = document.getElementById("liveClockTime");
      const dateEl = document.getElementById("liveClockDate");
      
      if (timeEl) {
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        timeEl.innerHTML = `${hours}:${minutes}:<span class="text-secondary text-sm">${seconds}</span>`;
      }
      
      if (dateEl) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateEl.textContent = now.toLocaleDateString('tr-TR', options);
      }
    };

    updateTime();
    this.clockInterval = setInterval(updateTime, 1000);
  }

  renderWeather() {
    const weatherData = WEATHER_PRESETS[this.currentCityKey] || WEATHER_PRESETS["istanbul"];
    const weatherCityEl = document.getElementById("weatherCity");
    const weatherTempEl = document.getElementById("weatherTemp");
    const weatherIconEl = document.getElementById("weatherIcon");
    const weatherDescEl = document.getElementById("weatherDesc");
    const weatherNoteEl = document.getElementById("weatherNote");

    if (weatherCityEl) weatherCityEl.textContent = weatherData.city;
    if (weatherTempEl) weatherTempEl.textContent = `${weatherData.temp}°C`;
    if (weatherIconEl) weatherIconEl.textContent = weatherData.icon;
    if (weatherDescEl) weatherDescEl.textContent = weatherData.condition;
    if (weatherNoteEl) weatherNoteEl.textContent = weatherData.note;

    const citySelect = document.getElementById("weatherCitySelect");
    if (citySelect) citySelect.value = this.currentCityKey;
  }

  setCity(cityKey) {
    if (WEATHER_PRESETS[cityKey]) {
      this.currentCityKey = cityKey;
      localStorage.setItem("studymatrix_city", cityKey);
      this.renderWeather();
    }
  }

  renderRandomQuote() {
    const quoteData = MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];
    this.displayQuote(quoteData);
  }

  nextQuote() {
    this.quoteIndex = (this.quoteIndex + 1) % MOTIVATIONAL_QUOTES.length;
    this.displayQuote(MOTIVATIONAL_QUOTES[this.quoteIndex]);
  }

  displayQuote(quoteData) {
    const quoteTextEl = document.getElementById("dailyQuoteText");
    const quoteAuthorEl = document.getElementById("dailyQuoteAuthor");
    const quoteTagEl = document.getElementById("dailyQuoteTag");

    if (quoteTextEl) {
      quoteTextEl.style.opacity = '0';
      setTimeout(() => {
        quoteTextEl.textContent = `“${quoteData.quote}”`;
        if (quoteAuthorEl) quoteAuthorEl.textContent = `— ${quoteData.author}, ${quoteData.role}`;
        if (quoteTagEl) quoteTagEl.textContent = quoteData.tag;
        quoteTextEl.style.opacity = '1';
      }, 150);
    }
  }

  setupEventListeners() {
    const nextQuoteBtn = document.getElementById("nextQuoteBtn");
    if (nextQuoteBtn) {
      nextQuoteBtn.addEventListener("click", () => this.nextQuote());
    }

    const citySelect = document.getElementById("weatherCitySelect");
    if (citySelect) {
      citySelect.addEventListener("change", (e) => this.setCity(e.target.value));
    }
  }
}

window.weatherAndQuotes = new WeatherAndQuotesManager();
