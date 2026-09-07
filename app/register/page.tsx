'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 1. Purane sabhi registered users ki list nikalna (agar hai toh)
    const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');

    // 2. Check karna ki email already registered toh nahi hai
    const userExists = existingUsers.some((u: any) => u.email === formData.email);
    if (userExists) {
      alert('This email is already registered! Please login instead.');
      router.push('/login');
      return;
    }

    // 3. Naye user ko list me add karna
    const updatedUsers = [...existingUsers, formData];
    localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
    
    // 4. Current user ko bhi set kar dena taaki sign up hote hi login ho jaye
    localStorage.setItem('currentUser', JSON.stringify(formData));
    
    // 5. Navbar/App ko update karne ke liye custom event fire karna
    window.dispatchEvent(new Event('authChange'));

    // 6. Green Toast Notification show karna
    setToastMessage('Your registration is successfully done!');
    
    // 7. 1.5 second ke baad home ya account page par redirect karna
    setTimeout(() => {
      router.push('/account'); // ya '/' jahan aap bhejna chahe
    }, 1500);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8 relative">
      
      {/* --- GREEN TOAST NOTIFICATION --- */}
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
          <h2 className="mt-4 text-2xl font-serif font-bold text-gray-900">Create Account</h2>
          <p className="mt-1 text-xs text-gray-500">Join us for exclusive collection & updates</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-3.5 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Gaurav Soni"
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-rose-600 text-gray-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-rose-600 text-gray-900"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-3.5 px-8 rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Sign Up</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-gray-500">
          Already have an account?{' '}
          <Link href="/login" className="text-rose-600 font-semibold hover:underline">
            Sign In
          </Link>
        </div>

      </div>
    </div>
  );
}