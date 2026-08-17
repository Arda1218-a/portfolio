/**
 * StudyMatrix - Curated Course Catalog & Career Roadmaps
 * High-quality, certified, accessible courses for:
 * 1. Elektrik-Elektronik Mühendisliği (EEE)
 * 2. Tıp & Doktorluk / Biyomedikal (Medicine / Healthcare)
 * 3. Yazılım & Yapay Zeka (Computer Science / AI)
 * 4. Makine, Havacılık & Robotik (Mechanical / Robotics)
 * 5. Veri Bilimi, Finans & Ekonomi (Data / Finance)
 * + Foundational Mathematics (Türev / Kalkülüs / İstatistik) and Technical English (STEM / Medical)
 */

const CAREER_PROFILES = {
  "eee": {
    id: "eee",
    name: "Elektrik-Elektronik Mühendisi",
    icon: "⚡",
    tagline: "Devreler, Sinyaller, İşlemci Mimarisi & Elektromanyetik Alanlar",
    description: "MIT 6.002x ve Kalkülüs temelli, donanım ve analog/sayısal sistemler odaklı mühendislik programı.",
    courseIds: ["mit-6002x", "mit-1801x", "mit-1802x", "mit-802x", "mit-6004x", "eng-stem", "bbc-eng"]
  },
  "medicine": {
    id: "medicine",
    name: "Tıp & Doktorluk / Sağlık Bilimleri",
    icon: "🩺",
    tagline: "İnsan Anatomisi, Tıbbi Biyokimya, Genetik, Biyoistatistik & Medikal İngilizce",
    description: "Tıp fakültesi, USMLE/TUS hazırlığı ve biyomedikal araştırmalar için uluslararası standartta temel tıp bilimleri.",
    courseIds: ["stanford-anatomy", "harvard-biochem", "jhu-biostats", "mit-1801x", "upenn-med-english", "bbc-eng"]
  },
  "cs_ai": {
    id: "cs_ai",
    name: "Yazılım Mühendisi & Yapay Zeka Uzmanı",
    icon: "💻",
    tagline: "Algoritmalar, Sistem Mimarisi, Derin Öğrenme & Lineer Cebir",
    description: "Harvard CS50x, Stanford AI ve ileri algoritma tasarımını kapsayan modern yazılım geliştirici yolu.",
    courseIds: ["harvard-cs50", "stanford-machine-learning", "mit-6006-algo", "mit-1801x", "stanford-linear-algebra", "eng-stem", "bbc-eng"]
  },
  "mechanical_robotics": {
    id: "mechanical_robotics",
    name: "Makine, Havacılık & Robotik Mühendisi",
    icon: "🚀",
    tagline: "Statik, Dinamik, Termodinamik, Mekatronik & Diferansiyel Denklemler",
    description: "Robotik kinematiği, aerodinamik ve mekanik sistem modellemesi için ileri mühendislik eğitimi.",
    courseIds: ["mit-mechanics", "mit-thermo", "mit-1801x", "mit-1802x", "mit-6002x", "eng-stem", "bbc-eng"]
  },
  "finance_data": {
    id: "finance_data",
    name: "Veri Bilimci, Finans & Ekonometri",
    icon: "📊",
    tagline: "Olasılık, Stokastik Analiz, Finansal Modelleme & Makine Öğrenimi",
    description: "Kuantitatif finans, risk yönetimi ve büyük veri analitiği için matematiksel modelleme programı.",
    courseIds: ["mit-finance-quant", "mit-prob-stats", "stanford-linear-algebra", "mit-1801x", "eng-stem", "bbc-eng"]
  }
};

