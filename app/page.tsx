import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-red-900/30 selection:text-white">
      
      {/* --- HERO SECTION (Giriş) --- */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        {/* Arka Plan Efekti */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-red-900/10 via-transparent to-[#050505] z-0"></div>
        
        {/* Logo */}
        <div className="relative w-24 h-24 md:w-32 md:h-32 mb-8 z-10 animate-in fade-in zoom-in duration-1000">
          <Image src="/logo.png" alt="Emre Nergiz" fill className="object-contain" priority />
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
          Sıradan antrenmanlarla şampiyon olunmaz. <br/>
          Bilimsel analiz, olimpik tecrübe ve elit programlama.
        </p>

        {/* Butonlar */}
        <div className="flex flex-col md:flex-row gap-4 w-full max-w-md z-10">
          <Link 
            href="/basvuru" 
            className="flex-1 bg-white text-black py-4 rounded-xl font-bold hover:bg-neutral-200 transition-all text-center"
          >
            Özel Ders Başvurusu
          </Link>
          
          {/* RANDEVU LİNKİ: Buraya kendi randevu sisteminin linkini yapıştır */}
          <a 
            href="https://randevu-sisteminin-linki.com" 
            target="_blank"
            className="flex-1 border border-white/20 bg-white/5 backdrop-blur-sm text-white py-4 rounded-xl font-bold hover:bg-white/10 transition-all text-center"
          >
            Randevu Al
          </a>
        </div>
      </section>


      {/* --- ABOUT SECTION (Kimdir?) --- */}
      <section className="py-24 px-6 border-t border-white/5 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12 items-center">
          {/* Fotoğraf Alanı (Kendi fotonu public klasörüne 'profil.jpg' olarak atarsan buraya gelir) */}
          <div className="w-full md:w-1/2 aspect-[3/4] bg-neutral-900 rounded-2xl relative overflow-hidden border border-white/5">
            {/* Buraya fotoğrafını koymak istersen Image componentini açabilirsin */}
            <div className="absolute inset-0 flex items-center justify-center text-neutral-700 font-bold text-xs uppercase tracking-widest">
              Fotoğraf Alanı
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold mb-6 text-white">Kimdir?</h2>
            <div className="space-y-4 text-neutral-400 text-sm leading-relaxed">
              <p>
                Marmara Üniversitesi Spor Bilimleri son sınıf öğrencisi ve Milli Takım Olimpik kadro sporcusuyum. 
                400m Engel branşında <strong>86 Madalya ve 24 Kupa</strong> ile kariyerimi taçlandırdım.
              </p>
              <p>
                Artık sahada kazandığım tecrübeyi, bilimin ışığında yeni nesil sporculara aktarıyorum. 
                Hedefin sadece terlemek değil, sınırlarını parçalamaksa doğru yerdesin.
              </p>
            </div>

            {/* İstatistikler */}
            <div className="grid grid-cols-3 gap-4 mt-8 border-t border-white/10 pt-8">
              <div>
                <span className="block text-2xl font-bold text-white">86</span>
                <span className="text-[10px] uppercase text-neutral-500 tracking-wider">Madalya</span>
              </div>
              <div>
                <span className="block text-2xl font-bold text-white">24</span>
                <span className="text-[10px] uppercase text-neutral-500 tracking-wider">Kupa</span>
              </div>
              <div>
                <span className="block text-2xl font-bold text-white">4.6K+</span>
                <span className="text-[10px] uppercase text-neutral-500 tracking-wider">Takipçi</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-12 border-t border-white/5 text-center">
        <div className="flex justify-center mb-4 opacity-50">
           <div className="relative w-8 h-8"><Image src="/logo.png" alt="Logo" fill className="object-contain"/></div>
        </div>
        <p className="text-xs text-neutral-600 uppercase tracking-widest">
          © 2026 Emre Nergiz Performance.
        </p>
      </footer>

    </div>
  );
}