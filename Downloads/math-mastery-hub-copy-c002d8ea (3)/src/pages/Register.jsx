import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, ArrowRight, User, Mail, Phone, Building2, Shield, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const grades = ['Grade 10', 'Grade 11', 'Grade 12'];
const banks = ['FNB', 'Standard Bank', 'ABSA', 'Nedbank', 'Capitec', 'African Bank', 'Discovery Bank', 'TymeBank', 'Investec'];

export default function Register() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone_number: '',
    grade: '',
    bank_name: '',
    account_holder: '',
    account_number: '',
    account_type: '',
  });
  const [showBanking, setShowBanking] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleSignIn = () => {
    base44.auth.redirectToLogin(createPageUrl('CompleteProfile'));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.full_name || !formData.email || !formData.grade) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    try {
      sessionStorage.setItem('pendingRegistration', JSON.stringify(formData));
      base44.auth.redirectToLogin(createPageUrl('CompleteProfile'));
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
      setLoading(false);
    }
  };

  const set = (field) => (e) => setFormData(prev => ({ ...prev, [field]: e.target.value }));
  const setSelect = (field) => (value) => setFormData(prev => ({ ...prev, [field]: value }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50 flex flex-col items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-violet-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <GraduationCap className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Create Your Account</h1>
          <p className="text-slate-500 mt-1.5 text-sm md:text-base">
            Start your 3-day free trial — no credit card required
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-8">
          {error && (
            <div className="mb-5 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
              {error}
            </div>
          )}

          {/* Google Sign In */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors mb-5 text-sm font-medium text-slate-700"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <div className="relative mb-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs text-slate-400 bg-white px-3">
              or sign up with email
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <Label htmlFor="full_name" className="text-sm font-medium">
                Full Name <span className="text-red-500">*</span>
              </Label>
              <div className="relative mt-1.5">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input id="full_name" placeholder="e.g. Thabo Nkosi" value={formData.full_name} onChange={set('full_name')} className="pl-9" required />
              </div>
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email" className="text-sm font-medium">
                Email Address <span className="text-red-500">*</span>
              </Label>
              <div className="relative mt-1.5">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input id="email" type="email" placeholder="you@example.com" value={formData.email} onChange={set('email')} className="pl-9" required />
              </div>
            </div>

            {/* Phone */}
            <div>
              <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
              <div className="relative mt-1.5">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input id="phone" type="tel" placeholder="e.g. 0812345678" value={formData.phone_number} onChange={set('phone_number')} className="pl-9" />
              </div>
            </div>

            {/* Grade */}
            <div>
              <Label className="text-sm font-medium">
                Grade Level <span className="text-red-500">*</span>
              </Label>
              <Select value={formData.grade} onValueChange={setSelect('grade')}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Select your grade" />
                </SelectTrigger>
                <SelectContent>
                  {grades.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            {/* Banking Details Toggle */}
            <div className="pt-1">
              <button
                type="button"
                onClick={() => setShowBanking(v => !v)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors text-sm font-medium text-slate-700"
              >
                <span className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-violet-500" />
                  Banking Details <span className="text-slate-400 font-normal">(optional)</span>
                </span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${showBanking ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {showBanking && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-3 space-y-3">
                      <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3">
                        <Shield className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-amber-800">Your banking details are securely stored and only used for refunds.</p>
                      </div>

                      <div>
                        <Label className="text-sm font-medium">Bank Name</Label>
                        <Select value={formData.bank_name} onValueChange={setSelect('bank_name')}>
                          <SelectTrigger className="mt-1.5">
                            <SelectValue placeholder="Select your bank" />
                          </SelectTrigger>
                          <SelectContent>
                            {banks.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="text-sm font-medium">Account Holder Name</Label>
                        <Input
                          value={formData.account_holder}
                          onChange={set('account_holder')}
                          placeholder="Full name as per bank account"
                          className="mt-1.5"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label className="text-sm font-medium">Account Number</Label>
                          <Input
                            value={formData.account_number}
                            onChange={set('account_number')}
                            placeholder="Account number"
                            className="mt-1.5"
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Account Type</Label>
                          <Select value={formData.account_type} onValueChange={setSelect('account_type')}>
                            <SelectTrigger className="mt-1.5">
                              <SelectValue placeholder="Type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Cheque">Cheque</SelectItem>
                              <SelectItem value="Savings">Savings</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 mt-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-base font-semibold"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Start Free Trial
                  <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>
          </form>

          {/* Benefits */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <p className="text-xs text-slate-500 text-center mb-3">What you get with your free trial:</p>
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
              {['3 days full access', 'All grade lessons', 'Ask questions', 'No credit card'].map(b => (
                <div key={b} className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-violet-500 rounded-full flex-shrink-0" />
                  {b}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sign In Link */}
        <p className="text-center text-sm text-slate-500 mt-5">
          Already have an account?{' '}
          <button
            onClick={() => base44.auth.redirectToLogin(window.location.href)}
            className="text-violet-600 hover:text-violet-700 font-semibold"
          >
            Sign In
          </button>
        </p>
      </motion.div>
    </div>
  );
}

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50 flex flex-col items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-violet-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <GraduationCap className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Create Your Account</h1>
          <p className="text-slate-500 mt-1.5 text-sm md:text-base">
            Start your 3-day free trial — no credit card required
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-8">
          {error && (
            <div className="mb-5 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <Label htmlFor="full_name" className="text-sm font-medium">
                Full Name <span className="text-red-500">*</span>
              </Label>
              <div className="relative mt-1.5">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input id="full_name" placeholder="e.g. Thabo Nkosi" value={formData.full_name} onChange={set('full_name')} className="pl-9" required />
              </div>
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email" className="text-sm font-medium">
                Email Address <span className="text-red-500">*</span>
              </Label>
              <div className="relative mt-1.5">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input id="email" type="email" placeholder="you@example.com" value={formData.email} onChange={set('email')} className="pl-9" required />
              </div>
            </div>

            {/* Phone */}
            <div>
              <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
              <div className="relative mt-1.5">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input id="phone" type="tel" placeholder="e.g. 0812345678" value={formData.phone_number} onChange={set('phone_number')} className="pl-9" />
              </div>
            </div>

            {/* Grade */}
            <div>
              <Label className="text-sm font-medium">
                Grade Level <span className="text-red-500">*</span>
              </Label>
              <Select value={formData.grade} onValueChange={setSelect('grade')}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Select your grade" />
                </SelectTrigger>
                <SelectContent>
                  {grades.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            {/* Banking Details Toggle */}
            <div className="pt-1">
              <button
                type="button"
                onClick={() => setShowBanking(v => !v)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors text-sm font-medium text-slate-700"
              >
                <span className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-violet-500" />
                  Banking Details <span className="text-slate-400 font-normal">(optional)</span>
                </span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${showBanking ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {showBanking && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-3 space-y-3">
                      <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3">
                        <Shield className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-amber-800">Your banking details are securely stored and only used for refunds.</p>
                      </div>

                      <div>
                        <Label className="text-sm font-medium">Bank Name</Label>
                        <Select value={formData.bank_name} onValueChange={setSelect('bank_name')}>
                          <SelectTrigger className="mt-1.5">
                            <SelectValue placeholder="Select your bank" />
                          </SelectTrigger>
                          <SelectContent>
                            {banks.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="text-sm font-medium">Account Holder Name</Label>
                        <Input
                          value={formData.account_holder}
                          onChange={set('account_holder')}
                          placeholder="Full name as per bank account"
                          className="mt-1.5"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label className="text-sm font-medium">Account Number</Label>
                          <Input
                            value={formData.account_number}
                            onChange={set('account_number')}
                            placeholder="Account number"
                            className="mt-1.5"
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Account Type</Label>
                          <Select value={formData.account_type} onValueChange={setSelect('account_type')}>
                            <SelectTrigger className="mt-1.5">
                              <SelectValue placeholder="Type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Cheque">Cheque</SelectItem>
                              <SelectItem value="Savings">Savings</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 mt-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-base font-semibold"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Start Free Trial
                  <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>
          </form>

          {/* Benefits */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <p className="text-xs text-slate-500 text-center mb-3">What you get with your free trial:</p>
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
              {['3 days full access', 'All grade lessons', 'Ask questions', 'No credit card'].map(b => (
                <div key={b} className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-violet-500 rounded-full flex-shrink-0" />
                  {b}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sign In Link */}
        <p className="text-center text-sm text-slate-500 mt-5">
          Already have an account?{' '}
          <button
            onClick={() => base44.auth.redirectToLogin(window.location.href)}
            className="text-violet-600 hover:text-violet-700 font-semibold"
          >
            Sign In
          </button>
        </p>
      </motion.div>
    </div>
  );
}