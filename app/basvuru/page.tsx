"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
// DİKKAT: Dosyan 'basvuru' klasöründeyse "../supabase", ana klasördeyse "./supabase" yap.
import { supabase } from "../supabase"; 

// --- TİPLER ---
type FormStep = {
  id: number;
  question: string;
  type: "text" | "email" | "phone" | "select" | "number";
  options?: string[];
  placeholder?: string;
  key: string;
  note?: string;
};

type Lead = {
  id: number;
  name: string;
  age: number;
  package: string | null;
  goal: string;
  phone: string;
  instagram: string;
  created_at: string;
};

// --- SORULAR ---
const steps: FormStep[] = [
  { id: 1, question: "Önce tanışalım, ismin nedir?", type: "text", placeholder: "Adın Soyadın...", key: "name" },
  { id: 2, question: "Kaç yaşındasın?", type: "number", placeholder: "Örn: 17", key: "age" },
  { id: 3, question: "Sana ulaşabileceğimiz telefon numarası?", type: "phone", placeholder: "05XX XXX XX XX", key: "phone" },
  { id: 4, question: "Instagram kullanıcı adınız?", type: "text", placeholder: "@kullaniciadi", key: "instagram" },
  { id: 5, question: "Ana hedefin nedir?", type: "text", placeholder: "Örn: Hızlanmak, Profesyonel olmak...", key: "goal" },
  { 
    id: 6, 
    question: "Atletik gelişimin için planladığın tahmini bütçe aralığı nedir?", 
    type: "select", 
    options: [
      "Tek derslik bütçe (Ort. 2.000₺ - 2.500₺)", 
      "10 derslik bütçe (Ort. 15.000₺ - 17.500₺)", 
      "15 derslik bütçe (Ort. 20.000₺ - 23.000₺)",
      "Çıkış Yap" // Fiyatı görüp kaçanları yakalamak için tuzak
    ], 
    key: "package",
    note: "📍 Antrenman Yeri: İstanbul Maltepe Kenan Onuk Atletizm Pisti\n\n⚠️ Not: Bu bir fiyat listesi değildir. Hedeflerinize en uygun çalışma programını belirleyebilmemiz için doldurulan tahmini bütçe anketidir."
  },
];

// --- LOGO BİLEŞENİ ---
const BrandLogo = () => (
  <div className="flex items-center gap-4 select-none mb-6">
    <div className="relative w-12 h-12 md:w-14 md:h-14 shrink-0">
      <Image src="/logo.png" alt="Emre Nergiz Logo" fill className="object-contain" priority />
    </div>
    <div className="flex flex-col justify-center">
      <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight leading-none">
        Emre Nergiz
      </h1>
      <span className="text-[10px] md:text-[11px] text-neutral-500 font-medium tracking-[0.35em] uppercase leading-none mt-1.5">
        PERFORMANCE
      </span>
    </div>
  </div>
);

// --- ANA UYGULAMA ---
export default function RegistrationApp() {
  const [view, setView] = useState<"form" | "login" | "admin" | "goodbye">("form"); 
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    const savedAuth = localStorage.getItem("emre_admin_auth");
    if (savedAuth === "true") {
      setIsAdminLoggedIn(true);
    }
  }, []);

  const handleAdminClick = () => {
    if (isAdminLoggedIn) {
      setView("admin"); 
    } else {
      setView("login"); 
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-gray-300 font-sans selection:bg-white/20 selection:text-white relative">
      
      {/* GEÇİŞ BUTONLARI */}
      {(view === "form" || view === "admin" || view === "login") && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
          {view !== "login" && ( 
            <>
              <button 
                onClick={() => setView("form")} 
                className={`px-4 py-3 rounded-xl text-xs font-bold shadow-2xl backdrop-blur-md border transition-all duration-300 ${
                  view === 'form' 
                    ? 'bg-white text-black border-white scale-105' 
                    : 'bg-black/40 text-white/70 border-white/10 hover:bg-black/60'
                }`}
              >
                Form
              </button>
              <button 
                onClick={handleAdminClick} 
                className={`px-4 py-3 rounded-xl text-xs font-bold shadow-2xl backdrop-blur-md border transition-all duration-300 ${
                  view === 'admin' 
                    ? 'bg-white text-black border-white scale-105' 
                    : 'bg-black/40 text-white/70 border-white/10 hover:bg-black/60'
                }`}
              >
                Admin
              </button>
            </>
          )}
        </div>
      )}

      {view === "form" && <TypeformView onExit={() => setView("goodbye")} />}
      {view === "goodbye" && <GoodbyeView />}
      {view === "login" && <LoginView onSuccess={() => { setIsAdminLoggedIn(true); setView("admin"); }} onCancel={() => setView("form")} />}
      {view === "admin" && <AdminDashboard />}
    </div>
  );
}

