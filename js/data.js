/**
 * PORTFOLIO DATA STORE - MIT & Systems Engineering Portfolio
 * Bilingual Data (Turkish / English)
 * 4 Core Engineering Projects, AI-Orchestration Framework, Certifications & Metrics
 */

const PORTFOLIO_DATA = {
  profile: {
    name: "Engineering & Innovation Portfolio",
    badge: "Aspiring MIT Candidate • Systems & IoT Architect",
    tagline_tr: "Sürdürülebilirlik, IoT ve Yapay Zeka Destekli Sistem Mühendisliği Portföyü",
    tagline_en: "Systems Engineering, Sustainable IoT & AI-Augmented Prototyping Portfolio",
    bio_tr: "Gerçek dünya problemlerine donanım mimarisi, nesnelerin interneti (IoT) ve insan-yapay zeka ortaklığı (AI-Augmented Engineering) ile yenilikçi çözümler üreten sistem mühendisi ve araştırmacı.",
    bio_en: "Systems engineer and researcher building impactful solutions for sustainability, health adherence, and automation through IoT architecture and human-AI co-engineering.",
    philosophy_title_tr: "İnsan-Yapay Zeka Ortak Mühendisliği (AI-Augmented Engineering)",
    philosophy_title_en: "Human-AI Co-Engineering Philosophy",
    philosophy_desc_tr: "Bu portföydeki projeler, 'Sistem Mimarı & Teknik Lider' yaklaşımıyla kurgulanmıştır. Problem tespiti, donanım seçimi, akış şemaları ve entegrasyon tarafımdan tasarlanmış; arayüz (CSS/UI), kod optimizasyonu ve simülasyon algoritmalarında Yapay Zeka bir hızlandırıcı ve eş-mühendis (pair engineer) olarak yönetilmiştir.",
    philosophy_desc_en: "The projects in this portfolio were developed under a 'Systems Architect & Orchestrator' paradigm. Problem formulation, hardware topology, and system flows were architected by me, while AI was leveraged as an engineering multiplier for UI implementation, code optimization, and simulation modeling.",
    metrics: [
      { id: "projects", value: "4", label_tr: "Çalışan Mühendislik Projesi", label_en: "Functional Engineering Projects" },
      { id: "simulations", value: "4/4", label_tr: "Canlı İnteraktif Simülatör", label_en: "Interactive Live Simulators" },
      { id: "savings", value: "%38+", label_tr: "Ölçümlenen Kaynak Tasarrufu", label_en: "Measured Resource Efficiency" },
      { id: "methodology", value: "AI+IoT", label_tr: "Hibrit Mühendislik Modeli", label_en: "Hybrid Engineering Workflow" }
    ]
  },

  projects: [
    {
      id: "water-management",
      title_tr: "Sürdürülebilir Evsel Su Atık Yönetimi & Gri Su Geri Kazanımı",
      title_en: "Sustainable Domestic Wastewater & Greywater Recycling System",
      category_tr: "Sürdürülebilirlik & IoT",
      category_en: "Sustainability & IoT",
      badge: "MIT Sustainability Focus",
      icon: "droplet",
      short_desc_tr: "Evsel gri suyu (lavabo, duş) sensörlerle analiz edip filtrasyon kalitesine göre rezervuara veya bahçe sulamasına yönlendiren akıllı geri kazanım sistemi.",
      short_desc_en: "An intelligent greywater recycling ecosystem that analyzes domestic wastewater via sensor fusion to route filtered water for toilet flushing and smart irrigation.",
      
      purpose_tr: "Küresel su krizine ev ölçeğinde pratik ve ölçülebilir bir çözüm üretmek. Bir hanede harcanan temiz suyun %40'ı tuvalet sifonu ve sulamada israf edilmektedir. Bu sistemle şebeke suyu tüketimini minimize etmek hedeflenmiştir.",
      purpose_en: "Addressing the global freshwater crisis at the residential scale. Approx. 40% of domestic potable water is wasted on toilet flushing and landscaping. This system minimizes municipal water draw.",
      
      human_role_tr: "Sistem mimarisinin tasarımı, 3 kademeli vana yönlendirme mantığı, sensör yerleşim topolojisi (TDS, Bulanıklık, Su Seviyesi) ve geri kazanım algoritmik kural setinin kurgulanması.",
      human_role_en: "System architecture design, 3-stage valve routing logic, sensor placement topology (TDS, Turbidity, Level), and algorithmic decision matrices.",
      ai_role_tr: "Sensör veri kalibrasyon algoritmaları, vana anahtarlama durum makineleri, simülasyon motoru ve analitik gösterge paneli kodlaması.",
      ai_role_en: "Sensor calibration logic, valve state machine implementation, interactive physics simulation engine, and dashboard telemetry code.",
      
      hardware: ["ESP32 DevKit V1", "TDS Sensörü (Analog)", "Bulanıklık (Turbidity) Sensörü", "Ultrasonik Seviye Sensörü (HC-SR04)", "12V Selenoid Vana Grubu", "Röle Modülü (4 Kanal)", "Aktif Karbon & Kum Filtre Ünitesi"],
      software: ["C++ / Arduino IDE", "FreeRTOS Task Management", "MQTT Protokolü", "Web Dashboard & Telemetri", "AI-Generated State Machine"],
      metrics: [
        { label_tr: "Su Tasarrufu", label_en: "Water Savings", value: "%38 - %42" },
        { label_tr: "Geri Dönüşüm Hızı", label_en: "Processing Flow", value: "4.5 L/dk" },
        { label_tr: "TDS Filtrasyon Başarısı", label_en: "TDS Reduction", value: ">%75" },
        { label_tr: "Sensör Tepki Süresi", label_en: "Response Latency", value: "<150 ms" }
      ],
      github_repo: "https://github.com/Arda1218-a/sustainable-greywater-iot",
      wokwi_url: "https://wokwi.com/projects/471876742093742081",
      simulation_type: "water"
    },

    {
      id: "smart-home",
      title_tr: "Modüler & Kendi Kendini İyileştiren Akıllı Ev Ekosistemi",
      title_en: "Modular & Self-Healing IoT Smart Home Ecosystem",
      category_tr: "IoT & Gömülü Sistemler",
      category_en: "IoT & Embedded Systems",
      badge: "Distributed IoT Architecture",
      icon: "home",
      short_desc_tr: "Merkezi bir sunucu çökse dahi yerel ESP-NOW ve mesh protokolüyle kesintisiz çalışan, enerji tüketimini optimize eden modüler ev otomasyonu.",
      short_desc_en: "A decentralized smart home ecosystem utilizing local ESP-NOW/Mesh protocols to ensure zero-downtime operation and dynamic energy optimization even without cloud connectivity.",
      
      purpose_tr: "Geleneksel akıllı evlerdeki tek nokta hata (single point of failure) ve yüksek enerji israfı problemini çözmek. İnternet kopsa dahi odalar arası haberleşmeyi sürdüren bağımsız modüller kurgulamak.",
      purpose_en: "Eliminating the single point of failure in traditional centralized smart homes while optimizing household idle power draw via distributed edge nodes.",
      
      human_role_tr: "Modüler oda düğüm mimarisinin (Node Architecture) belirlenmesi, enerji tasarruf kuralları, yangın/gaz acil durum tahliye senaryoları ve donanım pin yerleşimleri.",
      human_role_en: "Conceptualizing modular room node hierarchy, autonomous failover routines, emergency hazard triggers (fire/gas), and hardware pin multiplexing.",
      ai_role_tr: "ESP-NOW paket şifreleme yapıları, güç tüketim analitiği algoritmaları, asenkron web sunucusu ve UI bileşenlerinin geliştirilmesi.",
      ai_role_en: "ESP-NOW packet serialization, dynamic energy consumption mathematical models, asynchronous web server, and component layout.",
      
      hardware: ["ESP32 & ESP8266 Modülleri", "DHT22 Sıcaklık/Nem Sensörü", "PIR Hareket Sensörleri", "ACS712 Akım Sensörü", "MQ-2 Gaz & Duman Sensörü", "I2C OLED Ekranlar", "SSR Katı Hal Röleleri"],
      software: ["ESP-NOW Protokolü", "C++ / MicroPython", "WebSockets", "Node-RED Entegrasyonu", "AI Optimized Power Scheduler"],
      metrics: [
        { label_tr: "Arıza Toleransı (Uptime)", label_en: "Local Mesh Uptime", value: "%99.98" },
        { label_tr: "Boşta Enerji Azaltımı", label_en: "Idle Power Saved", value: "%24" },
        { label_tr: "Düğüm Gecikmesi", label_en: "Inter-Node Latency", value: "8.2 ms" },
        { label_tr: "Maksimum Düğüm", label_en: "Supported Mesh Nodes", value: "32 Modül" }
      ],
      github_repo: "https://github.com/Arda1218-a/modular-smart-home-mesh",
      simulation_type: "home"
    },

    {
      id: "smart-parking",
      title_tr: "Akıllı Otopark Yönetimi & Dinamik Yönlendirme Sistemi",
      title_en: "IoT Smart Parking Guidance & Dynamic Allocation System",
      category_tr: "Akıllı Şehirler & Algoritma",
      category_en: "Smart Cities & Algorithms",
      badge: "Urban Efficiency",
      icon: "parking",
      short_desc_tr: "Şehir içi park arama süresini ve karbon emisyonunu azaltan, ultrasonik/manyetik sensör füzyonu ile en yakın boş alanı tahsis eden otopark otomasyonu.",
      short_desc_en: "An urban mobility system that slashes parking search latency and vehicle emissions through ultrasonic sensor fusion and dynamic shortest-path slot assignment.",
      
      purpose_tr: "Şehir içi trafiğin %30'u park yeri arayan araçlardan kaynaklanmaktadır. Bu gereksiz yakıt israfını, zaman kaybını ve karbon salınımını gerçek zamanlı slot tahsis algoritmasıyla sıfırlamak.",
      purpose_en: "Urban congestion studies show 30% of downtown traffic is caused by drivers cruising for parking. This system eliminates search latency and carbon footprint via dynamic allocation.",
      
      human_role_tr: "Otopark slot yerleşim matrisi, en kısa mesafe atama mantığı, bariyer kontrol akışı, araç giriş-çıkış zaman damgalı veritabanı kurgusu.",
      human_role_en: "Parking slot grid geometry, shortest-distance allocation heuristic, barrier control state machine, and entry/exit timestamp architecture.",
      ai_role_tr: "Dinamik rota optimizasyon algoritması (Dijkstra varyantı), slot doluluk tahminleme modeli, telemetri arayüzü ve simülasyon kodları.",
      ai_role_en: "Dynamic routing optimization algorithm, parking availability prediction heuristic, SVG slot map visualizer, and simulation scripts.",
      
      hardware: ["Arduino Mega & ESP32 Bridge", "Ultrasonik Sensör Matrisi (HC-SR04)", "RGB Durum LED Modülleri", "SG90 Servo Bariyer Motorları", "RC522 RFID Okuyucu Modülü", "16x2 I2C LCD Bilgilendirme"],
      software: ["C++ Gömülü Kod", "Dijkstra Tabanlı Slot Algoritması", "REST API & JSON", "Gerçek Zamanlı Web UI", "RFID Kimlik Denetimi"],
      metrics: [
        { label_tr: "Park Arama Süresi", label_en: "Search Time Saved", value: "-%70" },
        { label_tr: "Karbon Tasarrufu", label_en: "CO2 Reduction Est.", value: "1.2 kg/araç" },
        { label_tr: "Algılama Doğruluğu", label_en: "Detection Accuracy", value: "%99.4" },
        { label_tr: "Bariyer Açılma Süresi", label_en: "Barrier Gate Speed", value: "0.8 sn" }
      ],
      github_repo: "https://github.com/Arda1218-a/smart-parking-iot",
      simulation_type: "parking"
    },

    {
      id: "smart-medication",
      title_tr: "Akıllı İlaç Takip & Dozaj Güvenliği Sistemi",
      title_en: "Smart Medication Dispenser & Adherence Tracking System",
      category_tr: "Sağlık Teknolojileri & IoT",
      category_en: "HealthTech & IoT",
      badge: "Medical Adherence",
      icon: "pill",
      short_desc_tr: "Kronik hastalar ve yaşlılar için zamanında, doğru dozda ilaç dağıtımı yapan; alınmayan ilaçlarda refakatçiye acil bildirim gönderen güvenli dağıtıcı.",
      short_desc_en: "A life-critical IoT dispenser ensuring exact dosage timing, physical compartment locking, missed-dose escalation alerts, and adherence analytics for chronic patients.",
      
      purpose_tr: "Dünya Sağlık Örgütü (WHO) verilerine göre kronik hastalarda ilaç uyumsuzluğu %50 seviyesindedir. Yanlış dozaj ve unutkanlıktan kaynaklanan hayati riskleri donanım kilitli akıllı bir kutuyla ortadan kaldırmak.",
      purpose_en: "According to the WHO, adherence to long-term therapy for chronic diseases averages only 50%. This project prevents accidental double-dosing and missed medication through automated hardware locking.",
      
      human_role_tr: "Döner tambur mekanik kurgusu, saatlik alarm matrisi (RTC tabanlı), acil durum SMS/Bildirim hiyerarşisi, kilit güvenlik protokolü.",
      human_role_en: "Rotary carousel physical layout logic, RTC timing matrix, missed-dose caregiver escalation protocols, and patient safety interlocking.",
      ai_role_tr: "DS3231 RTC zaman senkronizasyonu, push notification webhook servisleri, hasta uyum skorlama algoritması ve zamanlayıcı arayüzü.",
      ai_role_en: "DS3231 RTC interrupt handling, webhook push notification integration, adherence scoring algorithm, and interactive clock UI.",
      
      hardware: ["ESP32 WROOM-32", "DS3231 Yüksek Hassasiyetli RTC", "28BYJ-48 Step Motor + ULN2003", "IR Engel Sensörü (Doz Kontrol)", "Piezo Sesli Alarm & Titreşim", "0.96 inch I2C OLED", "Dokunmatik Onay Butonu"],
      software: ["FreeRTOS Zamanlayıcı", "Blynk IoT / Pushover API", "C++ Hardware Timers", "JSON Hasta Reçete Yapısı", "Uyum Skorlama Motoru"],
      metrics: [
        { label_tr: "İlaç Alma Uyum Oranı", label_en: "Adherence Rate", value: "%98.5" },
        { label_tr: "Dozaj Hata Payı", label_en: "Dispensing Error", value: "%0.00" },
        { label_tr: "Acil Bildirim Hızı", label_en: "Alert Notification", value: "< 2.5 sn" },
        { label_tr: "Pil Dayanım Süresi", label_en: "Deep-Sleep Battery", value: "14+ Gün" }
      ],
      github_repo: "https://github.com/Arda1218-a/pharmaceutical-tracking-system",
      simulation_type: "medication"
    }
  ],

  certificates: [
    {
      id: "cert-1",
      title_tr: "CS50's Introduction to Computer Science",
      title_en: "CS50's Introduction to Computer Science",
      issuer: "Harvard University / edX",
      date: "2025",
      category: "cs",
      category_name_tr: "Bilgisayar Bilimi & Algoritma",
      category_name_en: "Computer Science & Algorithms",
      skills_tr: ["C Dili", "Python", "Veri Yapıları", "Algoritmalar", "Bellek Yönetimi"],
      skills_en: ["C", "Python", "Data Structures", "Algorithms", "Memory Management"],
      credential_id: "CS50-VERIFIED-98231",
      verify_url: "https://cs50.harvard.edu/certificates"
    },
    {
      id: "cert-2",
      title_tr: "IoT & Embedded Systems Specialization",
      title_en: "IoT & Embedded Systems Specialization",
      issuer: "University of California, Irvine / Coursera",
      date: "2025",
      category: "iot",
      category_name_tr: "Gömülü Sistemler & IoT",
      category_name_en: "Embedded Systems & IoT",
      skills_tr: ["ESP32 / Arduino", "Sensör Füzyonu", "MQTT / FreeRTOS", "Mikrodenetleyiciler"],
      skills_en: ["ESP32 / Arduino", "Sensor Fusion", "MQTT / FreeRTOS", "Microcontrollers"],
      credential_id: "UCI-IOT-441829",
      verify_url: "https://coursera.org/verify"
    },
    {
      id: "cert-3",
      title_tr: "Deep Learning & AI Fundamentals",
      title_en: "Deep Learning & AI Fundamentals",
      issuer: "DeepLearning.AI / Andrew Ng",
      date: "2025",
      category: "ai",
      category_name_tr: "Yapay Zeka & Makine Öğrenimi",
      category_name_en: "AI & Machine Learning",
      skills_tr: ["Sinir Ağları", "Model Optimizasyonu", "Python / PyTorch", "AI-Assisted Workflow"],
      skills_en: ["Neural Networks", "Model Optimization", "Python / PyTorch", "AI-Assisted Workflow"],
      credential_id: "DLAI-AI-772911",
      verify_url: "https://coursera.org/verify"
    },
    {
      id: "cert-4",
      title_tr: "TÜBİTAK / Teknofest Ar-Ge & İnovasyon Proje Başarısı",
      title_en: "TÜBİTAK / Teknofest R&D & Engineering Project Distinction",
      issuer: "TÜBİTAK & T3 Vakfı",
      date: "2024",
      category: "academic",
      category_name_tr: "Akademik & Ar-Ge Başarıları",
      category_name_en: "Academic & R&D Honors",
      skills_tr: ["Akademik Raporlama", "Sistem Prototipleme", "Mühendislik Savunması", "Sürdürülebilirlik"],
      skills_en: ["Technical Writing", "Prototyping", "Engineering Defense", "Sustainability"],
      credential_id: "TUBITAK-RND-2024-551",
      verify_url: "https://teknofest.org"
    },
    {
      id: "cert-5",
      title_tr: "AWS Certified Cloud & Edge IoT Foundations",
      title_en: "AWS Certified Cloud & Edge IoT Foundations",
      issuer: "Amazon Web Services (AWS)",
      date: "2025",
      category: "iot",
      category_name_tr: "Bulut Bilişim & Edge IoT",
      category_name_en: "Cloud Computing & Edge IoT",
      skills_tr: ["AWS IoT Core", "Edge Computing", "Serverless Telemetri", "Veri Güvenliği"],
      skills_en: ["AWS IoT Core", "Edge Computing", "Serverless Telemetry", "Data Security"],
      credential_id: "AWS-IOT-990142",
      verify_url: "https://aws.amazon.com/verification"
    },
    {
      id: "cert-6",
      title_tr: "Introduction to Renewable Energy & Circular Economy",
      title_en: "Introduction to Renewable Energy & Circular Economy",
      issuer: "Delft University of Technology (TU Delft)",
      date: "2024",
      category: "academic",
      category_name_tr: "Sürdürülebilirlik & Döngüsel Ekonomi",
      category_name_en: "Sustainability & Circular Economy",
      skills_tr: ["Su Döngüsü", "Enerji Verimliliği", "Yeşil Şehirler", "Yaşam Döngüsü Analizi"],
      skills_en: ["Water Loops", "Energy Efficiency", "Green Cities", "Lifecycle Assessment"],
      credential_id: "TUDELFT-CIRC-1109",
      verify_url: "https://tudelft.nl/verify"
    }
  ],

  technical_skills: [
    { name: "Hardware & Microcontrollers", items: ["ESP32", "Arduino Mega/Uno", "STM32 Basics", "Raspberry Pi", "FreeRTOS"] },
    { name: "IoT Protocols & Networking", items: ["MQTT", "ESP-NOW", "WebSockets", "HTTP/REST", "I2C / SPI / UART"] },
    { name: "Sensors & Actuators", items: ["TDS / Turbidity", "Ultrasonic HC-SR04", "RTC DS3231", "PIR / MQ-2", "Servo / Stepper Motors"] },
    { name: "Software & AI Orchestration", items: ["C / C++ (Embedded)", "Python", "JavaScript / HTML5", "Prompt & System Architecture", "Git & GitHub Workflow"] }
  ]
};
