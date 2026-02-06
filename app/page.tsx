import Link from "next/link";
import Image from "next/image";

// --- BURASI SENİN DÜZENLEYECEĞİN ALAN ---
// Yeni bir başarı eklemek için aşağıdaki süslü parantezli {...} bloğu kopyala,
// bir virgül koy ve altına yapıştır. İstediğin kadar uzatabilirsin.
const successStories = [
  {
    id: 1,
    title: "FENERBAHÇE'YE TRANSFER",
    description: "X Mahalle Kulübü Elite Lig'den aldığımız sporcumuzu, 6 aylık patlayıcı güç ve teknik antrenman programı sonucunda Fenerbahçe Spor Kulübü'ne transfer ettik.",
    image: "/student1.jpg", // public klasöründeki fotoğraf adı
    tag: "KARİYER YÖNETİMİ"
  },
  {
    id: 2,
    title: "BİYOMEKANİK DÜZELTME",
    description: "Koşu sırasında dizlerin içe kaçma (Valgus) problemini 8 haftalık düzeltici egzersiz serisiyle çözdük. Artık sakatlık riski olmadan maksimum hızına ulaşıyor.",
    image: "/student2.jpg",
    tag: "SAKATLIK ÖNLEME"
  },
  // --- YENİ EKLEMEK İÇİN BURADAN AŞAĞISINI KOPYALA ---
  {
    id: 3,
    title: "100M DERECE GELİŞİMİ",
    description: "12.4 saniye ile başladığımız serüvende, reaksiyon ve top speed çalışmalarıyla 11.1 saniye barajını kırdık.",
    image: "/student1.jpg", // Fotoğrafın yoksa geçici olarak bunu kullanır
    tag: "HIZ GELİŞİMİ"
  },
  // --- BURAYA KADAR ---
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-red-900/30 selection:text-white">
      
      {/* ================= HERO SECTION (DOKUNULMADI) ================= */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden border-b border-white/5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-red-900/10 via-transparent to-[#050505] z-0"></div>
        
        <div className="relative w-24 h-24 md:w-32 md:h-32 mb-8 z-10 animate-in fade-in zoom-in duration-1000">
          <Image src="/logo.png" alt="Emre Nergiz" fill className="object-contain" priority />
        </div>

        <h1 className="text-4xl md:text-7xl font-bold tracking-tighter mb-4 z-10">
          EMRE NERGİZ
        </h1>
        <p className="text-xs md:text-sm font-bold tracking-[0.5em] text-red-500 uppercase mb-8 z-10">
          ELITE PERFORMANCE COACHING
        </p>
        
        <p className="max-w-xl text-neutral-400 text-sm md:text-lg leading-relaxed mb-10 z-10">
          Şampiyonlar tesadüfen doğmaz, inşa edilir.<br/>
          Bilimsel analiz ve olimpik tecrübeyle sınırlarını parçala.
        </p>

        <div className="flex flex-col md:flex-row gap-4 w-full max-w-md z-10">
          <Link href="/basvuru" className="flex-1 bg-white text-black py-4 rounded-xl font-bold hover:bg-neutral-200 transition-all text-center">
            Özel Ders Başvurusu
          </Link>
          <a href="https://randevu.emrenergizperformance.com" target="_blank" className="flex-1 border border-white/20 bg-white/5 backdrop-blur-sm text-white py-4 rounded-xl font-bold hover:bg-white/10 transition-all text-center">
            Randevu Al
          </a>
        </div>
      </section>


      {/* ================= HAKKIMDA (SADE & ŞIK) ================= */}
      <section className="py-24 px-6 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
            {/* Fotoğraf Alanı */}
            <div className="relative w-full md:w-5/12 aspect-[3/4] grayscale hover:grayscale-0 transition-all duration-700">
              <div className="absolute inset-0 border border-white/10 rounded-sm translate-x-3 translate-y-3 z-0"></div>
              <div className="relative h-full w-full bg-neutral-900 overflow-hidden border border-white/10 z-10">
                {/* Profil Fotonu 'profil.jpg' olarak public klasörüne at */}
                <Image src="/profil.jpg" alt="Emre Nergiz" fill className="object-cover" />
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
                  Marmara Üniversitesi Spor Bilimleri mezunu ve <strong>Milli Takım Olimpik kadro</strong> sporcusuyum. 
                  400m Engel branşında kazandığım <strong>86 Madalya ve 24 Kupa</strong> ile profesyonel sporculuk kariyerimi taçlandırdım.
                </p>
                <p>
                  Şimdi ise sahada kazandığım bu "Elit" tecrübeyi, bilimsel verilerle birleştirerek yeni nesil sporculara aktarıyorum. 
                  Amacım sadece antrenman yaptırmak değil; sporcunun kariyerini, fiziğini ve mentalitesini profesyonel seviyeye taşımak.
                </p>
              </div>
              
              {/* İmza / İsim */}
              <div className="mt-10 pt-10 border-t border-white/5">
                <p className="font-handwriting text-2xl opacity-80">Emre Nergiz</p>
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
            <h2 className="text-2xl md:text-4xl font-bold mt-2">BAŞARI HİKAYELERİ</h2>
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
                  <div className="relative w-full aspect-video md:aspect-[21/9] rounded-xl md:rounded-2xl overflow-hidden mb-6 md:mb-8 bg-neutral-900">
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