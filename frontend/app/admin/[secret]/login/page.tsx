'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';

export default function AdminLogin() {
  const params = useParams();
  const secret = params.secret as string;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    if (res?.error) {
      setError('بيانات الدخول غير صحيحة');
    } else {
      router.push(`/admin/${secret}/dashboard`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0F2027] to-[#2C5364]">
      <div className="glass-card p-8 rounded-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">تسجيل الدخول</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="البريد الإلكتروني"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white"
            required
          />
          <input
            type="password"
            placeholder="كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white"
            required
          />
          <button type="submit" className="w-full p-3 rounded-lg bg-[#00c6ff] text-white font-bold hover:bg-[#00a0cc] transition">
            دخول
          </button>
        </form>
      </div>
    </div>
  );
}