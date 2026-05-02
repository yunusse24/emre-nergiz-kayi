"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
// DİKKAT: Dosyan 'basvuru' klasöründeyse "../supabase", ana klasördeyse "./supabase" yap.
import { supabase } from "../supabase"; 

// --- TİPLER ---
type FormStep = {
  id: number;
  question: string;
  type: "text" | "email" | "phone" | "select" | "number" | "contact";
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
  phone: string | null;
  instagram: string | null;
  created_at: string;
};

// --- SORULAR ---
const steps: FormStep[] = [
  { id: 1, question: "Önce tanışalım, ismin nedir?", type: "text", placeholder: "Adın Soyadın...", key: "name" },
  { id: 2, question: "Kaç yaşındasın?", type: "number", placeholder: "Örn: 17", key: "age" },
  { id: 3, question: "Ana hedefin nedir?", type: "text", placeholder: "Örn: Hızlanmak, Profesyonel olmak...", key: "goal" },
  { id: 4, question: "Sana nasıl ulaşalım?", type: "contact", key: "contact" },
  { 
    id: 5, 
    question: "Atletik gelişimin için planladığın tahmini bütçe aralığı nedir?", 
    type: "select", 
    options: [
      "Tek ders: 3.000₺", 
      "10 Ders: 27.500₺", 
      "15 Ders: 33.500₺",
      "Şu an bütçe ayırmayı düşünmüyorum, programlarla devam edelim" 
    ], 
    key: "package",
    note: "📍 Antrenman Yeri: İstanbul Burhan Felek Atletizm Pisti\n\n⚠️ Dikkat: Paketlerin 5 hafta içerisinde bitirilmesi zorunludur. Aksi takdirde antrenman bilimi gereği gelişim %40 düşer."
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

// --- GOODBYE EKRANI ---
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

// --- MÜŞTERİ FORMU (İLETİŞİMDE YAKALAMA SİSTEMİ) ---
function TypeformView({ onExit }: { onExit: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<any>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactMethod, setContactMethod] = useState<"phone" | "instagram" | null>(null);
  
  // Kullanıcıyı veritabanında güncellemek için ID'sini tutuyoruz
  const [leadId, setLeadId] = useState<number | null>(null);

  const totalSteps = steps.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleNext = async () => {
    // 1. Eğer iletişim adımındaysak (Step 4 - index 3), Validasyon ve KAYIT işlemi yap
    if (steps[currentStep].type === 'contact') {
        if (contactMethod === 'phone') {
            const phoneVal = String(formData.phone || "");
            const cleanPhone = phoneVal.replace(/\D/g, ''); 
            if (cleanPhone.length < 10 || cleanPhone.length > 11) {
                alert("⚠️ Geçersiz Numara!\n\nLütfen telefon numaranızı eksiksiz girdiğinizden emin olun.");
                return; 
            }
        }

        setIsSubmitting(true);
        // İletişimi bıraktığı an ilk veritabanı kaydını atıyoruz (Fiyat ekranına geçmeden önce)
        const payload = {
            name: formData.name,
            age: formData.age ? Number(formData.age) : null,
            phone: formData.phone || null,
            instagram: formData.instagram || null,
            goal: formData.goal,
            package: "İLETİŞİM_BIRAKTI" // Henüz fiyat seçmedi
        };

        if (!leadId && formData.name && formData.name.length > 2) {
            const { data, error } = await supabase.from('leads').insert([payload]).select().single();
            if (!error && data) {
                setLeadId(data.id); // Oluşan ID'yi hafızaya al ki sonda güncelleyebilelim
            }
        }
        setIsSubmitting(false);
    }
    
    // 2. Sonraki adıma geç
    if (currentStep < totalSteps - 1) {
        setCurrentStep(prev => prev + 1);
    }
  };

  const submitFinalData = async (finalPackageValue: string, actionType: "success" | "dropoff" | "redirect" = "success") => {
    setIsSubmitting(true);
    
    const finalData = { ...formData, package: finalPackageValue }; 
    setFormData(finalData);

    const payload = {
        name: finalData.name,
        age: finalData.age ? Number(finalData.age) : null,
        phone: finalData.phone || null,
        instagram: finalData.instagram || null,
        goal: finalData.goal,
        package: finalPackageValue 
    };

    // Eğer iletişim adımında kayıt açıldıysa onu GÜNCELLE (Çöplük oluşmasın)
    if (leadId) {
        await supabase.from('leads').update(payload).eq('id', leadId);
    } else {
        // Hızlıca geçilmişse (nadiren olur) yeni kayıt aç
        if (finalData.name && finalData.name.length > 2) {
            await supabase.from('leads').insert([payload]);
        }
    }

    const contactInfo = finalData.phone ? `📱 ${finalData.phone}` : `📸 @${finalData.instagram?.replace('@', '')}`;

    try {
        let message = "";
        if (actionType === "dropoff") {
            message = `📉 <b>BÜTÇE REDDİ (KAYIP)</b>\n👤 ${finalData.name}\n${contactInfo}\n⚠️ Bütçe ayırmayacağını belirtip çıktı.`;
        } else if (actionType === "redirect") {
            message = `🛍️ <b>PROGRAM SATIŞINA YÖNLENDİRİLDİ</b>\n👤 ${finalData.name}\n${contactInfo}\n🎯 Hedef: ${finalData.goal}\n⚠️ Özel derse bütçe ayırmadı, Shopier'e yönlendirildi.`;
        } else {
            message = `✅ <b>PARA KOKUSU ALIYORUM</b>\n👤 ${finalData.name}\n${contactInfo}\n🎯 Hedef: ${finalData.goal}\n📦 Bütçe: ${finalPackageValue}`;
        }
        await fetch('/api/telegram', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message }),
        });
    } catch (err) { console.error(err); }

    setIsSubmitting(false);
    if (actionType === "redirect") window.location.href = "https://www.shopier.com/emrenergiz"; 
    else if (actionType === "dropoff") onExit(); 
    else setIsCompleted(true); 
  };

  const handleChange = (val: string | number) => setFormData({ ...formData, [steps[currentStep].key]: val });
  const question = steps[currentStep];
  const isNextDisabled = question.type === "contact" ? (!formData.phone && !formData.instagram) || isSubmitting : (!formData[question.key] || isSubmitting);

  return (
    <div className="flex flex-col min-h-screen bg-[#050505] relative overflow-hidden">
      <div className="w-full h-[3px] bg-white/5 fixed top-0 left-0 z-20">
        <div className="h-full bg-white/60 shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-all duration-700 ease-out" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="absolute top-0 left-0 w-full p-6 md:p-8 flex justify-center md:justify-start z-10"><BrandLogo /></div>

      {isCompleted ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-6 animate-in fade-in zoom-in duration-700">
          <div className="w-20 h-20 rounded-full border border-white/10 bg-white/5 flex items-center justify-center mb-8 text-white text-3xl shadow-2xl">✓</div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">Kayıt Başarılı.</h1>
          <p className="text-neutral-500 mb-8">Başvurunuz sisteme düştü. Koçunuz en kısa sürede sizinle iletişime geçecek.</p>
          <button onClick={() => window.location.reload()} className="text-xs text-white/40 border-b border-white/20 pb-1">Yeni Kayıt Oluştur</button>
        </div>
      ) : (
        <div className="flex-1 flex flex-col justify-center p-6 max-w-xl mx-auto w-full pt-32 md:pt-0">
          <div className="mb-8 md:mb-12">
            <span className="text-neutral-600 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase block mb-4">ADIM {currentStep + 1} / {totalSteps}</span>
            <h2 className="text-2xl md:text-4xl font-medium text-white leading-snug">{question.question}</h2>
          </div>
          <div className="w-full mb-10 md:mb-14 space-y-4">
            
            {question.type === "select" ? (
              <div className="flex flex-col gap-3">
                {question.options?.map((opt, i) => (
                  <button 
                    key={i} 
                    onClick={() => { 
                      if (opt === "Şu an bütçe ayırmayı düşünmüyorum, programlarla devam edelim") submitFinalData("PROGRAM_YONLENDIRME", "redirect"); 
                      else submitFinalData(opt, "success"); 
                    }} 
                    className="group relative w-full p-5 md:p-6 bg-white/[0.03] border border-white/[0.05] rounded-2xl text-left hover:bg-white/[0.08] hover:border-white/20 active:scale-[0.98] transition-all duration-200"
                  >
                    <span className="flex items-center gap-3 text-gray-300 text-sm md:text-lg font-light tracking-wide group-hover:text-white transition-colors pr-8">
                      <span>{opt}</span>
                      
                      {opt === "Tek ders: 3.000₺" && (
                        <span className="text-neutral-500/60 line-through decoration-neutral-500/50 decoration-2 text-sm md:text-base font-medium">3.500₺</span>
                      )}
                      {opt === "10 Ders: 27.500₺" && (
                        <span className="text-neutral-500/60 line-through decoration-neutral-500/50 decoration-2 text-sm md:text-base font-medium">30.000₺</span>
                      )}
                      {opt === "15 Ders: 33.500₺" && (
                        <span className="text-neutral-500/60 line-through decoration-neutral-500/50 decoration-2 text-sm md:text-base font-medium">35.000₺</span>
                      )}
                    </span>
                    <span className="absolute right-5 top-1/2 -translate-y-1/2 text-white/20 group-hover:translate-x-1 group-hover:text-white transition-all text-xl">→</span>
                  </button>
                ))}
              </div>
            ) 
            : question.type === "contact" ? (
              <div className="flex flex-col gap-4 w-full">
                {!contactMethod ? (
                  <>
                    <button onClick={() => setContactMethod("phone")} className="group w-full p-5 bg-white/[0.03] border border-white/[0.05] rounded-2xl text-left text-gray-300 hover:border-white/20 transition-all">📱 Telefon Numarası Bırak</button>
                    <button onClick={() => setContactMethod("instagram")} className="group w-full p-5 bg-white/[0.03] border border-white/[0.05] rounded-2xl text-left text-gray-300 hover:border-white/20 transition-all">📸 Instagram Adresi Bırak</button>
                  </>
                ) : (
                  <div className="animate-in fade-in duration-300">
                    <input autoFocus type={contactMethod === "phone" ? "tel" : "text"} placeholder={contactMethod === "phone" ? "05XX XXX XX XX" : "@kullaniciadi"} 
                      value={formData[contactMethod] || ""} onChange={(e) => setFormData({ ...formData, [contactMethod]: e.target.value, [contactMethod === "phone" ? "instagram" : "phone"]: null })}
                      onKeyDown={(e) => { if (e.key === "Enter" && formData[contactMethod]) handleNext(); }}
                      className="w-full bg-transparent border-b border-white/10 pb-4 text-2xl md:text-4xl text-white focus:outline-none placeholder:text-white/10 font-light" />
                    <button onClick={() => { setContactMethod(null); setFormData({...formData, phone: null, instagram: null}); }} className="mt-4 text-xs text-neutral-500 hover:text-white transition-all">← Diğer seçeneğe dön</button>
                  </div>
                )}
              </div>
            ) 
            : (
              <input autoFocus type={question.type} placeholder={question.placeholder} value={formData[question.key] || ""}
                onChange={(e) => handleChange(e.target.value)} 
                onKeyDown={(e) => { if (e.key === "Enter" && formData[question.key] && currentStep < totalSteps - 1) handleNext(); }}
                className="w-full bg-transparent border-b border-white/10 pb-4 text-2xl md:text-4xl text-white focus:outline-none font-light tracking-wide"
              />
            )}
            {question.note && <div className="mt-6 p-4 md:p-5 bg-red-950/20 border border-red-900/30 rounded-xl"><p className="text-red-400/90 text-xs md:text-sm whitespace-pre-wrap">{question.note}</p></div>}
          </div>
          {question.type !== "select" && <button onClick={handleNext} disabled={isNextDisabled} className="w-full md:w-auto self-start px-8 py-4 rounded-full bg-white text-black font-bold shadow-2xl hover:bg-neutral-200 transition-all disabled:opacity-0 disabled:translate-y-4">Devam Et →</button>}
        </div>
      )}
    </div>
  );
}

