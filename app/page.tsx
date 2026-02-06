import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-red-900/30 selection:text-white">
      
      {/* HERO SECTION */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        {/* Arka Plan */}
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
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates, laboriosam!
        </p>

        {/* Butonlar */}
        <div className="flex flex-col md:flex-row gap-4 w-full max-w-md z-10">
          {/* Başvuru Butonu -> Bizim formumuza gider */}
          <Link 
            href="/basvuru" 
            className="flex-1 bg-white text-black py-4 rounded-xl font-bold hover:bg-neutral-200 transition-all text-center"
          >
            Özel Ders Başvurusu
          </Link>
          
          {/* Randevu Butonu -> Aşağıdaki ayarla diğer projeye gidecek */}
          <Link 
            href="/randevu" 
            className="flex-1 border border-white/20 bg-white/5 backdrop-blur-sm text-white py-4 rounded-xl font-bold hover:bg-white/10 transition-all text-center"
          >
            Randevu Al
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-white/5 text-center bg-[#0a0a0a]">
        <p className="text-xs text-neutral-600 uppercase tracking-widest">
          © 2026 Emre Nergiz Performance.
        </p>
      </footer>
    </div>
  );
}