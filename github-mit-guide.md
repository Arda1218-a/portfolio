# MIT Admissions & Maker Portfolio - GitHub Yayınlama ve Dokümantasyon Rehberi

Bu rehber, geliştirdiğiniz 4 mühendislik projesini GitHub'da dünya standartlarında yayınlamanız ve MIT "Maker Portfolio" başvurusunda en yüksek etkiyi yaratmanız için hazırlanmıştır.

---

## 📌 1. Projeleri GitHub'a Yükleme Stratejisi

MIT ve üst düzey üniversitelerin teknik inceleme jürileri projelere şu 4 ana başlıkta bakar:
1. **Temiz Repository Yapısı**: Kodlar, devre şemaları, simülasyon ve README düzeni.
2. **Commit Disiplini**: Projenin aşama aşama nasıl geliştiğini gösteren anlamlı commit mesajları.
3. **Problem & Sistem Mimarisi Açıklaması**: "Neden yapıldı, hangi problemi çözüyor, hangi formüller/sensörler kullanıldı?"
4. **Human-AI Co-Engineering Şeffaflığı**: Yapay zekayı bir mühendislik çarpanı (multiplier) olarak nasıl kullandığınızı açıklayan dürüst metodoloji bölümü.

---

## 📁 2. Örnek Repository Klasör Düzeni

Her projeniz için şu yapıyı kullanmanız tavsiye edilir:

```
sustainable-water-management/
├── README.md               # Proje ana tanıtım belgesi (Aşağıdaki şablonu kullanın)
├── LICENSE                 # MIT License
├── docs/
│   ├── schematics/         # Fritzing / KiCad devre şemaları (PDF/PNG)
│   ├── architecture.png    # Sistem akış şeması
│   └── test-results.csv    # Sensör kalibrasyon ve test ölçümleri
├── firmware/
│   ├── src/                # ESP32 / Arduino C++ kodları
│   └── include/
└── dashboard/              # Web arayüzü ve simülasyon kodları
```

---

## 📝 3. MIT Standardında README.md Şablonu

Aşağıdaki şablonu her projenizin GitHub ana sayfasına (`README.md`) kopyalayıp ilgili projenin bilgileriyle doldurabilirsiniz:

```markdown
# 💧 Sürdürülebilir Evsel Su Atık Yönetimi & Gri Su Geri Kazanımı
> **Residential Greywater Recycling & Real-Time Sensor Fusion IoT System**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Hardware: ESP32](https://img.shields.io/badge/Hardware-ESP32-red.svg)](https://espressif.com)
[![Wokwi Simulator](https://img.shields.io/badge/Wokwi-Live%20Simulation-brightgreen.svg)](https://wokwi.com/projects/471876742093742081)
[![Status: Functional Prototype](https://img.shields.io/badge/Status-Functional%20Prototype-success.svg)]()

## ⚡ Canlı Donanım Simülasyonu (Live Circuit)
Projeyi hiçbir fiziksel donanıma ihtiyaç duymadan tarayıcınızda doğrudan çalıştırmak için:
👉 **[Wokwi Canlı Simülasyonunu Başlat](https://wokwi.com/projects/471876742093742081)**

## 🎯 Projenin Amacı ve Problem Tanımı (Motivation)
Dünya genelinde evsel temiz suyun %40'ı tuvalet rezervuarlarında ve peyzaj sulamasında tüketilmektedir. Bu proje, lavabo ve duşlardan çıkan gri suyu TDS ve Bulanıklık sensörleriyle gerçek zamanlı analiz ederek temizliğine göre 3 kademeli selenoid vana ile rezervuara veya sulamaya yönlendiren otonom bir IoT ekosistemidir.

## 🤝 Mühendislik Metodolojisi & Yapay Zeka İş Bölümü (Human-AI Co-Engineering)
- **Sistem Mimarı (Benim Rolüm):** Problem tespiti, 3 kademeli vana yönlendirme mantığı, sensör yerleşimi (TDS, Turbidity, HC-SR04) ve donanım bileşenlerinin seçimi.
- **Yapay Zeka Rolü (AI Pair Engineer):** Sensör veri kalibrasyonu matematiksel modelleri, FreeRTOS durum makineleri ve web telemetri simülasyon kodlarının optimizasyonu.

## 🔧 Donanım & Sensörler (Hardware BOM)
- ESP32 DevKit V1
- Analog TDS Sensörü (0-1000 ppm)
- Bulanıklık (Turbidity) Sensörü
- Ultrasonik Seviye Sensörü (HC-SR04)
- 12V Selenoid Vana Grubu (3x) + Röle Modülü
- Aktif Karbon & Kum Filtrasyon Ünitesi

## 📊 Ölçümlenen Sonuçlar & Metrikler
- **Su Tasarrufu:** Hanede %38 - %42 ölçümlenen tasarruf
- **TDS Filtrasyon Başarısı:** >%75 partikül azaltımı
- **Sistem Tepki Süresi:** <150 ms vana anahtarlama gecikmesi

## 🚀 Kurulum ve Çalıştırma
```bash
git clone https://github.com/your-username/sustainable-water-management.git
# Arduino IDE veya PlatformIO ile ESP32 kartınıza yükleyin
```
```

---

## 💡 4. MIT Maker Portfolio Başvurusu İçin İpuçları

1. **Kısa Video Çekin (90 saniye - 2 dakika)**:
   - Prototipin başında durup sistemi kısaca tanıtın.
   - Sitedeki canlı simülatörü ve çalışan fiziksel kartı gösterin.
2. **Sitedeki Portföy Linkini Paylaşın**:
   - Portföy sitenizi GitHub Pages veya Vercel/Netlify üzerinden ücretsiz canlıya alıp başvuru formuna `https://your-name.github.io/portfolio` linkini ekleyin.
3. **Neden-Nasıl Açıklaması**:
   - MIT *"Her şeyi mükemmel yaptım"* diyenleri değil; *"Şu problemle karşılaştım, sensör gürültü yaptı, ben de filtre ekledim, yapay zekadan da kod optimizasyonu desteği aldım"* diyen öğrenmeye açık araştırmacıları sever.