// --- ADMIN PANELİ (GÜNCELLENDİ: FİYATTA KALANLARI GÖSTERİYOR) ---
function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchLeads(); }, []);

  const fetchLeads = async () => {
    setLoading(true);
    const { data } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
    if (data) setLeads(data);
    setLoading(false);
  };

  const deleteLead = async (id: number) => {
    if (!window.confirm("Bu kaydı silmek istediğine emin misin?")) return;
    const { error } = await supabase.from('leads').delete().eq('id', id);
    if (!error) setLeads(leads.filter(lead => lead.id !== id));
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('tr-TR', { 
        day: '2-digit', month: '2-digit', year: 'numeric', 
        hour: '2-digit', minute: '2-digit' 
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-[#050505] p-4 md:p-10 font-sans text-gray-400 pb-24"> 
      <div className="max-w-[1400px] mx-auto flex justify-between mb-8 border-b border-white/5 pb-6">
        <BrandLogo />
        <div className="flex gap-2">
            <button onClick={fetchLeads} className="text-xs border border-white/10 px-4 py-2 rounded bg-white/[0.02] hover:bg-white/5 transition-all text-gray-300">Yenile ↻</button>
            <button onClick={() => { localStorage.removeItem("emre_admin_auth"); window.location.reload(); }} className="text-xs border border-red-900/50 px-4 py-2 rounded bg-red-900/10 text-red-500 hover:bg-red-900/30 transition-all">Çıkış Yap</button>
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto overflow-hidden rounded-2xl border border-white/5 bg-[#0a0a0a]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-[#0f0f0f] text-gray-500 text-[10px] uppercase tracking-widest border-b border-white/5">
                <th className="py-5 px-6">Durum</th>
                <th className="py-5 px-6">İsim</th>
                <th className="py-5 px-6">Paket Seçimi</th>
                <th className="py-5 px-6">İletişim</th>
                <th className="py-5 px-6">Tarih</th>
                <th className="py-5 px-6 text-center">Sil</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="p-10 text-center animate-pulse">Yükleniyor...</td></tr>
              ) : leads.map((item) => {
                const isDropOff = item.package === "FİYAT_ÇIKIŞ" || item.package === "BÜTÇE_YOK_ÇIKIŞ";
                const isRedirect = item.package === "PROGRAM_YONLENDIRME";
                const isContactOnly = item.package === "İLETİŞİM_BIRAKTI"; // Yeni Statü

                const rowClass = isDropOff ? 'bg-red-900/5' : isRedirect ? 'bg-blue-900/5' : isContactOnly ? 'bg-yellow-900/5' : '';

                return (
                  <tr key={item.id} className={`border-b border-white/5 transition-colors ${rowClass} hover:bg-white/[0.02]`}>
                    <td className="py-5 px-6">
                        {isDropOff ? <span className="text-[10px] bg-red-900/30 text-red-500 px-2 py-1 rounded border border-red-900/50 font-bold">KAÇTI</span> : 
                         isRedirect ? <span className="text-[10px] bg-blue-900/30 text-blue-500 px-2 py-1 rounded border border-blue-900/50 font-bold">SHOPİER</span> : 
                         isContactOnly ? <span className="text-[10px] bg-yellow-900/30 text-yellow-500 px-2 py-1 rounded border border-yellow-900/50 font-bold" title="Fiyatları gördü ama paket seçmeden çıktı.">FİYATTA KALDI</span> : 
                         <span className="text-[10px] bg-green-900/30 text-green-500 px-2 py-1 rounded border border-green-900/50 font-bold">ADAY</span>}
                    </td>
                    <td className="py-5 px-6 font-medium text-gray-200">{item.name}</td>
                    <td className="py-5 px-6">
                        {isContactOnly ? <span className="text-yellow-500/50 italic text-xs">Paket Seçmedi</span> : 
                         item.package?.replace("PROGRAM_YONLENDIRME", "SHOPİER") || "-"}
                    </td>
                    <td className="py-5 px-6 font-mono text-xs">{item.phone ? `📱 ${item.phone}` : item.instagram ? `📸 @${item.instagram}` : "-"}</td>
                    <td className="py-5 px-6 text-neutral-500 text-xs">{formatDate(item.created_at)}</td>
                    <td className="py-5 px-6 text-center">
                      <button onClick={() => deleteLead(item.id)} className="text-red-900 hover:text-red-500 font-bold text-xl px-2 transition-colors" title="Sil">×</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}