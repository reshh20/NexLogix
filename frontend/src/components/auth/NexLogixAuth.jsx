import React, { useState } from 'react';
import { 
  Shield, 
  User, 
  Phone, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Loader2,
  Package
} from 'lucide-react';

export default function NexLogixAuth({ onAuthSuccess }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleTabSwitch = (signUpMode) => {
    setIsSignUp(signUpMode);
    setErrorMsg('');
    setSuccessMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!email.trim() || !password.trim()) {
      setErrorMsg('Please enter both email address and password.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters in length.');
      return;
    }

    if (isSignUp) {
      if (!fullName.trim()) {
        setErrorMsg('Please enter your full name.');
        return;
      }
      if (!phone.trim()) {
        setErrorMsg('Please enter your phone number.');
        return;
      }
    }

    setLoading(true);
    try {
      if (onAuthSuccess) {
        await onAuthSuccess({
          email,
          password,
          fullName: isSignUp ? fullName : undefined,
          phone: isSignUp ? phone : undefined,
          isSignUp,
          rememberMe,
        });
      }
      setLoading(false);
      if (isSignUp) {
        setSuccessMsg(`Account created successfully for ${fullName}.`);
      } else {
        setSuccessMsg(`Signed in successfully as ${email}.`);
      }
    } catch (err) {
      setLoading(false);
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#170D0A] flex flex-col justify-center items-center px-4 py-12 selection:bg-[#FFB500] selection:text-[#351C15] overflow-hidden">
      
      {/* 1. Background Ambient Glow */}
      <div 
        className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-[#FFB500]/10 via-[#351C15]/20 to-transparent blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />

      <div 
        className="absolute w-[520px] h-[520px] rounded-full bg-radial from-[#FFB500]/5 via-[#351C15]/10 to-transparent blur-3xl pointer-events-none -z-0"
        aria-hidden="true" 
      />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-lg">

        {/* 2. Brand Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="relative group mb-3">
            <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-[#FFB500]/30 to-[#F0AA00]/10 blur-sm group-hover:blur-md transition duration-300" />
            <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-[#351C15] border border-[#FFB500]/40 shadow-xl shadow-[#FFB500]/10">
              <Shield className="w-8 h-8 text-[#FFB500] drop-shadow-[0_0_8px_rgba(255,181,0,0.4)]" />
              <Package className="w-4 h-4 text-amber-200 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-90" />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#351C15]/70 border border-[#4A281E] text-xs font-extrabold tracking-widest text-[#FFB500] uppercase mb-2">
            <span className="w-2 h-2 rounded-full bg-[#FFB500] animate-pulse" />
            NexLogix
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {isSignUp ? 'Create NexLogix Account' : 'Sign in to NexLogix'}
          </h1>

          <p className="text-sm text-amber-100/70 mt-2 max-w-sm sm:max-w-md leading-relaxed">
            {isSignUp
              ? 'Enter your name, phone, and credentials to register your NexLogix account'
              : 'Logistics intelligence platform for enterprise shipment management'}
          </p>
        </div>

        {/* 3. Card Container */}
        <div className="w-full rounded-3xl border border-[#4A281E] bg-[#23120E]/90 p-7 sm:p-9 shadow-2xl backdrop-blur-xl space-y-6">
          
          {/* 4. Sign In / Sign Up Segmented Tab Switcher */}
          <div className="grid grid-cols-2 bg-[#170D0A] border border-[#4A281E] rounded-xl p-1.5 gap-1.5">
            <button
              type="button"
              onClick={() => handleTabSwitch(false)}
              className={`py-2.5 text-xs sm:text-sm uppercase tracking-wider font-extrabold rounded-lg transition-all duration-200 cursor-pointer ${
                !isSignUp
                  ? 'bg-[#FFB500] text-[#351C15] shadow-md shadow-[#FFB500]/25'
                  : 'text-amber-200/60 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => handleTabSwitch(true)}
              className={`py-2.5 text-xs sm:text-sm uppercase tracking-wider font-extrabold rounded-lg transition-all duration-200 cursor-pointer ${
                isSignUp
                  ? 'bg-[#FFB500] text-[#351C15] shadow-md shadow-[#FFB500]/25'
                  : 'text-amber-200/60 hover:text-white'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Validation Feedback Messages */}
          {errorMsg && (
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-red-950/40 border border-red-800/50 text-red-200 text-xs animate-in fade-in slide-in-from-top-1">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-amber-950/40 border border-[#FFB500]/40 text-amber-200 text-xs animate-in fade-in slide-in-from-top-1">
              <CheckCircle2 className="w-4 h-4 text-[#FFB500] shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* 5. Form Inputs */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Full Name (Sign Up only) */}
            {isSignUp && (
              <div className="space-y-1.5 transition-all">
                <label className="block text-xs uppercase tracking-wider font-semibold text-amber-200">
                  Full Name
                </label>
                <div className="relative flex items-center">
                  <User className="absolute left-3.5 w-5 h-5 text-amber-300/40 pointer-events-none" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name (e.g. John Doe)..."
                    className="w-full bg-[#170D0A] border border-[#4A281E] rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-amber-200/30 focus:outline-none focus:ring-2 focus:ring-[#FFB500]/50 focus:border-[#FFB500] transition-all"
                  />
                </div>
              </div>
            )}

            {/* Phone Number (Sign Up only) */}
            {isSignUp && (
              <div className="space-y-1.5 transition-all">
                <label className="block text-xs uppercase tracking-wider font-semibold text-amber-200">
                  Phone Number
                </label>
                <div className="relative flex items-center">
                  <Phone className="absolute left-3.5 w-5 h-5 text-amber-300/40 pointer-events-none" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter phone number (e.g. +1 555-019-2834)..."
                    className="w-full bg-[#170D0A] border border-[#4A281E] rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-amber-200/30 focus:outline-none focus:ring-2 focus:ring-[#FFB500]/50 focus:border-[#FFB500] transition-all"
                  />
                </div>
              </div>
            )}

            {/* Email Address (Both) */}
            <div className="space-y-1.5">
              <label className="block text-xs uppercase tracking-wider font-semibold text-amber-200">
                Email Address
              </label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3.5 w-5 h-5 text-amber-300/40 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-[#170D0A] border border-[#4A281E] rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-amber-200/30 focus:outline-none focus:ring-2 focus:ring-[#FFB500]/50 focus:border-[#FFB500] transition-all"
                />
              </div>
            </div>

            {/* Password (Both) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs uppercase tracking-wider font-semibold text-amber-200">
                  Password
                </label>
                {!isSignUp && (
                  <button
                    type="button"
                    onClick={() => {
                      alert('Password reset instructions sent to your email.');
                    }}
                    className="text-[11px] text-[#FFB500] hover:text-[#F0AA00] transition-colors font-medium cursor-pointer"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative flex items-center">
                <Lock className="absolute left-3.5 w-5 h-5 text-amber-300/40 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[#170D0A] border border-[#4A281E] rounded-xl pl-11 pr-11 py-3 text-sm text-white placeholder-amber-200/30 focus:outline-none focus:ring-2 focus:ring-[#FFB500]/50 focus:border-[#FFB500] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-amber-300/40 hover:text-amber-200 transition-colors focus:outline-none cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox (Sign In only) */}
            {!isSignUp && (
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-[#4A281E] bg-[#170D0A] text-[#FFB500] focus:ring-[#FFB500]/50 focus:ring-offset-0 focus:ring-1 accent-[#FFB500]"
                  />
                  <span className="text-xs text-amber-100/70">Remember this device</span>
                </label>
                <span className="text-[10px] text-amber-200/40">30-day session</span>
              </div>
            )}

            {/* 6. Primary Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-[#FFB500] text-[#351C15] font-extrabold hover:bg-[#F0AA00] shadow-lg shadow-[#FFB500]/20 py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.99] disabled:opacity-75 disabled:cursor-wait group cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>{isSignUp ? 'Create NexLogix Account' : 'Sign In to NexLogix'}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          {/* Security & Compliance Footer Tagline */}
          <div className="pt-2 border-t border-[#4A281E]/60 text-center">
            <p className="text-[10px] text-amber-200/40 tracking-wider">
              © {new Date().getFullYear()} NexLogix. All rights reserved.
            </p>
          </div>

        </div>

        {/* Global Footer info */}
        <div className="mt-8 text-center text-xs text-amber-200/40 flex items-center justify-center gap-4">
          <a href="#privacy" className="hover:text-amber-200 transition-colors">Privacy Notice</a>
          <span>•</span>
          <a href="#terms" className="hover:text-amber-200 transition-colors">Carrier Terms</a>
          <span>•</span>
          <a href="#support" className="hover:text-amber-200 transition-colors">Support</a>
        </div>

      </div>

    </div>
  );
}