// --- GOODBYE EKRANI (Çıkış Yapınca Gelir) ---
function GoodbyeView() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-[#050505] animate-in fade-in duration-1000">
      <div className="scale-150 transform transition-transform duration-1000">
        <BrandLogo />
      </div>
    </div>
  );
}

// --- LOGIN EKRANI ---
function LoginView({ onSuccess, onCancel }: { onSuccess: () => void, onCancel: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); 

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); 

    setTimeout(() => {
      if (username.toLowerCase() === "emre" && password === "emre098") {
        setIsLoading(false);
        localStorage.setItem("emre_admin_auth", "true");
        onSuccess();
      } 
      else if (username.toLowerCase() === "hata") {
        setIsLoading(false);
        alert("⚠️ SİSTEM YOĞUNLUĞU!\n\nSistem şu an yoğunluktan dolayı yanıt veremiyor.\nLütfen doğrudan hocaya Instagram veya WhatsApp üzerinden mesaj atarak randevunuzu oluşturun.");
      }
      else {
        setIsLoading(false);
        alert("❌ GİRİŞ BAŞARISIZ\n\nKullanıcı adı veya şifre yanlış. Lütfen bilgilerinizi kontrol edip tekrar deneyin.");
      }
    }, 800);
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center p-6 bg-[#050505]">
      <div className="w-full max-w-sm bg-[#0a0a0a] border border-white/10 p-8 rounded-2xl shadow-2xl">
        <div className="flex justify-center mb-6">
           <div className="relative w-10 h-10"><Image src="/logo.png" alt="Logo" fill className="object-contain"/></div>
        </div>
        <h2 className="text-xl font-bold text-white text-center mb-6">Yönetici Girişi</h2>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs text-neutral-500 uppercase font-bold ml-1">Kullanıcı Adı</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} disabled={isLoading} className="w-full bg-[#111] border border-white/10 rounded-lg p-3 text-white focus:border-white/50 focus:outline-none mt-1 disabled:opacity-50 transition-opacity" />
          </div>
          <div>
            <label className="text-xs text-neutral-500 uppercase font-bold ml-1">Şifre</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoading} className="w-full bg-[#111] border border-white/10 rounded-lg p-3 text-white focus:border-white/50 focus:outline-none mt-1 disabled:opacity-50 transition-opacity" />
          </div>
          <button type="submit" disabled={isLoading} className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-neutral-200 transition-all mt-2 disabled:bg-neutral-600 disabled:text-neutral-400 disabled:cursor-not-allowed flex items-center justify-center gap-2">
            {isLoading ? "Kontrol Ediliyor..." : "Giriş Yap"}
          </button>
        </form>
        <button onClick={onCancel} className="w-full text-center text-xs text-neutral-500 mt-6 hover:text-white transition-colors">← Geri Dön</button>
      </div>
    </div>
  );
}

