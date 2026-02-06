import { NextResponse } from 'next/server';

// --- BURALARI DOLDUR ---
const TELEGRAM_BOT_TOKEN = '8444120138:AAHA8YOCFkZgS4W6F9V-CF2OjAFAD0f8e8k';
const TELEGRAM_CHAT_ID = '1420371287';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, age, phone, package: pkg, goal, instagram } = body;

    // Mesajın Tasarımı
    const message = `
🔔 *YENİ ÖĞRENCİ BAŞVURUSU!*

👤 *İsim:* ${name}
🎂 *Yaş:* ${age}
📞 *Tel:* ${phone}
📸 *IG:* ${instagram || '-'}
📦 *Paket:* ${pkg || 'Seçilmedi'}
🎯 *Hedef:* ${goal}

_Admin panelinden kontrol et._
`;

    // Telegram'a Gönder
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'Markdown', // Yazıları kalın/italik yapmak için
      }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Telegram Hatası:', error);
    return NextResponse.json({ success: false });
  }
}