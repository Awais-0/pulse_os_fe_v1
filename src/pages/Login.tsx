import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Activity, Mail, Lock, ArrowRight, Github, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '@/src/lib/api';
import { useApi } from '@/src/hooks/useApi';
import { useAuth } from '../contexts/AuthContext';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loading, error, execute: loginUser } = useApi(login);
  const { refreshUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('username', email);
      formData.append('password', password);

      const data = await loginUser(formData);
      localStorage.setItem('token', data.access_token);
      await refreshUser();
      navigate('/dashboard');
    } catch (err) {
      // Error is handled by the hook
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 mesh-gradient relative overflow-hidden">
      {/* Decorative blurs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/20 rounded-full blur-[120px] animate-pulse-subtle" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/20 rounded-full blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md glass p-10 rounded-[40px] relative z-10"
      >
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center shadow-xl shadow-indigo-500/10 mb-6 group cursor-pointer border border-white/5 overflow-hidden">
            <img src="assets/logo/PulseOS.png" alt="PulseOS" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
          </div>
          <h2 className="text-3xl font-black tracking-tight mb-2">Welcome to PulseOS</h2>
          <p className="text-white/40 font-medium">Your life, synchronized</p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm font-bold animate-shake">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-xs font-bold text-white/50 uppercase tracking-widest ml-1">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-indigo-400 transition-colors" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ark@aura.co"
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-medium placeholder:text-white/20"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-xs font-bold text-white/50 uppercase tracking-widest">Password</label>
              <a href="#" className="text-[10px] font-bold text-indigo-400 hover:text-indigo-300 transition-colors">Forgot Password?</a>
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-indigo-400 transition-colors" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-medium placeholder:text-white/20"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-500/25 transition-all active:scale-[0.98] flex items-center justify-center gap-2 group"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Jump Back In
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-white/10 space-y-4">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Social Accounts</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <button className="w-full glass py-3 rounded-2xl flex items-center justify-center gap-3 text-sm font-bold hover:bg-white/10 transition-colors">
            <Github className="w-5 h-5" />
            GitHub
          </button>
        </div>

        <p className="text-center mt-8 text-sm text-white/40 font-medium">
          New to PulseOS? <Link to="/signup" className="text-indigo-400 hover:text-indigo-300 transition-colors font-bold">Create Account</Link>
        </p>
      </motion.div>
    </div>
  );
}