// --- MÜŞTERİ FORMU (ADIM ADIM TAKİP SİSTEMİ) ---
function TypeformView({ onExit }: { onExit: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<any>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // ÖNEMLİ: Bu kullanıcının ID'sini tutuyoruz ki her adımda yeni kayıt açmasın, mevcudu güncellesin
  const [leadId, setLeadId] = useState<number | null>(null);

  const totalSteps = steps.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  // --- ARKA PLAN KAYIT FONKSİYONU ---
  // Bu fonksiyon her 'İleri' tuşuna basıldığında sessizce çalışır.
  const saveProgress = async (newData: any) => {
    const payload = {
        name: newData.name,
        age: newData.age ? Number(newData.age) : null,
        phone: newData.phone,
        instagram: newData.instagram,
        goal: newData.goal,
        // Eğer paket seçilmediyse "YARIM_BIRAKTI" olarak etiketle
        package: newData.package || "YARIM_BIRAKTI" 
    };

    if (leadId) {
        // Eğer zaten bir ID varsa (isim girdiyse), o satırı GÜNCELLE
        const { error } = await supabase.from('leads').update(payload).eq('id', leadId);
        if (error) console.error("Update Hatası:", error);
    } else {
        // ID yoksa (İlk adım), yeni satır EKLE
        if (newData.name && newData.name.length > 2) {
            const { data, error } = await supabase.from('leads').insert([payload]).select().single();
            if (!error && data) {
                setLeadId(data.id); // ID'yi hafızaya al
            }
        }
    }
  };

  const handleNext = async () => {
    // Validasyon
    if (steps[currentStep].key === 'phone') {
        const phoneVal = String(formData.phone || "");
        const cleanPhone = phoneVal.replace(/\D/g, ''); 
        if (cleanPhone.length < 10 || cleanPhone.length > 11) {
            alert("⚠️ Geçersiz Numara!\n\nLütfen telefon numaranızı eksiksiz girdiğinizden emin olun.");
            return; 
        }
    }

    // --- KRİTİK NOKTA: Bir sonraki soruya geçmeden önce KAYDET ---
    await saveProgress(formData);

    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  // --- FİNAL (PAKET SEÇİMİ) ---
  const submitFinalData = async (finalPackageValue: string, isDropOff: boolean = false) => {
    setIsSubmitting(true);
    const finalData = { ...formData, package: finalPackageValue }; 
    setFormData(finalData);

    // Son kez güncelle (Paket bilgisini veya FİYAT_ÇIKIŞ durumunu işle)
    await saveProgress(finalData);

    // Telegram Bildirimi
    try {
        const message = isDropOff 
            ? `📉 <b>FİYAT KAYBI</b>\n👤 ${finalData.name}\n📱 ${finalData.phone}\n⚠️ Fiyatı görüp çıktı.` 
            : `✅ <b>YENİ MÜŞTERİ</b>\n👤 ${finalData.name}\n📦 ${finalPackageValue}`;
            
        await fetch('/api/telegram', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message }),
        });
    } catch (err) {
        console.error("Bildirim hatası:", err);
    }

    setIsSubmitting(false);

    if (isDropOff) {
        onExit(); // Çıkış
    } else {
        setIsCompleted(true); // Onay
    }
  };

  const handleChange = (val: string | number) => {
    setFormData({ ...formData, [steps[currentStep].key]: val });
  };

  const question = steps[currentStep];

  return (
    <div className="flex flex-col min-h-screen bg-[#050505] relative overflow-hidden">
      <div className="w-full h-[3px] bg-white/5 fixed top-0 left-0 z-20">
        <div className="h-full bg-white/60 shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-all duration-700 ease-out" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="absolute top-0 left-0 w-full p-6 md:p-8 flex justify-center md:justify-start z-10">
        <BrandLogo />
      </div>

      {isCompleted ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-6 animate-in fade-in zoom-in duration-700">
          <div className="w-20 h-20 rounded-full border border-white/10 bg-white/5 flex items-center justify-center mb-8 text-white text-3xl shadow-2xl">✓</div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">Kayıt Başarılı.</h1>
          <p className="text-neutral-500 text-sm md:text-base max-w-xs mx-auto leading-relaxed mb-8">
            Başvurunuz sisteme düştü. Koçunuz en kısa sürede sizinle iletişime geçecek.
          </p>
          <div className="w-full max-w-sm bg-white/[0.03] border border-white/10 rounded-xl p-5 mb-8">
             <div className="flex flex-col items-center gap-2">
                <span className="text-xl">📍</span>
                <p className="text-xs text-neutral-400 uppercase tracking-widest font-bold">Antrenman Yeri</p>
                <p className="text-white text-sm font-medium">İstanbul Maltepe Kenan Onuk Atletizm Pisti</p>
             </div>
          </div>
          <button onClick={() => window.location.reload()} className="text-xs text-white/40 hover:text-white border-b border-white/20 pb-1 transition-colors">Yeni Kayıt Oluştur</button>
        </div>
      ) : (
        <div className="flex-1 flex flex-col justify-center p-6 max-w-xl mx-auto w-full pt-32 md:pt-0">
          <div className="mb-8 md:mb-12">
            <span className="text-neutral-600 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase block mb-4">ADIM {currentStep + 1} / {totalSteps}</span>
            <h2 className="text-2xl md:text-4xl font-medium text-white leading-snug md:leading-tight">{question.question}</h2>
          </div>
          <div className="w-full mb-10 md:mb-14 space-y-4">
            {question.type === "select" ? (
              <div className="flex flex-col gap-3">
                {question.options?.map((opt, i) => (
                  <button 
                    key={i} 
                    onClick={() => { 
                      if (opt === "Çıkış Yap") {
                          submitFinalData("FİYAT_ÇIKIŞ", true); 
                      } else if (question.key === 'package') { 
                          submitFinalData(opt, false); 
                      } else { 
                          handleChange(opt); 
                          setTimeout(handleNext, 150); 
                      }
                    }} 
                    className="group relative w-full p-5 md:p-6 bg-white/[0.03] border border-white/[0.05] rounded-2xl text-left hover:bg-white/[0.08] hover:border-white/20 active:scale-[0.98] transition-all duration-200"
                  >
                    <span className="text-gray-300 text-sm md:text-lg font-light tracking-wide group-hover:text-white transition-colors block pr-8">
                      {opt}
                    </span>
                    <span className="absolute right-5 top-1/2 -translate-y-1/2 text-white/20 group-hover:translate-x-1 group-hover:text-white transition-all text-xl">→</span>
                  </button>
                ))}
              </div>
            ) : (
              <input 
                autoFocus
                type={question.type}
                placeholder={question.placeholder}
                value={formData[question.key] || ""}
                onChange={(e) => handleChange(e.target.value)}
                // INPUTTAN ÇIKINCA OTOMATİK KAYDET (Blur)
                onBlur={() => saveProgress(formData)}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && formData[question.key]) {
                        if (question.key === 'phone') {
                             const phoneVal = String(formData.phone || "").replace(/\D/g, ''); 
                             if (phoneVal.length < 10 || phoneVal.length > 11) {
                                 alert("⚠️ Geçersiz Numara!\n\nLütfen telefon numaranızı eksiksiz girdiğinizden emin olun.");
                                 return;
                             }
                        }
                        if (currentStep < totalSteps - 1) handleNext();
                    }
                }}
                className="w-full bg-transparent border-b border-white/10 pb-4 text-2xl md:text-4xl text-white focus:border-white/50 focus:outline-none placeholder:text-white/10 transition-colors font-light tracking-wide"
              />
            )}
            {question.note && <div className="mt-6 p-4 md:p-5 bg-red-950/20 border border-red-900/30 rounded-xl"><p className="text-red-400/90 text-xs md:text-sm leading-relaxed font-medium whitespace-pre-wrap">{question.note}</p></div>}
          </div>
          {question.type !== "select" && <button onClick={handleNext} disabled={!formData[question.key] || isSubmitting} className="w-full md:w-auto self-start group flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white text-black text-sm md:text-base font-bold hover:bg-neutral-200 disabled:opacity-0 disabled:translate-y-4 transition-all duration-500 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">Devam Et<span className="group-hover:translate-x-1 transition-transform text-lg">→</span></button>}
        </div>
      )}
    </div>
  );
}

