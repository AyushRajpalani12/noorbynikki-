'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // User jo bhi email daalega, uske basis par ek naam generate kar lenge (jaise email ka pehla part)
    const nameFromEmail = email.split('@')[0] || 'User';
    const formattedName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);

    const userData = {
      name: formattedName,
      email: email,
      password: password
    };

    // Direct current user me save kar denge taaki koi error na aaye
    localStorage.setItem('currentUser', JSON.stringify(userData));
    
    // Trigger instant navbar update
    window.dispatchEvent(new Event('authChange'));
    
    // Green Toast Notification for Successful Login
    setToastMessage('Your login is successfully done!');

    setTimeout(() => {
      router.push('/dashboard'); 
    }, 1500);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8 relative">
      
      {/* --- GREEN TOAST SUCCESS NOTIFICATION --- */}
      {toastMessage && (
        <div className="fixed top-6 z-50 bg-emerald-600 text-white px-6 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce">
          <CheckCircle2 className="w-5 h-5" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-8 sm:p-10 space-y-8">
        
        <div className="text-center">
          <Link href="/" className="text-2xl font-bold tracking-wider text-rose-600 font-serif">
            KURTI<span className="text-gray-800">STORE</span>
          </Link>
          <h2 className="mt-4 text-2xl font-serif font-bold text-gray-900">Welcome Back</h2>
          <p className="mt-1 text-xs text-gray-500">Please enter your details to sign in</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-rose-600 text-gray-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-rose-600 text-gray-900"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-3.5 px-8 rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Sign In</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-gray-500">
          Don't have an account?{' '}
          <Link href="/register" className="text-rose-600 font-semibold hover:underline">
            Create account
          </Link>
        </div>

      </div>
    </div>
  );
}