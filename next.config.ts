import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 'rewrites' yerine 'redirects' kullanıyoruz. En sağlam yöntem budur.
  async redirects() {
    return [
      {
        source: '/randevu',
        destination: 'https://randevu-sistem-sage.vercel.app',
        permanent: true, // Tarayıcı bunu hafızaya alır, hızlı açılır
      },
    ];
  },
};

export default nextConfig;