const CURATED_COURSES = [
  // --- ELEKTRİK-ELEKTRONİK (EEE) ---
  {
    id: "mit-6002x",
    code: "MIT 6.002x",
    title: "Circuits and Electronics 1: Basic Circuit Analysis",
    provider: "edX / MITx (Prof. Anant Agarwal)",
    category: "eee",
    categoryName: "Elektrik-Elektronik",
    difficulty: "Orta - Zor (Mühendislik Temeli)",
    durationWeeks: 10,
    estimatedHoursPerWeek: 8,
    cost: "Ücretsiz İnceleme / Sertifika",
    url: "https://www.edx.org/learn/circuits/massachusetts-institute-of-technology-circuits-and-electronics-1-basic-circuit-analysis",
    badgeColor: "#0284c7",
    description: "Devre elemanları (R, L, C), Kirchhoff yasaları, Thevenin/Norton eşdeğerleri, op-amp'ler ve dinamik devreler.",
    topics: ["KVL & KCL", "Nodal & Mesh Analysis", "Superposition & Thevenin", "Op-Amps", "RC, RL, RLC Transient Response"],
    recommendedSchedule: {
      days: ["Monday", "Wednesday", "Friday"],
      timeStart: "14:00",
      timeEnd: "16:30",
      cognitiveLoad: "Ağır Teori & Problem Set",
      color: "#0284c7"
    }
  },
  {
    id: "mit-6004x",
    code: "MIT 6.004x",
    title: "Computation Structures: Digital Circuits & CPU Architecture",
    provider: "MITx / edX (Prof. Chris Terman)",
    category: "eee",
    categoryName: "Elektrik-Elektronik & Donanım",
    difficulty: "Orta - Zor",
    durationWeeks: 10,
    estimatedHoursPerWeek: 7,
    cost: "Ücretsiz Audit / Sertifika",
    url: "https://6004.mit.edu/",
    badgeColor: "#ec4899",
    description: "Transistör seviyesinden mantık kapıları, ALU, RISC-V işlemci mimarisi, pipelining ve assembly.",
    topics: ["CMOS Gates", "Sequential Logic & FSM", "ALU Design", "RISC-V CPU Architecture", "Caches"],
    recommendedSchedule: {
      days: ["Thursday", "Saturday"],
      timeStart: "14:00",
      timeEnd: "16:30",
      cognitiveLoad: "Sayısal Tasarım & Simülasyon",
      color: "#ec4899"
    }
  },
  {
    id: "mit-802x",
    code: "MIT 8.02x",
    title: "Physics II: Electricity and Magnetism (Fizik II)",
    provider: "MITx / MIT OCW (Prof. Walter Lewin)",
    category: "physics",
    categoryName: "Fizik & Alan Teorisi",
    difficulty: "Zor",
    durationWeeks: 12,
    estimatedHoursPerWeek: 8,
    cost: "Ücretsiz İnceleme / Sertifika",
    url: "https://ocw.mit.edu/courses/8-02sc-physics-ii-electricity-and-magnetism-fall-2010/",
    badgeColor: "#f59e0b",
    description: "Elektrik alanlar, Gauss yasası, manyetik alanlar, Biot-Savart, Faraday indüksiyon ve Maxwell denklemleri.",
    topics: ["Gauss's Law", "Capacitance", "Ampere's & Faraday's Law", "Maxwell's Equations", "EM Waves"],
    recommendedSchedule: {
      days: ["Tuesday", "Friday"],
      timeStart: "16:00",
      timeEnd: "18:30",
      cognitiveLoad: "Fizik & Teori",
      color: "#f59e0b"
    }
  },

  // --- MATEMATİK & KALKÜLÜS (Tüm Alanlar İçin Temel) ---
  {
    id: "mit-1801x",
    code: "MIT 18.01x / 18.01SC",
    title: "Single Variable Calculus (Tek Değişkenli Türev ve İntegral)",
    provider: "MIT OpenCourseWare / edX (Prof. David Jerison)",
    category: "math",
    categoryName: "Mühendislik & Temel Matematik",
    difficulty: "Orta (Kritik Altyapı)",
    durationWeeks: 12,
    estimatedHoursPerWeek: 6,
    cost: "Tamamen Ücretsiz (MIT OCW) / edX Sertifika",
    url: "https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/",
    badgeColor: "#10b981",
    description: "Türev kavramı, limit, diferansiyel denklemler, integrasyon teknikleri ve Taylor serileri.",
    topics: ["Differentiation & Chain Rule", "Optimization", "Fundamental Theorem of Calculus", "Integration Techniques", "Taylor Series"],
    recommendedSchedule: {
      days: ["Tuesday", "Thursday", "Saturday"],
      timeStart: "10:00",
      timeEnd: "12:00",
      cognitiveLoad: "Matematik & Problem Set",
      color: "#10b981"
    }
  },
  {
    id: "mit-1802x",
    code: "MIT 18.02x / 18.02SC",
    title: "Multivariable Calculus (Çok Değişkenli Analiz)",
    provider: "MIT OpenCourseWare / edX (Prof. Denis Auroux)",
    category: "math",
    categoryName: "Mühendislik & İleri Matematik",
    difficulty: "Zor (İleri Matematik)",
    durationWeeks: 12,
    estimatedHoursPerWeek: 7,
    cost: "Ücretsiz Açık Kaynak / Sertifika",
    url: "https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/",
    badgeColor: "#8b5cf6",
    description: "Vektör analizi, kısmi türevler, gradyan, diverjans, rotasyonel (curl), çift/üçlü integraller, Green & Stokes.",
    topics: ["Vectors & Gradient", "Partial Derivatives", "Double & Triple Integrals", "Green's & Stokes' Theorem"],
    recommendedSchedule: {
      days: ["Monday", "Wednesday"],
      timeStart: "17:00",
      timeEnd: "19:00",
      cognitiveLoad: "Ağır Teori & Vektör Analizi",
      color: "#8b5cf6"
    }
  },
  {
    id: "stanford-linear-algebra",
    code: "Stanford / DeepLearning.AI",
    title: "Mathematics for Machine Learning: Linear Algebra",
    provider: "Coursera / Stanford Online",
    category: "math",
    categoryName: "Matematik & Lineer Cebir",
    difficulty: "Orta",
    durationWeeks: 6,
    estimatedHoursPerWeek: 5,
    cost: "Ücretsiz Audit / Sertifika",
    url: "https://www.coursera.org/learn/linear-algebra-machine-learning",
    badgeColor: "#14b8a6",
    description: "Matris dönüşümleri, özdeğerler (eigenvalues), özvektörler (eigenvectors) ve SVD analizi.",
    topics: ["Linear Systems", "Eigenvalues & Eigenvectors", "Singular Value Decomposition (SVD)"],
    recommendedSchedule: {
      days: ["Sunday"],
      timeStart: "10:00",
      timeEnd: "13:00",
      cognitiveLoad: "Matematik & Lineer Cebir",
      color: "#14b8a6"
    }
  },

  // --- TIP & DOKTORLUK / SAĞLIK BİLİMLERİ ---
  {
    id: "stanford-anatomy",
    code: "Stanford Med",
    title: "Anatomy: Cardiovascular, Respiratory & Urinary Systems",
    provider: "Stanford Medicine Online / Coursera",
    category: "medicine",
    categoryName: "Tıp & Anatomi",
    difficulty: "Orta - Zor",
    durationWeeks: 8,
    estimatedHoursPerWeek: 6,
    cost: "Ücretsiz Audit / Sertifika",
    url: "https://www.coursera.org/learn/anatomy",
    badgeColor: "#ef4444",
    description: "İnsan anatomisi, kardiyovasküler sistem, akciğer mekaniği, boşaltım sistemi ve klinik vaka analizleri.",
    topics: ["Cardiovascular System", "Respiratory Dynamics", "Renal & Urinary Anatomy", "Clinical Case Studies"],
    recommendedSchedule: {
      days: ["Monday", "Wednesday", "Friday"],
      timeStart: "14:00",
      timeEnd: "16:00",
      cognitiveLoad: "Tıp Teorisi & Anatomi",
      color: "#ef4444"
    }
  },
  {
    id: "harvard-biochem",
    code: "HarvardX",
    title: "Principles of Biochemistry: Cellular Energy & Metabolism",
    provider: "Harvard University / edX",
    category: "medicine",
    categoryName: "Tıp & Biyokimya",
    difficulty: "Zor (Tıbbi Biyokimya)",
    durationWeeks: 10,
    estimatedHoursPerWeek: 7,
    cost: "Ücretsiz Audit / Sertifika",
    url: "https://www.edx.org/learn/biochemistry/harvard-university-principles-of-biochemistry",
    badgeColor: "#dc2626",
    description: "Enzim kinetiği, hücresel metabolizma, glikoliz, Krebs döngüsü, protein yapıları ve farmakolojik hedefler.",
    topics: ["Enzyme Kinetics", "Metabolic Pathways", "Protein Structure", "Cellular Respiration"],
    recommendedSchedule: {
      days: ["Tuesday", "Thursday"],
      timeStart: "15:00",
      timeEnd: "17:30",
      cognitiveLoad: "Biyokimya & Moleküler Tıp",
      color: "#dc2626"
    }
  },
  {
    id: "jhu-biostats",
    code: "Johns Hopkins",
    title: "Biostatistics in Public Health & Clinical Trials",
    provider: "Johns Hopkins University / Coursera",
    category: "medicine",
    categoryName: "Tıp & Biyoistatistik",
    difficulty: "Orta",
    durationWeeks: 6,
    estimatedHoursPerWeek: 5,
    cost: "Ücretsiz Audit / Sertifika",
    url: "https://www.coursera.org/learn/biostatistics",
    badgeColor: "#fb7185",
    description: "Klinik deneyler, epidemiyolojik modelleme, p-değeri, hipotez testleri ve tıbbi araştırma analizi.",
    topics: ["Hypothesis Testing", "Confidence Intervals", "Regression in Medicine", "Clinical Trial Design"],
    recommendedSchedule: {
      days: ["Saturday", "Sunday"],
      timeStart: "10:00",
      timeEnd: "12:30",
      cognitiveLoad: "Biyoistatistik & Analiz",
      color: "#fb7185"
    }
  },
  {
    id: "upenn-med-english",
    code: "UPenn / Med",
    title: "English for Healthcare & Medical Professionals",
    provider: "University of Pennsylvania / Coursera",
    category: "english",
    categoryName: "Tıbbi İngilizce & Dil",
    difficulty: "Başlangıç - Orta",
    durationWeeks: 6,
    estimatedHoursPerWeek: 3,
    cost: "Ücretsiz Audit / Sertifika",
    url: "https://www.coursera.org/learn/medical-english",
    badgeColor: "#06b6d4",
    description: "Hasta öyküsü alma (anamnez), medikal terminoloji, tıp makaleleri okuma ve uluslararası hasta iletişimi.",
    topics: ["Medical Terminology", "Patient History & Exam", "Clinical Documentation", "Research Paper Reading"],
    recommendedSchedule: {
      days: ["Monday", "Wednesday", "Friday"],
      timeStart: "08:30",
      timeEnd: "09:15",
      cognitiveLoad: "Tıbbi İngilizce",
      color: "#06b6d4"
    }
  },

  // --- YAZILIM, CS & YAPAY ZEKA ---
  {
    id: "harvard-cs50",
    code: "Harvard CS50x",
    title: "CS50: Introduction to Computer Science",
    provider: "Harvard University / edX (Prof. David J. Malan)",
    category: "cs_ai",
    categoryName: "Yazılım & Bilgisayar Bilimi",
    difficulty: "Zor (Dünyanın En Ünlü Dersi)",
    durationWeeks: 11,
    estimatedHoursPerWeek: 9,
    cost: "Tamamen Ücretsiz Sertifika Seçenekli",
    url: "https://cs50.harvard.edu/x/",
    badgeColor: "#e11d48",
    description: "Algoritmalar, C programlama dili, bellek yönetimi, veri yapıları, Python, SQL ve web geliştirme.",
    topics: ["Computational Thinking", "Memory & Pointers in C", "Data Structures", "Python & SQL", "Algorithms"],
    recommendedSchedule: {
      days: ["Monday", "Wednesday", "Friday"],
      timeStart: "14:00",
      timeEnd: "16:30",
      cognitiveLoad: "Yazılım & Problem Çözümü",
      color: "#e11d48"
    }
  },
  {
    id: "stanford-machine-learning",
    code: "Stanford ML",
    title: "Machine Learning Specialization",
    provider: "Stanford Online / DeepLearning.AI (Andrew Ng)",
    category: "cs_ai",
    categoryName: "Yapay Zeka & ML",
    difficulty: "Orta - Zor",
    durationWeeks: 9,
    estimatedHoursPerWeek: 7,
    cost: "Ücretsiz Audit / Sertifika",
    url: "https://www.coursera.org/specializations/machine-learning-introduction",
    badgeColor: "#6366f1",
    description: "Denetimli/Denetimsiz öğrenme, Sinir Ağları (Neural Networks), Karar Ağaçları ve Pekiştirmeli Öğrenme.",
    topics: ["Linear & Logistic Regression", "Neural Networks", "Decision Trees & Random Forests", "Clustering & PCA"],
    recommendedSchedule: {
      days: ["Tuesday", "Thursday", "Saturday"],
      timeStart: "15:00",
      timeEnd: "17:00",
      cognitiveLoad: "Yapay Zeka & Kodlama",
      color: "#6366f1"
    }
  },
  {
    id: "mit-6006-algo",
    code: "MIT 6.006",
    title: "Introduction to Algorithms (Veri Yapıları ve Algoritmalar)",
    provider: "MIT OpenCourseWare (Prof. Erik Demaine)",
    category: "cs_ai",
    categoryName: "Yazılım & Algoritmalar",
    difficulty: "Zor (Kritik Mühendislik Becerisi)",
    durationWeeks: 12,
    estimatedHoursPerWeek: 8,
    cost: "Tamamen Ücretsiz (MIT OCW)",
    url: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/",
    badgeColor: "#8b5cf6",
    description: "Sıralama algoritmaları, ikili arama ağaçları, AVL, graf algoritmaları (Dijkstra, Bellman-Ford) ve dinamik programlama.",
    topics: ["Sorting & Trees", "Hashing & Heaps", "Graph Traversal & Shortest Path", "Dynamic Programming"],
    recommendedSchedule: {
      days: ["Tuesday", "Thursday"],
      timeStart: "17:30",
      timeEnd: "20:00",
      cognitiveLoad: "Algoritma & Kodlama",
      color: "#8b5cf6"
    }
  },

  // --- İNGİLİZCE & STEM DİL EĞİTİMİ ---
  {
    id: "eng-stem",
    code: "UPenn STEM",
    title: "English for Science, Technology, Engineering, and Mathematics",
    provider: "University of Pennsylvania / Coursera",
    category: "english",
    categoryName: "Teknik İngilizce & Dil",
    difficulty: "Başlangıç - Orta",
    durationWeeks: 5,
    estimatedHoursPerWeek: 3,
    cost: "Ücretsiz Audit / Sertifika",
    url: "https://www.coursera.org/learn/stem",
    badgeColor: "#06b6d4",
    description: "Mühendislik terimleri, teknik makale okuma, bilimsel araştırma dili ve STEM iletişimi.",
    topics: ["Scientific Method", "Renewable Tech Terms", "Lab Report Writing", "IEEE Paper Reading"],
    recommendedSchedule: {
      days: ["Monday", "Wednesday", "Friday"],
      timeStart: "08:30",
      timeEnd: "09:15",
      cognitiveLoad: "İngilizce & Dinleme",
      color: "#06b6d4"
    }
  },
  {
    id: "bbc-eng",
    code: "BBC 6-Min",
    title: "BBC Learning English: Academic & Daily Fluency",
    provider: "BBC World Service",
    category: "english",
    categoryName: "İngilizce Dinleme & Kelime",
    difficulty: "Kolay - Akıcı",
    durationWeeks: 8,
    estimatedHoursPerWeek: 2,
    cost: "Tamamen Ücretsiz",
    url: "https://www.bbc.co.uk/learningenglish/english/features/6-minute-english",
    badgeColor: "#3b82f6",
    description: "Her gün 15 dakikalık dinleme ve kelime dağarcığı geliştirme ile İngilizce refleksleri hızlandırma.",
    topics: ["Everyday Tech Topics", "Vocabulary Building", "Native Listening Comprehension"],
    recommendedSchedule: {
      days: ["Everyday"],
      timeStart: "08:00",
      timeEnd: "08:25",
      cognitiveLoad: "Hafif & Dinleme",
      color: "#3b82f6"
    }
  }
];
