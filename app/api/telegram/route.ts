import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Frontend'den gelen hazır süslü "message" metnini alıyoruz
    const { message } = body;

    // Senin özel bot token ve chat ID bilgilerin
    const BOT_TOKEN = '8444120138:AAHA8YOCFkZgS4W6F9V-CF2OjAFAD0f8e8k';
    const CHAT_ID = '1420371287';

    if (!message) {
        return NextResponse.json({ error: "Mesaj bulunamadı" }, { status: 400 });
    }

    const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message, // Direkt o süslü mesajı gönder
        parse_mode: 'HTML', // Kalın (bold) yazıların ve emojilerin çalışması için
      }),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Telegram Gönderim Hatası:", error);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}