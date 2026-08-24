//git add . && git commit -m "admin giris sistemi eklendi" && git push
import Link from "next/link";
import Image from "next/image";

// --- BURASI SENİN DÜZENLEYECEĞİN ALAN ---
// Yeni bir başarı eklemek için aşağıdaki süslü parantezli {...} bloğu kopyala,
// bir virgül koy ve altına yapıştır. İstediğin kadar uzatabilirsin.
const successStories = [
  {
    id: 1,
    title: "FENERBAHÇE'YE TRANSFER",
    description: "Bağlarbaşı sk da oynayan sporcum teknik becerileri son derecede yetenekli bir sporcuydu lakin kondisyon ve hız sorunundan kaynaklı çabuk yoruluyor performansı düşüyordu. 8 aylık birlikteliğimizin ardından geçtiğimiz sezon 10 gol atan sporcum bu sezon 28 gol ve asiste ulaştı. Fenerbahçe'nin ve Beşiktaş'ın Scout ekibi sezon bitince takımlarında antrenmana çıkmasını istediler.",
    image: "/ikilikoşu.png", // public klasöründeki fotoğraf adı
    tag: "FENERBAHÇE'YE TRANSFER"
  },
  {
    id: 2,
    title: "BİYOMEKANİK DÜZELTME",
    description: "Koşu sırasında dizlerin dışa kaçma (Varum) problemini 8 haftalık direnç bandı ve kuvvet antrenmanlarıyla çözdük. Artık sakatlık riski olmadan maksimum kuvvet ve sürat antrenmanları yapabiliyor ve gelişim katsayısı hızla artıyor.",
    image: "/dirençbandısıçrama.png",
    tag: "BİYOMEKANİK DÜZELTME"
  },
  // --- YENİ EKLEMEK İÇİN BURADAN AŞAĞISINI KOPYALA ---
  {
    id: 3,
    title: "Kadro dışından ilk 11'e",
    description: "Antalya spor altyapısında olan sporcum geçtiğimiz sezon 9 maçta kadro dışı kaldı, hocası 'performansını yükseltmezsen gelecek sezon kadroda değilsin' demesinin üzerine İstanbul'da yaz boyu haftada 6 gün benimle çalıştı. Bu süreçte dayanıklılığını patlayıcılığı ve son süratini yüksek miktarda geliştirdim. bu sezon her maça ilk 11 çıktı ve takımın en hızlı oyuncusu haline geldi. ",
    image: "/140kg.png", // Fotoğrafın yoksa geçici olarak bunu kullanır
    tag: "Kadro dışından ilk 11'e"
  },
  // --- BURAYA KADAR ---
  {
    id: 4,
    title: "Dikey Sıçrama ve Hava Hakimiyeti",
    description: "Hava toplarında zaafı olan 1.82 boyundaki stoper öğrencimle, 12 haftalık plyometrik ve eksantrik yüklenme antrenmanları uyguladım. Dikey sıçrama mesafesini 14 cm artırarak boy dezavantajını ortadan kaldırdık. Sezonun ikinci yarısında duran toplardan 4 gol bularak takıma büyük katkıda bulundu.",
    image: "/dikeysıçrama.png", // Fotoğrafın yoksa geçici olarak bunu kullanır
    tag: "Dikey Sıçrama ve Hava Hakimiyeti"
  },

  {
    id: 5,
    title: "İlk Adım ve Reaksiyon",
    description: "Tekniği çok iyi olmasına rağmen 'yavaş' olduğu için elit takımların radarına giremeyen öğrencimin ilk 5 metre patlayıcılığı üzerine çalıştık. Sprint mekaniğini baştan aşağı değiştirerek ivmelenme süresini elit seviyeye çektik. Bu sezon 8 gol ve 17 asist yaptı.",
    image: "/koşutogedaaa.jpg", // Fotoğrafın yoksa geçici olarak bunu kullanır
    tag: "İlk Adım ve Reaksiyon"
  },

  {
    id: 6,
    title: "Yüksek Şiddetli Koşu Kapasitesi / Laktik Asit Toleransı",
    description: "Maçın son 20 dakikasında laktik asit eşiği düşük olduğu için oyundan kopan merkez orta saha oyuncumla 4 aylık interval ve dayanıklılık odaklı bir periyot geçirdik. Yüksek şiddetli koşu (High Intensity Running) mesafesini kat ve kat arttırdık, artık maçın 90. dakikasında bile geçiş hücumlarını yönetiyor.",
    image: "/laktikasit.png", // Fotoğrafın yoksa geçici olarak bunu kullanır
    tag: "Laktik Asit Toleransı"
  },

  {
    id: 7,
    title: "Biyomekanik ve Esneklik",
    description: "Düşük esneklik kabiliyeti olan sporcum hareket kısıklılığı nedeniyle kaslarını kuvvetlendiremiyor ve yük dizlerine binip çeşitli hamstring ve diz sakatlık/yaralanmaları yaşıyordu. Acı dolu 8 haftanın ardından hareket kabiliyeti artan sporcum hem patlayıcı güç antrenmanlarımı yapabiliyor ve sakatlıktan korunarak becerilerini sergileyebiliyor. ",
    image: "/Esneklik.png", // Fotoğrafın yoksa geçici olarak bunu kullanır
    tag: "Biyomekanik ve Esneklik"
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-red-900/30 selection:text-white">
      
  {/* ================= HERO SECTION (GÜNCELLENDİ) ================= */}
      {/* h-screen yerine min-h-[90vh] yaptık ki alttaki bölüm biraz gözüksün */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden border-b border-white/5 pb-10">
        
        {/* Arka Plan */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-red-900/10 via-transparent to-[#050505] z-0"></div>
        
        {/* Logo */}
        <div className="relative w-24 h-24 md:w-32 md:h-32 mb-8 z-10 animate-in fade-in zoom-in duration-1000">
          <Image src="/mainlogo.png" alt="Emre Nergiz" fill className="object-contain" priority />
        </div>

        {/* Başlık */}
        <h1 className="text-4xl md:text-7xl font-bold tracking-tighter mb-4 z-10">
          EMRE NERGİZ
        </h1>
        <p className="text-xs md:text-sm font-bold tracking-[0.5em] text-red-500 uppercase mb-8 z-10">
          ELITE PERFORMANCE COACHING
        </p>
        
        {/* Slogan */}
        <p className="max-w-xl text-neutral-400 text-sm md:text-lg leading-relaxed mb-10 z-10">
          Şampiyonlar tesadüfen doğmaz, inşa edilir.<br/>
          Bilimsel analiz ve olimpik tecrübeyle sınırlarını parçala.
        </p>

        {/* Butonlar */}
        <div className="flex flex-col md:flex-row gap-4 w-full max-w-md z-10 mb-12">
          <Link href="/basvuru" className="flex-1 bg-white text-black py-4 rounded-xl font-bold hover:bg-neutral-200 transition-all text-center">
            Özel Ders Başvurusu
          </Link>
          <a href="https://randevu.emrenergizperformance.com" target="_blank" className="flex-1 border border-white/20 bg-white/5 backdrop-blur-sm text-white py-4 rounded-xl font-bold hover:bg-white/10 transition-all text-center">
            Randevu Al
          </a>
        </div>

        {/* --- YILAN İNİŞ ANİMASYONU --- */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
           <span className="text-[9px] uppercase tracking-widest text-neutral-500 animate-pulse">Kaydır</span>
           {/* Yılan S Ok */}
           <svg 
             width="24" 
             height="40" 
             viewBox="0 0 24 40" 
             fill="none" 
             className="animate-bounce" // Zıplama efekti
             xmlns="http://www.w3.org/2000/svg"
           >
             {/* Yılanın Gövdesi (S Şekli) */}
             <path 
               d="M12 2C12 2 8 6 8 10C8 14 16 16 16 20C16 24 12 28 12 28" 
               stroke="#EF4444" // Kırmızı renk (Markana uygun)
               strokeWidth="2" 
               strokeLinecap="round"
             />
             {/* Ok Ucu */}
             <path 
               d="M8 26L12 30L16 26" 
               stroke="#EF4444" 
               strokeWidth="2" 
               strokeLinecap="round" 
               strokeLinejoin="round"
             />
           </svg>
        </div>

      </section>


      {/* ================= HAKKIMDA (SADE & ŞIK) ================= */}
      <section className="py-24 px-6 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
            {/* Fotoğraf Alanı */}
            <div className="relative w-full md:w-5/12 aspect-[3/4] transition-all duration-700">
              <div className="absolute inset-0 border border-white/10 rounded-sm translate-x-3 translate-y-3 z-0"></div>
              <div className="relative h-full w-full bg-neutral-900 overflow-hidden border border-white/10 z-10">
                {/* Profil Fotonu 'profil.jpg' olarak public klasörüne at */}
                <Image src="/run.jpeg" alt="Emre Nergiz" fill className="object-cover" />
              </div>
            </div>

            {/* Yazı Alanı */}
            <div className="w-full md:w-7/12 text-left">
              <span className="text-red-500 font-bold tracking-widest text-xs uppercase mb-4 block">Hakkımda</span>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
                SAHADAN GELEN <br/> <span className="text-neutral-500">OLİMPİK TECRÜBE.</span>
              </h2>
              <div className="space-y-6 text-neutral-400 text-sm md:text-base leading-relaxed font-light">
                <p>
                  Marmara Üniversitesi Spor Bilimleri mezunu, Fenerbahçe ve <strong>Milli Takım ve Olimpik Kadro</strong> sporcusuyum. 
                  100m ve 400m Engel branşında kazandığım <strong>86 Madalya ve 24 Kupa</strong> ile profesyonel sporculuk kariyerimi sonlandırdım.
                </p>
                <p>
                  Şimdi ise sahada kazandığım tecrübeyi, akademik verilerle birleştirerek yeni nesil sporculara aktarıyorum. 
                  Amacım sadece antrenman yaptırmak değil; sporcunun kariyerini, fiziğini ve mentalitesini profesyonel seviyeye ulaştırmak.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ================= BAŞARI VİTRİNİ (COPY-PASTE YAPISI) ================= */}
      <section className="py-24 px-6 bg-[#050505] border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          
          <div className="text-center mb-16">
            <span className="text-red-500 font-bold tracking-[0.3em] text-[10px] uppercase">SONUÇ ODAKLI</span>
            <h2 className="text-2xl md:text-4xl font-bold mt-2 text-white">BAŞARI HİKAYELERİ</h2>
            
            {/* EKLENEN KISIM: Silik Uyarı Metni */}
            <p className="text-[10px] text-white/40 mt-3 font-light italic tracking-wide">
...            </p>
          </div>

          <div className="flex flex-col gap-24">
            {successStories.map((story, index) => (
              <div key={story.id} className="group relative">
                
                {/* Dikey Çizgi (Timeline Efekti) */}
                {index !== successStories.length - 1 && (
                  <div className="absolute left-1/2 bottom-[-96px] w-px h-24 bg-gradient-to-b from-white/20 to-transparent -translate-x-1/2 hidden md:block"></div>
                )}

                {/* Kart Yapısı */}
                <div className="relative bg-[#0a0a0a] border border-white/10 p-2 md:p-4 rounded-2xl md:rounded-3xl hover:border-white/20 transition-colors duration-500">
                  
                  {/* Fotoğraf */}
                  {/* aspect-[4/5] yaparak tam Instagram dikey post boyutuna getirdik */}
                    <div className="relative w-full aspect-[4/5] md:aspect-[4/5] max-w-md mx-auto rounded-xl md:rounded-2xl overflow-hidden mb-6 md:mb-8 bg-neutral-900 border border-white/10 shadow-2xl">
                    <Image 
                      src={story.image} 
                      alt={story.title} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {/* Etiket */}
                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                      <span className="text-[10px] font-bold text-white tracking-widest uppercase">{story.tag}</span>
                    </div>
                  </div>

                  {/* İçerik */}
                  <div className="px-2 md:px-4 pb-4 text-center md:text-left">
                    <h3 className="text-xl md:text-3xl font-bold text-white mb-3 uppercase tracking-tight">{story.title}</h3>
                    <p className="text-neutral-400 text-sm md:text-base leading-relaxed">{story.description}</p>
                  </div>

                </div>
              </div>
            ))}
          </div>
          
          {/* Alt Mesaj */}
          <div className="mt-24 text-center">
            <p className="text-neutral-500 text-sm mb-6">Sıradaki başarı hikayesi senin olabilir.</p>
            <Link href="/basvuru" className="inline-block border-b border-white text-white pb-1 hover:text-red-500 hover:border-red-500 transition-colors">
              Başvuru Yap →
            </Link>
          </div>

        </div>
      </section>


      {/* ================= FOOTER ================= */}
      <footer className="py-12 border-t border-white/5 text-center bg-[#0a0a0a]">
        <div className="flex justify-center mb-4 opacity-30 grayscale">
           <div className="relative w-6 h-6"><Image src="/logo.png" alt="Logo" fill className="object-contain"/></div>
        </div>
        <p className="text-[10px] text-neutral-600 uppercase tracking-widest">
          © 2026 Emre Nergiz Performance.
        </p>
      </footer>

    </div>
  );
}