'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const params = useParams();
  const secret = (params?.secret as string) || '';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setErrorMsg('بيانات الدخول غير صحيحة');
        setLoading(false);
        return;
      }

      // ✅ fallback: خزّن التوكن في localStorage لضمان رفع الملفات
      try {
        const s = await fetch('/api/auth/session', { cache: 'no-store' });
        const sessionData = await s.json().catch(() => null);
        const token = sessionData?.accessToken;
        if (token) localStorage.setItem('riah_access_token', token);
      } catch {
        // ignore
      }

      // روح للداشبورد (نفس secret)
      router.push(`/admin/${secret}/dashboard`);
    } catch (err) {
      setErrorMsg('حدث خطأ غير متوقع');
      setLoading(false);
      return;
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0B1D26] to-[#1B3B4B] px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">
        <h1 className="text-2xl font-extrabold text-white text-center mb-2">Admin Login</h1>
        <p className="text-white/70 text-center mb-6">أدخل بيانات الدخول لإدارة الموقع</p>

        {errorMsg ? (
          <div className="mb-4 rounded-lg bg-red-500/15 border border-red-500/30 p-3 text-red-200 text-sm">
            {errorMsg}
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white/80 text-sm mb-2">Email</label>
            <input
              type="email"
              className="w-full rounded-xl bg-black/20 border border-white/10 px-4 py-3 text-white outline-none focus:border-white/30"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div>
            <label className="block text-white/80 text-sm mb-2">Password</label>
            <input
              type="password"
              className="w-full rounded-xl bg-black/20 border border-white/10 px-4 py-3 text-white outline-none focus:border-white/30"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-60 px-4 py-3 font-bold text-white transition"
          >
            {loading ? '...جاري تسجيل الدخول' : 'دخول'}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-white/50">
          سيتم تحويلك للوحة التحكم بعد نجاح تسجيل الدخول
        </div>
      </div>
    </div>
  );
}