// --- ADMIN PANELİ (GELİŞMİŞ ANALİZ) ---
function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
    if (!error) setLeads(data || []);
    setLoading(false);
  };

  const deleteLead = async (id: number) => {
    if (!window.confirm("Bu kaydı silmek istediğine emin misin? Bu işlem geri alınamaz.")) return;
    const { error } = await supabase.from('leads').delete().eq('id', id);
    if (error) {
        alert("Hata oluştu: " + error.message);
    } else {
        setLeads(leads.filter(lead => lead.id !== id));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("emre_admin_auth");
    window.location.reload(); 
  };

  const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('tr-TR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }).format(date);
  };

  return (
    <div className="min-h-screen bg-[#050505] p-4 md:p-10 font-sans text-gray-400 pb-24"> 
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 border-b border-white/5 pb-6 gap-6">
        <BrandLogo />
        <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto">
            <span className="text-[10px] text-neutral-600 uppercase tracking-widest">{leads.length} TOPLAM KAYIT</span>
            <div className="flex gap-2">
                <button onClick={fetchLeads} className="text-xs border border-white/10 px-4 py-2 rounded bg-white/[0.02] hover:bg-white/5 transition-colors text-gray-300">Yenile ↻</button>
                <button onClick={handleLogout} className="text-xs border border-red-900/50 px-4 py-2 rounded bg-red-900/10 hover:bg-red-900/30 transition-colors text-red-500">Çıkış Yap</button>
            </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto">
        <div className="border border-white/5 rounded-2xl bg-[#0a0a0a] overflow-hidden shadow-2xl relative">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[900px] md:min-w-0">
                <thead>
                    <tr className="bg-[#0f0f0f] text-gray-500 text-[10px] uppercase tracking-widest border-b border-white/5">
                    <th className="py-5 px-6 font-bold text-white/40">Durum</th>
                    <th className="py-5 px-6 font-bold text-white/40">İsim</th>
                    <th className="py-5 px-6 font-bold text-white/40">Yaş</th>
                    <th className="py-5 px-6 font-bold text-white/40">Paket Seçimi</th>
                    <th className="py-5 px-6 font-bold text-white/40">IG</th>
                    <th className="py-5 px-6 font-bold text-white/40">Hedef</th>
                    <th className="py-5 px-6 font-bold text-white/40">Telefon</th>
                    <th className="py-5 px-6 font-bold text-white/40 text-right">Tarih</th>
                    <th className="py-5 px-6 font-bold text-white/40 text-center">Sil</th>
                    </tr>
                </thead>
                <tbody className="text-sm font-light">
                    {loading ? (
                        <tr><td colSpan={9} className="p-12 text-center text-gray-700 animate-pulse tracking-widest text-xs uppercase">Yükleniyor...</td></tr>
                    ) : leads.length === 0 ? (
                        <tr><td colSpan={9} className="p-12 text-center text-gray-700 tracking-widest text-xs uppercase">Henüz kayıt yok.</td></tr>
                    ) : (
                        leads.map((item) => {
                          const isDropOff = item.package === "FİYAT_ÇIKIŞ";
                          const isIncomplete = item.package === "YARIM_BIRAKTI";
                          
                          let rowClass = 'hover:bg-white/[0.02]';
                          if (isDropOff) rowClass = 'bg-red-900/5 hover:bg-red-900/10';
                          if (isIncomplete) rowClass = 'bg-yellow-900/5 hover:bg-yellow-900/10';

                          return (
                            <tr key={item.id} className={`border-b border-white/5 transition-colors group ${rowClass}`}>
                                {/* Durum Göstergesi */}
                                <td className="py-5 px-6">
                                    {isDropOff ? (
                                        <span className="text-[10px] bg-red-900/30 text-red-500 px-2 py-1 rounded border border-red-900/50 font-bold tracking-wider">KAÇTI</span>
                                    ) : isIncomplete ? (
                                        <span className="text-[10px] bg-yellow-900/30 text-yellow-500 px-2 py-1 rounded border border-yellow-900/50 font-bold tracking-wider">YARIM</span>
                                    ) : (
                                        <span className="text-[10px] bg-green-900/30 text-green-500 px-2 py-1 rounded border border-green-900/50 font-bold tracking-wider">ADAY</span>
                                    )}
                                </td>
                                <td className={`py-5 px-6 font-medium ${isDropOff || isIncomplete ? 'text-white/60' : 'text-gray-200 group-hover:text-white'}`}>{item.name}</td>
                                <td className="py-5 px-6 text-gray-500">{item.age}</td>
                                <td className="py-5 px-6">
                                    {isDropOff ? (
                                        <span className="text-red-400/50 text-xs italic">Fiyatı Gördü & Çıktı</span>
                                    ) : isIncomplete ? (
                                        <span className="text-yellow-400/50 text-xs italic">Formu Tamamlamadı</span>
                                    ) : (
                                        <span className="bg-white/5 px-3 py-1.5 rounded text-[11px] text-gray-300 border border-white/5 whitespace-nowrap">
                                            {item.package ? item.package.split(' -')[0] : '-'}
                                        </span>
                                    )}
                                </td>
                                <td className="py-5 px-6 text-blue-400/80 hover:text-blue-400 cursor-pointer text-xs">{item.instagram || '-'}</td>
                                <td className="py-5 px-6 text-gray-500 max-w-[150px] truncate" title={item.goal}>{item.goal}</td>
                                <td className="py-5 px-6 text-gray-400 font-mono text-xs whitespace-nowrap">{item.phone}</td>
                                <td className="py-5 px-6 text-right text-gray-600 text-xs font-mono">{formatDate(item.created_at)}</td>
                                <td className="py-5 px-6 text-center">
                                    <button onClick={() => deleteLead(item.id)} className="text-red-900 hover:text-red-500 transition-colors font-bold text-lg px-2" title="Bu kaydı sil">×</button>
                                </td>
                            </tr>
                          );
                        })
                    )}
                </tbody>
                </table>
            </div>
        </div>
        <div className="mt-4 md:hidden text-center text-[10px] text-gray-700 flex items-center justify-center gap-2">
            <span>← Tabloyu kaydırmak için sürükleyin →</span>
        </div>
      </div>
    </div>
  );
}